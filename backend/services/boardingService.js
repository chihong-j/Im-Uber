const boardingTable = require('../db/models/Boarding');

const getAllBoardings = async () => {
    try {
        const boardings = await boardingTable.findAll();
        return boardings;
    } catch (error) {
        throw new Error('An error occurred while getting all boardings');
    }
}

const getBoardingById = async (id) => {
    try {
        const boarding = await boardingTable.findByPk(id);
        return boarding;
    } catch (error) {
        throw new Error('An error occurred while getting a boarding by id');
    }
}

const createBoarding = async (boardingData) => {
    try {
        const boarding = await boardingTable.create(boardingData);
        return boarding;
    } catch (error) {
        throw new Error('An error occurred while creating a boarding');
    }
}

const updateBoarding = async (id, boardingData) => {
    try {
        const boarding = await boardingTable.findByPk(id);
        if (!boarding) {
            throw new Error('Boarding not found');
        }
        boarding.set(boardingData);
        await boarding.save();
        return boarding;
    } catch (error) {
        throw new Error('An error occurred while updating the boarding');
    }
}

const deleteBoarding = async (id) => {
    try {
        const boarding = await boardingTable.findByPk(id);
        if (!boarding) {
            throw new Error('Boarding not found');
        }
        await boarding.destroy();
    } catch (error) {
        throw new Error('An error occurred while deleting the boarding');
    }
}

module.exports = {
    getAllBoardings,
    getBoardingById,
    createBoarding,
    updateBoarding,
    deleteBoarding
};