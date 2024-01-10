const PassengerFavor = require('../db/models/PassengerFavor');
const DriverFavor = require('../db/models/DriverFavor');
const Users = require('../db/models/Users');

async function getAllPassengerFavors() {
    try {
        const favors = await PassengerFavor.findAll({
            include: [
                Users
            ]
        });
        return favors;
    } catch (error) {
        throw new Error('An error occurred while acquiring the favors');
    }
}

async function getPassengerFavorByUserId(userId) {
    try {
        const favor = await PassengerFavor.findByPk(userId, {
            include: [
                Users
            ]
        });
        if (!favor) {
            throw new Error('Favor not found');
        }
        return favor;
    } catch (error) {
        throw new Error('An error occurred while acquiring the favor');
    }
}

async function createPassengerFavor(favorData) {
    try {
        const favor = await PassengerFavor.create(favorData);
        return favor;
    } catch (error) {
        throw new Error('An error occurred while creating the favor');
    }
}

async function updatePassengerFavor(userId, favorData) {
    try {
        const favor = await PassengerFavor.findByPk(userId);
        if (!favor) {
            throw new Error('Favor not found');
        }
        favor.set(favorData);
        await favor.save();
        return favor;
    } catch (error) {
        throw new Error('An error occurred while updating the favor');
    }
}

async function deletePassengerFavor(userId) {
    try {
        const favor = await PassengerFavor.findByPk(userId);
        if (!favor) {
            throw new Error('Favor not found');
        }
        await favor.destroy();
    } catch (error) {
        throw new Error('An error occurred while deleting the favor');
    }
}

async function getAllDriverFavors() {
    try {
        const favors = await DriverFavor.findAll({
            include: [
                Users
            ]
        });
        return favors;
    } catch (error) {
        throw new Error('An error occurred while acquiring the favors');
    }
}

async function getDriverFavorByUserId(userId) {
    try {
        const favor = await DriverFavor.findByPk(userId, {
            include: [
                Users
            ]
        });
        if (!favor) {
            throw new Error('Favor not found');
        }
        return favor;
    } catch (error) {
        throw new Error('An error occurred while acquiring the favor');
    }
}

async function createDriverFavor(favorData) {
    try {
        const favor = await DriverFavor.create(favorData);
        return favor;
    } catch (error) {
        throw new Error('An error occurred while creating the favor');
    }
}

async function updateDriverFavor(userId, favorData) {
    try {
        const favor = await DriverFavor.findByPk(userId);
        if (!favor) {
            throw new Error('Favor not found');
        }
        favor.set(favorData);
        await favor.save();
        return favor;
    } catch (error) {
        throw new Error('An error occurred while updating the favor');
    }
}

async function deleteDriverFavor(userId) {
    try {
        const favor = await DriverFavor.findByPk(userId);
        if (!favor) {
            throw new Error('Favor not found');
        }
        await favor.destroy();
    } catch (error) {
        throw new Error('An error occurred while deleting the favor');
    }
}

module.exports = {
    getAllPassengerFavors,
    getPassengerFavorByUserId,
    createPassengerFavor,
    updatePassengerFavor,
    deletePassengerFavor,
    getAllDriverFavors,
    getDriverFavorByUserId,
    createDriverFavor,
    updateDriverFavor,
    deleteDriverFavor
};
