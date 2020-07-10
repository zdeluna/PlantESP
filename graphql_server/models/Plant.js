module.exports = (sequelize, type) => {
    const Plant = sequelize.define("plant", {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: type.STRING,
            allowNull: true
        },
        temperatures: {
            type: type.DATE
        }
    });

    Plant.associate = models => {
        Plant.belongsTo(models.User);
        Plant.hasMany(models.Temperature);
    };

    return Plant;
};
