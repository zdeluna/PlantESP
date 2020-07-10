const connectToDatabase = require("../config/db");

const createTemperatureReading = async ({ plantId, datetime, degrees }) => {
    try {
        const { Temperature } = await connectToDatabase();
        const temperatureReading = await Temperature.create({
            plantId,
            datetime,
            degrees
        });
        return { success: true };
    } catch (error) {
        console.log(error);
    }
};

const getPlant = async ({ id }) => {
    try {
        const { Plant, Temperature } = await connectToDatabase();
        const plant = await Plant.findByPk(id);

        const temperatures = await Temperature.findAll({
            where: {
                plantId: id
            }
        });

        plant.temperatures = temperatures;

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
        createTemperatureReading: (root, { plantId, datetime, degrees }) => {
            return createTemperatureReading({ plantId, datetime, degrees });
        }
    }
};
