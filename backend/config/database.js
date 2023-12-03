const Sequelize = require('sequelize');


const sequelize = new Sequelize({
    database: process.env.DB_DATABASE,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    pool: {
        max: 1000,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});


module.exports = sequelize;
