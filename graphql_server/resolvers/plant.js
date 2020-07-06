const connectToDatabase = require("../config/db");

const getPlant = async ({ id }) => {
    try {
        const { Plant } = await connectToDatabase();
        const plant = await Plant.findByPk(id);
        return plant;
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
        }
    }
};
