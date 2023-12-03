const DataTypes = require('sequelize');
const sequelize = require('../../config/database');
const Users = require('./Users');


module.exports = ((sequelize, DataTypes) => {
    const Passenger = sequelize.define('Passenger', {
        userID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: 'Users',
                key: 'userID',
            }
        },
        boardingID: DataTypes.INTEGER,
        passengerCnt: DataTypes.INTEGER,
    }, {
        freezeTableName: true,
        timestamps: false,
        createdAt: false,
        updatedAt: false,
    });
    Passenger.belongsTo(Users, { foreignKey: 'userID' });
    return Passenger;
})(sequelize, DataTypes);
