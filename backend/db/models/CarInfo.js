const DataTypes = require('sequelize');
const sequelize = require('../../config/database');

module.exports = ((sequelize, DataTypes) => {
    const CarInfo = sequelize.define('CarInfo', {
        carPlate: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
        },
        seat: DataTypes.INTEGER,
        brand: DataTypes.INTEGER,
        type: DataTypes.ENUM('SUV', 'Sedan'),
        color: DataTypes.INTEGER,
        electric: DataTypes.BOOLEAN
    }, {
        timestamps: false,
        createdAt: false,
        updatedAt: false,
        freezeTableName: true
    });
    
    return CarInfo;
})(sequelize, DataTypes);
