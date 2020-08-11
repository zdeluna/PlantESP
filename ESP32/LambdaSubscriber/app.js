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
const { useMutation, useQuery } = require("@apollo/react-hooks");
const { InMemoryCache } = require("apollo-cache-inmemory");

const fetch = require("node-fetch");

var dynamo = new AWS.DynamoDB.DocumentClient();
var table = process.env.TABLE_NAME;
var lambda = new AWS.Lambda();

exports.handler = async (event, context, callback) => {
    try {
        await validateSensorReadings(event);
        let { plantId, temperature, humidity, soil_moisture, datetime } = event;
        console.log("Plant Id: " + plantId);
        console.log("Temperature: " + temperature);
        console.log("Humidity: " + humidity);
        console.log("Soil Moisture: " + soil_moisture);
        console.log("Datetime: " + datetime);

        if (datetime) datetime = new Date(datetime * 1000).toISOString();

        const newSensorReading = {
            plantId,
            temperature,
            humidity,
            soil_moisture,
            datetime
        };

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
        const cache = new InMemoryCache({
            dataIdFromObject: object => object.id
        });

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
                $datetime: DateTime!
            ) {
                createSensorReading(
                    plantId: $plantId
                    temperature: $temperature
                    humidity: $humidity
                    soil_moisture: $soil_moisture
                    datetime: $datetime
                ) {
                    success
                }
            }
        `;

        const GET_PLANT = gql`
            query getPlant($id: ID!) {
                plant(id: $id) {
                    name
                    id
                    sensor_readings {
                        datetime
                        temperature
                        humidity
                        soil_moisture
                    }
                }
            }
        `;

        // Check to make sure sensor reading does already exist
        const plant = await client.query({
            query: GET_PLANT,
            variables: { id: plantId }
        });

        if (plant && plant.sensor_readings)
            checkForDuplicate({
                sensorReadings: data.sensor_readings,
                newSensorReading
            });

        const response = await client.mutate({
            mutation: CREATE_SENSOR_READING,
            variables: {
                plantId,
                temperature,
                humidity,
                soil_moisture,
                datetime
            }
        });
        console.log("RESPONSE is " + response);
        return { response };
    } catch (error) {
        console.log("ERROR found: " + error);
    }
};

const checkForDuplicate = ({ sensorReadings, newSensorReading }) => {
    return new Promise((resolve, reject) => {
        for (let i = sensorReadings.length - 1; i > -1; i--) {
            if (sensorReadings[i].datetime === newSensorReading.datetime) {
                console.log("duplicate found");
                reject();
            }
        }
        resolve();
    });
};

const validateSensorReadings = ({
    plantId,
    temperature,
    humidity,
    soil_moisture,
    datetime
}) => {
    return new Promise((resolve, reject) => {
        if (!(plantId && temperature && humidity && soil_moisture && datetime))
            reject();
        resolve();
    });
};
