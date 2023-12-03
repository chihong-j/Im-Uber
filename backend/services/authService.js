const User = require('../db/models/Users');
const CarInfo = require('../db/models/CarInfo');
const Wallet = require('../db/models/Wallet');
const bcrypt = require('bcrypt');

// Service function to register a new user
async function signup(userData, req) {
    try {
        // Create the user and hash the password
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const checkExist = await User.count({
            where: {
                userName: userData.userName
            }
        });
        if(checkExist != 0){
            throw new Error('User name has already been used.');
        }
        if(userData.isDriver == 'YES'){
            await CarInfo.create({
                carPlate: userData.carPlate,
                seat: userData.seat,
                brand: userData.brand,
                color: userData.color,
                electric: userData.electric
            });
        }
        const user = await User.create({
            userName: userData.userName,
            email: userData.email,
            password: hashedPassword,
            isDriver: userData.isDriver,
            gender: userData.gender,
            phone: userData.phone,
            addressHome: userData.addressHome,
            addressCompany: userData.addressCompany,
            ratingTotalScore: 0,
            nRating: 0,
            carPlate: userData.carPlate,
            nCancel: 0
        });
        await Wallet.create({
            userID: user.userID,
            balance: 0
        })

        return "Sign up successfully";
    } catch (error) {
        throw error;
    }
}

// Service function to log in a user
async function signin(credentials, req) {
    try {
        const { userName, password } = credentials;
        const user = await User.findOne({
            where: {
                userName: userName
            }
        });
        if (!user) {
            throw new Error('User does not exist');
        }

        // Check if the password is valid
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Incorrect password');
        }

        // Set the user's session variable
        req.session.userId = user.userID;

        return 'Login successful';
    } catch (error) {
        throw error;
    }
}

module.exports = {
    signup,
    signin,
};
