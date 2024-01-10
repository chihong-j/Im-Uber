const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const Users = require('./Users'); // Assuming Users is another defined model

module.exports = ((sequelize, DataTypes) => {
    const Favor = sequelize.define('Driver_Favor', {
        userID: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        GO_start: {
            type: DataTypes.STRING(255),
        },
        GO_TIME: {
            type: DataTypes.TIME,
        },
        GO_stops: {
            type: DataTypes.STRING(255),
        },
        BACK_dest: {
            type: DataTypes.STRING(255),
        },
        BACK_TIME: {
            type: DataTypes.TIME,
        },
        BACK_stops: {
            type: DataTypes.STRING(255),
        },
    }, {
        freezeTableName: true,
        timestamps: false,
    });

    Favor.belongsTo(Users, {
        foreignKey: 'userID',
        onDelete: 'CASCADE'
    });

    return Favor;
})(sequelize, DataTypes);
