"use strict";
const connectToDatabase = require("../config/db");

function HTTPError(statusCode, message) {
    const error = new Error(message);
    error.statusCode = statusCode;
    console.log("ERROR in handler:");
    console.log(message);
    return error;
}

module.exports.healthCheck = async () => {
    try {
        await connectToDatabase();
        console.log("Connection successful. ");
        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Connection successful." })
        };
    } catch (error) {
        console.log(error);
        console.log("ERROR");
    }
};

module.exports.create = async event => {
    try {
        const { User } = await connectToDatabase();
        const user = await User.create(JSON.parse(event.body));
        return {
            statusCode: 200,
            body: JSON.stringify(user)
        };
    } catch (error) {
        console.log(error);
        return {
            statusCode: error.statusCode || 500,
            headers: { "Content-Type": "text/plain" },
            body: "Could not create the user."
        };
    }
};

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
