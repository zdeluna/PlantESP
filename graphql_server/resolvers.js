"use strict";
const connectToDatabase = require("./config/db");

const getUser = async args => {
    const { User } = await connectToDatabase();

    //seqelize.close();
    return { email: "usertest@gmail.com", id: "1" };
};

const createUser = async (args, context) => {
    const { User } = await connectToDatabase();
    const user = await User.create(args);

    return {
        user: user,
        success: true,
        message: "The  user was created successfully"
    };
};

export const resolvers = {
    Query: {
        getUser: (root, args) => getUser(args)
    },
    Mutation: {
        createUser: (root, args, context) => createUser(args, context)
    }
};
