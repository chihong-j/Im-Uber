const DataTypes = require('sequelize');
const sequelize = require('../../config/database');

const Wallet = sequelize.define('Wallet', {
    userID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    balance: {
        type: DataTypes.INTEGER
    }
}, {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    freezeTableName: true
});

module.exports = Wallet;
