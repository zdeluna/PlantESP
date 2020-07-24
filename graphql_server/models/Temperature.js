module.exports = (sequelize, type) => {
    const Temperature = sequelize.define("temperature", {
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

    Temperature.associate = models => {
        Temperature.belongsTo(models.Plant);
    };

    return Temperature;
};