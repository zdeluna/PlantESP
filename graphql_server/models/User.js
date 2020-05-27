module.exports = (sequelize, type) => {
    const User = sequelize.define("user", {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: type.STRING,
            allowNull: true
        },
        username: {
            type: type.STRING,
            unique: true
        },
        password: {
            type: type.STRING
        }
    });

    /* First try to find user by username */
    User.findByLogin = async login => {
        let user = await User.findOne({
            where: { username: login }
        });

        if (!user) {
            user = await User.findOne({
                where: { email: login }
            });
        }
        return user;
    };

    return User;
};
