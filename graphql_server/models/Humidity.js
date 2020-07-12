module.exports = (sequelize, type) => {
    const Humidity = sequelize.define("humidity", {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        value: {
            type: type.INTEGER,
            allowNull: false
        },
        datetime: {
            type: type.DATE
        }
    });

    Humidity.associate = models => {
        Humidity.belongsTo(models.Plant);
    };

    return Humidity;
};
