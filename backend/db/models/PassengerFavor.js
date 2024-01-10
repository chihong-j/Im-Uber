const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const Users = require('./Users'); // Assuming Users is another defined model

module.exports = ((sequelize, DataTypes) => {
    const Favor = sequelize.define('Passenger_Favor', {
        userID: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        GO_start: {
            type: DataTypes.STRING(255),
        },
        GO_cnt: {
            type: DataTypes.INTEGER,
        },
        GO_TIME: {
            type: DataTypes.TIME,
        },
        BACK_dest: {
            type: DataTypes.STRING(255),
        },
        BACK_cnt: {
            type: DataTypes.INTEGER,
        },
        BACK_TIME: {
            type: DataTypes.TIME,
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
