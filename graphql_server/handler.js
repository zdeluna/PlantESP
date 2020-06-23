"use strict";
const { ApolloServer } = require("apollo-server-lambda");
const { schema } = require("./schema/schema");
const { resolvers } = require("./resolvers");

const getToken = async headers => {
    const auth = (headers && headers.Authorization) || "";
    return auth;
};

const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
    playground: {
        endpoint: "/dev/graphql"
    },
    formatError: error => {
        console.log(error);
        return error;
    },
    formatReponse: response => {
        console.log(response);
        return response;
    },

    context: async ({ event, context }) => {
        const token = await getToken(event.headers);

        return {
            secret: process.env.SECRET,
            headers: event.headers,
            functionName: context.functionName,
            event,
            context,
            token
        };
    },
    /*
    context: ({ context, event }) => {
        context.callbackWaitsForEmptyEventLoop = false;
    }*/
    tracing: true
});

module.exports.graphqlHandler = server.createHandler({
    cors: {
        origin: "*",
        credentials: true
    }
});

module.exports.hello = async event => {
    return {
        statusCode: 200,
        body: JSON.stringify(
            {
                message:
                    "Go Serverless v1.0! Your function executed successfully!",
                input: event
            },
            null,
            2
        )
    };

    // Use this code if you don't use the http event with the LAMBDA-PROXY integration
    // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
// return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
