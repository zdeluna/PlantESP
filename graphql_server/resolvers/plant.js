const connectToDatabase = require("../config/db");

const createSensorReading = async ({ plantId, datetime, value }) => {
    try {
        const { Temperature } = await connectToDatabase();
        const temperatureReading = await Temperature.create({
            plantId,
            datetime,
            value
        });
        return { success: true };
    } catch (error) {
        console.log(error);
    }
};

const getPlant = async ({ id }) => {
    try {
        const { Plant, SensorReading } = await connectToDatabase();
        const plant = await Plant.findByPk(id);

        const sensorRadings = await SensorReading.findAll({
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
        }
    }
};
