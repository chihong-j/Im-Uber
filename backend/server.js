const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const sequelize = require('./config/database');
const userRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const walletRouter = require('./routes/wallet');

const Routes = require('./db/models/Routes');

const app = express()

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
    credentials: true
}))
app.use(bodyParser.json());
// Session configuration
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false
}));
// Set Router
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/wallet', walletRouter);
// Connect to the database and create the server
sequelize.sync()
    .then(() => {
        console.log('Database and tables have been created!');
        const port = process.env.PORT;
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch((error) => {
        console.error('Error syncing database:', error);
    });

module.exports = app;
