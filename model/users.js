'use strict'

module.exports = (sequelize, DataTypes) => {
    const  User = sequelize.define('User', {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        password: {
            type: DataTypes.STRING,
            allownNull: false
        },
        userRoleId: {
            type: DataTypes.STRING
        },
        enabled: {
            type: DataTypes.STRING
        },
        pageAllowed: {
            type: DataTypes.STRING
        }
    }, 
    {
        freezeTableName: true,
        tableName: "USERS"
    });

    return User;
}

