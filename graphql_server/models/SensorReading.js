module.exports = (sequelize, type) => {
    const SensorReading = sequelize.define("sensorReading", {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        temperature: {
            type: type.INTEGER,
            allowNull: true
        },
        humidity: {
            type: type.INTEGER,
            allowNull: true
        },
        soil_moisture: {
            type: type.INTEGER,
            allowNull: true
        },
        datetime: {
            type: type.DATE
        }
    });

    SensorReading.associate = models => {
        SensorReading.belongsTo(models.Plant);
    };

    return SensorReading;
};
