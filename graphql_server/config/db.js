const UserModel = require("../models/User");
const Sequelize = require("sequelize");
const mysql2 = require("mysql2");

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
const Models = { User };

module.exports = async () => {
    try {
        if (connection.isConnected) {
            console.log("Using connection");
            return Models;
        }

        await sequelize.sync();
        await sequelize.authenticate();
        console.log(sequelize);
        connection.isConnected = true;
        console.log("Created new connection");
        return Models;
    } catch (error) {
        console.log("There has been an error");
        console.log(error);
    }
};
