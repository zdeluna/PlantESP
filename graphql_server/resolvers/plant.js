"use strict";

const connectToDatabase = require("../config/db");
const fetch = require("node-fetch");

/**
 * Create a sensor reading that will be sent from the microcontroller to monitor a plant
 * @param {Number} plantId
 * @param {String} datetime
 * @param {Number} temperature
 * @param {Number} humidity
 * @param {Number} soil moisture
 * @Return {Promise} - Response Object
 */

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

/**
 * Send an HTTP Request to the lambda subscriber function that is used by the micocontroller
 * @param {Number} id
 */

const waterPlant = async ({ id }) => {
    try {
        const datetime = new Date();

        const response = await fetch(process.env.AWS_IOT_ENDPOINT, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ command: "water", id, datetime })
        });

        const { WaterDateTime } = await connectToDatabase();

        const waterDateTime = await WaterDateTime.create({
            plantId: id,
            datetime
        });

        return { success: true };
    } catch (error) {
        console.log(error);
    }
};

/**
 * Get an instance of a plant using the id
 * @param {Number} id - Plant Id
 * @Return {Promise} - Plant
 */

const getPlant = async ({ id }) => {
    try {
        const {
            Plant,
            SensorReading,
            WaterDateTime
        } = await connectToDatabase();
        const plant = await Plant.findByPk(id);

        const sensorReadings = await SensorReading.findAll({
            where: {
                plantId: id
            }
        });

        plant.sensor_readings = sensorReadings;

        const waterDateTimes = await WaterDateTime.findAll({
            where: {
                plantId: id
            }
        });

        const dates = waterDateTimes.map(date => date.datetime);

        plant.water_datetimes = dates;

        return plant;
    } catch (error) {
        console.log(error);
    }
};

/**
 * Update a plant using the updated fields parameter
 * @param {Object} - updatedFields
 * @Return {Promise} - Updated plant instance
 */

const updatePlant = async updatedFields => {
    try {
        const { Plant } = await connectToDatabase();
        const plant = await Plant.findByPk(updatedFields.id);

        return await plant.update(updatedFields);
    } catch (error) {
        console.log(error);
    }
};

/**
 * Get all of the plants of a user
 * @param {Number} - userId
 * @Return {Promise} - Array of User's Plants
 */

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

/**
 * Create a new plant
 * @param {String} - Name - name of plant
 * @param {Number} - userId
 * @Return {Promise} - Array of User's Plants
 */

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

/**
 * Change settings of microcontroller. This includes the frequency of monitoring plant and how long to water.
 * @param {Number} - plantId
 * @param {Number} - sensorFrequency - How many hours between measurements
 * @param {Number} - wateringTime - The amount of seconds to water
 * @Return {Promise} - Reponse Object
 */

const changeSensorSettings = async ({
    plantId,
    sensorFrequency,
    wateringTime
}) => {
    try {
        let params = {};

        if (sensorFrequency) params.sensorFrequency = sensorFrequency;
        if (wateringTime) params.wateringTime = wateringTime;
        console.log(params);
        /*
        const response = await fetch(process.env.AWS_IOT_ENDPOINT, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ command: "settings", params })
        });*/

        const { Plant } = await connectToDatabase();
        const plant = await Plant.findByPk(plantId);

        await plant.update({ sensorFrequency, wateringTime });

        return { success: true };
    } catch (error) {}
};

/**
 * Add a datetime to a plant's watering times array
 * @param {Number} - plantId
 * @param {String} - datetime - ISO date string in the format
 *  YYYY - MM - DD T HH : mm : ss
 * @Return {Promise} - Response Object
 */

const addWateringTime = async ({ plantId, datetime }) => {
    try {
        const { WaterDateTime } = await connectToDatabase();

        const waterDateTime = await WaterDateTime.create({
            plantId: plantId,
            datetime
        });

        return { success: true };
    } catch (error) {
        console.log(error);
    }
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
        },
        changeSensorSettings: (
            root,
            { plantId, sensorFrequency, wateringTime }
        ) => {
            return changeSensorSettings({
                plantId,
                sensorFrequency,
                wateringTime
            });
        },
        addWateringTime: (root, { plantId, datetime }) => {
            return addWateringTime({ plantId, datetime });
        }
    }
};
