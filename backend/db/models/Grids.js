const DataTypes = require('sequelize');
const sequelize = require('../../config/database');
const Stops = require('../../db/models/Stops');
module.exports = ((sequelize, DataTypes) => {
    const Grid = sequelize.define('Grids', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        gridID: DataTypes.INTEGER,
        stopID: DataTypes.INTEGER,
        order: DataTypes.INTEGER
    }, {
        timestamps: false,
        createdAt: false,
        updatedAt: false,
    });
    Grid.belongsTo(Stops, { foreignKey: 'stopID' });
    return Grid;
})(sequelize, DataTypes);
