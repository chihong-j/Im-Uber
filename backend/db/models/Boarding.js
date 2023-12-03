const DataTypes = require('sequelize');
const sequelize = require('../../config/database');
const Stops = require('./Stops');
const Passenger = require('./Passenger');

module.exports = ((sequelize, DataTypes) => {
    const Boarding = sequelize.define('Boarding', {
        boardingID: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        routeID: DataTypes.INTEGER,
        boardTime: DataTypes.DATE,
        stopID: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Stops', // Assuming Stops is another defined model
                key: 'stopID',
            }
        },
    }, {
        freezeTableName: true,
        timestamps: false,
        createdAt: false,
        updatedAt: false,
    });
    Boarding.belongsTo(Stops, { foreignKey: 'stopID' });
    Boarding.hasMany(Passenger, { foreignKey: 'boardingID' });
    return Boarding;    
})(sequelize, DataTypes);


