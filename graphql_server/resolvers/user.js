"use strict";
import { AuthenticationError, UserInputError } from "apollo-server";
const jwt = require("jsonwebtoken");
const connectToDatabase = require("../config/db");

const createToken = async (user, secret, expiresIn) => {
    const { id, email, username } = user;
    return await jwt.sign({ id, email, username }, secret, {
        expiresIn
    });
};

const getUser = async args => {
    //const { User } = await connectToDatabase();

    //seqelize.close();
    return { email: "usertest@gmail.com", id: "1" };
};

const createUser = async ({ username, email, password }, { secret }) => {
    const { User } = await connectToDatabase();

    if (await User.findOne({ where: { username: username } })) {
        throw new UserInputError("Username already exists.");
    }

    if (await User.findOne({ where: { email: email } })) {
        throw new UserInputError("Email already in use.");
    }

    let user = await User.create({
        username,
        email,
        password
    });

    return {
        token: await createToken(user, secret, "30m")
    };
};

const signInUser = async ({ login, password }, { secret }) => {
    const { User } = await connectToDatabase();

    const user = await User.findByLogin(login);
    if (!user) {
        throw new UserInputError("No user was found.");
    }

    const isValid = await user.validatePassword(password);

    if (!isValid) {
        throw new AuthenticationError("Password is not valid.");
    }

    return { token: createToken(user, secret, "30m") };
};

export default {
    Query: {
        users: (root, args) => {
            return getUser(args);
        }
    },
    Mutation: {
        createUser: (root, { username, email, password }, { secret }) => {
            return createUser({ username, email, password }, { secret });
        },
        signInUser: (root, { login, password }, { secret }) => {
            return signInUser({ login, password }, { secret });
        }
    }
};
