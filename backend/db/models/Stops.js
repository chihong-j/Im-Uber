const DataTypes = require('sequelize');
const sequelize = require('../../config/database');

module.exports = ((sequelize, DataTypes) => {
    const Stop = sequelize.define('Stops', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        Name: DataTypes.STRING,
        address: DataTypes.STRING,
        latitude: DataTypes.STRING,
        longitude: DataTypes.STRING
    }, {
        timestamps: false,
        createdAt: false,
        updatedAt: false,
    });

    return Stop;
})(sequelize, DataTypes);
