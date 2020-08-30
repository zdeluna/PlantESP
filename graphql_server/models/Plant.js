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
        wateringTime: {
            type: type.INTEGER,
            defaultValue: "1"
        },
        sensorFrequency: {
            type: type.INTEGER,
            defaultValue: "8"
        }
    });

    Plant.associate = models => {
        Plant.belongsTo(models.User);
        Plant.hasMany(models.SensorReading);
        Plant.hasMany(models.WaterDateTime);
    };

    return Plant;
};
