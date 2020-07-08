module.exports = (sequelize, type) => {
    const Plant = sequelize.define("plant", {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: type.STRING,
            allowNull: false
        },
        temperature: {
            type: type.DATE
        }
    });

    Plant.associate = models => {
        Plant.belongsTo(models.User);
    };

    return Plant;
};