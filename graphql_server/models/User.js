const Sequelize = require("sequelize");

module.exports = (sequelize, type) => {
    return sequelize.define("user", {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });
};
