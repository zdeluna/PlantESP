const bcrypt = require("bcryptjs");

module.exports = (sequelize, type) => {
    const User = sequelize.define("user", {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: type.STRING,
            unique: true,
            allowNull: true
        },
        username: {
            type: type.STRING,
            unique: true
        },
        password: {
            type: type.STRING,
            unique: true,
            allowNull: false
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

    User.beforeCreate(async user => {
        user.password = await user.generatePasswordHash();
    });

    User.prototype.generatePasswordHash = async function() {
        const saltRounds = 10;
        return await bcrypt.hash(this.password, saltRounds);
    };

    User.prototype.validatePassword = async function(password) {
        return await bcrypt.compare(password, this.password);
    };

    return User;
};
