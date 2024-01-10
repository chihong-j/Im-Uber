const DataTypes = require('sequelize');
const sequelize = require('../../config/database');
const CarInfo = require('./CarInfo')
const Wallet = require('./Wallet')
module.exports = ((sequelize, DataTypes) => {
    const User = sequelize.define('Users', {
        userID: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        userName: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        isDriver: DataTypes.ENUM('YES', 'NO'),
        gender: DataTypes.ENUM('M', 'F', 'O'),
        phone: DataTypes.STRING,
        addressHome: DataTypes.STRING,
        addressCompany: DataTypes.STRING,
        nCancel: DataTypes.INTEGER,
        ratingTotalScore: DataTypes.INTEGER,
        nRating: DataTypes.INTEGER,
        carPlate: DataTypes.STRING
    }, {
        timestamps: false,
        createdAt: false,
        updatedAt: false,
    });
    // belongsTo: foreignKey is defined on the source model
    // Which means that the source model has the target model's key
    User.belongsTo(CarInfo, { foreignKey: 'carPlate' });
    // hasOne: foreignKey is defined on the target model
    // Which means that the target model has the source model's key
    User.hasOne(Wallet, { 
        foreignKey: 'userID',
        onDelete: 'CASCADE' // when user is deleted, delete wallet
    });
    return User;
})(sequelize, DataTypes);
