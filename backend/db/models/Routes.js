const DataTypes = require('sequelize');
const sequelize = require('../../config/database');
const Users = require('./Users')
const Boarding = require('./Boarding');

module.exports = ((sequelize, DataTypes) => {
    const Routes = sequelize.define('Routes', {
        routeID: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        driveID: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Users', // This is a reference to another model
                key: 'userID', // This is the column name of the referenced model
            }
        },
        startTime: DataTypes.DATE,
        start: DataTypes.INTEGER,
        destination: DataTypes.INTEGER,
        available: DataTypes.INTEGER,
    }, {
        timestamps: false,
        createdAt: false,
        updatedAt: false,
    });    
    Routes.belongsTo(Users, { foreignKey: 'driveID' });
    Routes.hasMany(Boarding, { foreignKey: 'routeID' });
    return Routes;
})(sequelize, DataTypes);

