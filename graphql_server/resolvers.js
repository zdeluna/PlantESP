const getUser = async args => {
    return { email: "usertest@gmail.com", id: "1" };
};

export const resolvers = {
    Query: {
        getUser: (root, args) => getUser(args)
    }
};
