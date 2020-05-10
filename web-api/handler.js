"use strict";
const connectToDatabase = require("./db");

function HTTPError(statusCode, message) {
    const error = new Error(message);
    error.statusCode = statusCode;
    console.log("ERROR in handler:");
    console.log(message);
    return error;
}

module.exports.healthCheck = async () => {
    await connectToDatabase();
    console.log("Connection successful. ");
    return {
        statusCode: 200,
        body: JSON.stringify({ message: "Connection successful." })
    };
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
