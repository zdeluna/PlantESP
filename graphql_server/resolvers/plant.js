"use strict";

const connectToDatabase = require("../config/db");
const axios = require("axios");
const rax = require("retry-axios");
const https = require("https");
var aws = require("aws-sdk");
var lambda = new aws.Lambda({
    region: "us-east-2"
});
const fetch = require("node-fetch");

var params = {
    FunctionName: "serverlessrepo-lambda-iot-rule-TopicPublisher-ERV04QH9NJA5",
    InvocationType: "RequestResponse",
    LogType: "Trail",
    Payload: JSON.stringify({ text: "test" })
};

const createSensorReading = async ({
    plantId,
    datetime,
    temperature,
    humidity,
    soil_moisture
}) => {
    try {
        const { SensorReading } = await connectToDatabase();
        const sensorReading = await SensorReading.create({
            plantId,
            datetime,
            temperature,
            humidity,
            soil_moisture
        });
        return { success: true };
    } catch (error) {
        console.log(error);
    }
};

const waterPlant = async ({ id }) => {
    try {
        const response = await fetch(process.env.AWS_IOT_ENDPOINT, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id })
        });
        console.log(response);
        return { success: true };
    } catch (error) {
        console.log(error);
    }
};

const getPlant = async ({ id }) => {
    try {
        const { Plant, SensorReading } = await connectToDatabase();
        const plant = await Plant.findByPk(id);

        const sensorReadings = await SensorReading.findAll({
            where: {
                plantId: id
            }
        });

        plant.sensor_readings = sensorReadings;

        return plant;
    } catch (error) {
        console.log(error);
    }
};

const updatePlant = async updatedFields => {
    try {
        const { Plant } = await connectToDatabase();
        const plant = await Plant.findByPk(updatedFields.id);

        await plant.update(updatedFields);
    } catch (error) {
        console.log(error);
    }
};

const getPlants = async userId => {
    try {
        const { Plant } = await connectToDatabase();
        const plants = await Plant.findAll({
            where: {
                userId: userId
            }
        });
        return plants;
    } catch (error) {}
};

const createPlant = async ({ name }, { userId }) => {
    try {
        const { Plant } = await connectToDatabase();
        const plant = await Plant.create({ name, userId });
        return {
            success: true,
            id: plant.id
        };
    } catch (error) {}
};
export default {
    Query: {
        plants: (root, args, { userId }) => {
            console.log("in resolver");
            return getPlants(userId);
        },
        plant: (root, { id }) => {
            return getPlant({ id });
        }
    },
    Mutation: {
        createPlant: (root, { name }, { userId }) => {
            return createPlant({ name }, { userId });
        },
        updatePlant: (root, updatedFields) => {
            return updatePlant(updatedFields);
        },
        createSensorReading: (
            root,
            { plantId, datetime, temperature, humidity, soil_moisture }
        ) => {
            return createSensorReading({
                plantId,
                datetime,
                temperature,
                humidity,
                soil_moisture
            });
        },
        waterPlant: (root, { id }) => {
            return waterPlant({ id });
        }
    }
};
