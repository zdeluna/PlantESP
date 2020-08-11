module.exports = (sequelize, type) => {
    const WaterDateTime = sequelize.define("waterDateTime", {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        datetime: {
            type: type.DATE
        }
    });

    WaterDateTime.associate = models => {
        WaterDateTime.belongsTo(models.Plant);
    };

    return WaterDateTime;
};
