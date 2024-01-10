const DataTypes = require('sequelize');
const sequelize = require('../../config/database');
const Users = require('./Users');
const Stops = require('./Stops');

module.exports = ((sequelize, DataTypes) => {
    const Records = sequelize.define('Records', {
        recordID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        userID: {
            type: DataTypes.INTEGER,
            references: {
                model: Users,
                key: 'userID',
            },
        },
        date: DataTypes.DATE,
        start: {
            type: DataTypes.INTEGER,
            references: {
                model: Stops,
                key: 'stopID',
            },
        },
        destination: {
            type: DataTypes.INTEGER,
            references: {
                model: Stops,
                key: 'stopID',
            },
        },
        price: DataTypes.INTEGER,
    }, {
        freezeTableName: true,
        timestamps: false,
        createdAt: false,
        updatedAt: false,
    });

    Records.belongsTo(Users, { foreignKey: 'userID' });
    Records.belongsTo(Stops, { foreignKey: 'start'});
    Records.belongsTo(Stops, { foreignKey: 'destination'});

    return Records;
})(sequelize, DataTypes);
