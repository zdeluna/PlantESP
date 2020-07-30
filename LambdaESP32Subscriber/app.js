/*
  Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
  Permission is hereby granted, free of charge, to any person obtaining a copy of this
  software and associated documentation files (the "Software"), to deal in the Software
  without restriction, including without limitation the rights to use, copy, modify,
  merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
  permit persons to whom the Software is furnished to do so.
  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
  INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
  PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
  HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
  OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
  SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

var AWS = require("aws-sdk");
var uuidv1 = require("uuid/v1");
const https = require("https");
const gql = require("graphql-tag");
const { ApolloClient } = require("apollo-client");
const { createHttpLink } = require("apollo-link-http");
const { useMutation } = require("@apollo/react-hooks");
const { InMemoryCache } = require("apollo-cache-inmemory");

const fetch = require("node-fetch");

var dynamo = new AWS.DynamoDB.DocumentClient();
var table = process.env.TABLE_NAME;
var lambda = new AWS.Lambda();

exports.handler = async (event, context, callback) => {
    console.log("Received event:", JSON.stringify(event, null, 2));

    let GRAPHQL_URI =
        "https://bj6gqabbda.execute-api.us-east-2.amazonaws.com/dev/graphql";

    const httpLink = createHttpLink({
        uri: GRAPHQL_URI,
        headers: {
            "client-name": "Plant ESP [React App]",
            "client-version": "1.0.0"
        },
        fetch: fetch
    });
    const cache = new InMemoryCache({ dataIdFromObject: object => object.id });

    const client = new ApolloClient({
        link: httpLink,
        cache: cache
    });

    const CREATE_SENSOR_READING = gql`
        mutation createSensorReading(
            $plantId: ID!
            $temperature: Int
            $humidity: Int
            $soil_moisture: Int
        ) {
            createSensorReading(
                plantId: $plantId
                temperature: $temperature
                humidity: $humidity
                soil_moisture: $soil_moisture
            ) {
                success
            }
        }
    `;
    /*
    const [createSensorReading] = useMutation(CREATE_SENSOR_READING, {
        onCompleted(sensorReading) {
            console.log("Sensor Reading has been added to GraphQL");
        }
    });*/
    const data = {
        plantId: 4,
        temperature: 100,
        humidity: 100,
        soil_moisture: 2,
        datetime: "2020-11-18T10:15:30Z"
    };

    client
        .mutate({ mutation: CREATE_SENSOR_READING, variables: data })
        .then(result => console.log(result))
        .catch(error => console.log(error));
};
