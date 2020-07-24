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
        }
    });

    Plant.associate = models => {
        Plant.belongsTo(models.User);
        Plant.hasMany(models.SensorReading);
    };

    return Plant;
};
