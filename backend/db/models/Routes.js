const DataTypes = require('sequelize');
const sequelize = require('../../config/database');
const Users = require('./Users')
const Boarding = require('./Boarding');
const Passenger = require('./Passenger');

module.exports = ((sequelize, DataTypes) => {
    const Routes = sequelize.define('Routes', {
        routeID: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        driverID: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Users', // This is a reference to another model
                key: 'userID', // This is the column name of the referenced model
            }
        },
        startTime: DataTypes.DATE,
        start: DataTypes.INTEGER, // start stop
        destination: DataTypes.INTEGER, // end stop
        available: DataTypes.INTEGER, // number of available seats
        type: DataTypes.ENUM("GO", "BACK"), // GO: from start to TSMC, BACK: from TSMC to destination
        state: DataTypes.ENUM("PROCESSING", "CONFIRMED"), // PROCESSING: the route is still open for passengers to join
    }, {
        timestamps: false,
        createdAt: false,
        updatedAt: false,
    });    
    Routes.belongsTo(Users, { foreignKey: 'driverID' });
    Routes.hasMany(Boarding, { 
        foreignKey: 'routeID', 
        onDelete: 'CASCADE' // when a route is deleted, all boardings associated with it will be deleted as well
    });
    Routes.hasMany(Passenger, { 
        foreignKey: 'routeID', 
        onDelete: 'CASCADE', // when a route is deleted, all passengers associated with it will be deleted as well
    });
    return Routes;
})(sequelize, DataTypes);

