const Sequelize = require("sequelize");
const mysql2 = require("mysql2");
const UserModel = require("../models/User");
const PlantModel = require("../models/Plant");
const SensorReadingModel = require("../models/SensorReading");
const WaterDateTimeModel = require("../models/WaterDateTime");

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        dialect: "mysql",
        dialectModule: mysql2,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT
    }
);

const connection = {};

const User = UserModel(sequelize, Sequelize);
const Plant = PlantModel(sequelize, Sequelize);
const SensorReading = SensorReadingModel(sequelize, Sequelize);
const WaterDateTime = WaterDateTimeModel(sequelize, Sequelize);

const Models = { User, Plant, SensorReading, WaterDateTime };

Object.keys(Models).forEach(key => {
    if ("associate" in Models[key]) {
        Models[key].associate(Models);
    }
});

module.exports = async () => {
    try {
        if (connection.isConnected) {
            console.log("Using connection");
            return Models;
        }
        await sequelize.sync({ force: false });
        await sequelize.authenticate();
        connection.isConnected = true;
        console.log("Created new connection");
        return Models;
    } catch (error) {
        console.log("There has been an error");
        console.log(error);
    }
};
