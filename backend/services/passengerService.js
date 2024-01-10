const Passenger = require('../db/models/Passenger');
const User = require('../db/models/Users');
const Stop = require('../db/models/Stops');

async function getAllPassengers() {
    try {
        const passengers = await Passenger.findAll({
            include: [
                User,
                Stop,
                Stop
            ]
        });
        return passengers;
    } catch (error) {
        throw new Error('An error occurred while acquiring the user');
    }
}

async function getPassengerById(passengerID) {
    try {
        const passenger = await Passenger.findByPk(passengerID, {
            include: [User, Stop, Stop], // Include associations (Users, pickUpStop, dropOffStop)
        });
        return passenger;
    } catch (error) {
        throw new Error(`Passenger with ID ${passengerID} not found`);
    }
}

async function createPassenger(passengerData) {
    try {
        const newPassenger = await Passenger.create(passengerData);
        return newPassenger;
    } catch (error) {
        throw new Error(`Error creating passenger: ${error.message}`);
    }
}

async function updatePassenger(passengerID, passengerData) {
    try {
        const passenger = await Passenger.findByPk(passengerID);
        if (!passenger) {
            throw new Error('User not found');
        }
        passenger.set(passengerData);
        await passenger.save();
        return passenger;
    } catch (error) {
        throw new Error('An error occurred while updating the passenger');
    }
}

async function deletePassenger(passengerID) {
    try {
        const passenger = await Passenger.findByPk(passengerID);
        if (!passenger) {
            throw new Error('User not found');
        }
        await passenger.destroy();
    } catch (error) {
        throw new Error('An error occurred while deleting the passenger.');
    }
}

module.exports = {
    getAllPassengers,
    getPassengerById,
    createPassenger,
    updatePassenger,
    deletePassenger
}

