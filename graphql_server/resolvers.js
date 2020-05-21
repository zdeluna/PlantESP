"use strict";
const jwt = require("jsonwebtoken");
const connectToDatabase = require("./config/db");

const createToken = async (user, secret, expiresIn) => {
    const { id, email, username } = user;
    return await jwt.sign({ id, email, username }, secret, {
        expiresIn
    });
};

const getUser = async args => {
    const { User } = await connectToDatabase();

    //seqelize.close();
    return { email: "usertest@gmail.com", id: "1" };
};

const createUser = async ({ username, email, password }, secret) => {
    const { User } = await connectToDatabase();
    const user = await User.create({ username, email, password });

    return {
        token: createToken(user, secret, "30m")
    };
};

export const resolvers = {
    Query: {
        getUser: (root, args) => getUser(args)
    },
    Mutation: {
        createUser: (root, { username, email, password }, { secret }) =>
            createUser({ username, email, password }, secret)
    }
};
