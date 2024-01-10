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
const routeRouter = require('./routes/route');
const stopRouter = require('./routes/stop');
const passengersRouter = require('./routes/passengers');

const Routes = require('./db/models/Routes');
const Grid = require('./db/models/Routes');
const app = express()

app.use(cors({
    origin: 'http://localhost:3000',
    // origin: ['https://tsmc-myuber.azurewebsites.net', "tsmc-myuber.azurewebsites.net"],
    methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
    credentials: true
}))
app.use(bodyParser.json());

// Session configuration
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 // 1 hour
    }
    // cookie: {
    //     httpOnly: false,
    //     sameSite: 'none'
    // }
}));

// Set Router
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/wallet', walletRouter);
app.use('/api/v1/route', routeRouter);
app.use('/api/v1/stop', stopRouter);
app.use('/api/v1/passengers', passengersRouter);

// Connect to the database and create the server
sequelize.sync()
    .then(() => {
        console.log('Database and tables have been created!');
    })
    .catch((error) => {
        console.error('Error syncing database:', error);
    });

const port = process.env.PORT;
// const server = app.listen(port, '0.0.0.0', () => {
//     console.log(`Server is running on port ${port}`);
// });

const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = {
    app,
    server
};
