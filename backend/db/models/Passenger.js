const DataTypes = require('sequelize');
const sequelize = require('../../config/database');
const Users = require('./Users');
const Stops = require('./Stops');

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
        routeID: DataTypes.INTEGER,
        pickUpStopID: DataTypes.INTEGER,
        dropOFFStopID: DataTypes.INTEGER,
        passengerCnt: DataTypes.INTEGER,
        price: DataTypes.INTEGER
    }, {
        freezeTableName: true,
        timestamps: false,
        createdAt: false,
        updatedAt: false,
    });
    Passenger.belongsTo(Users, { foreignKey: 'userID' });
    Passenger.belongsTo(Stops, { foreignKey: 'pickUpStopID' });
    Passenger.belongsTo(Stops, { foreignKey: 'dropOffStopID' });
    return Passenger;
})(sequelize, DataTypes);
