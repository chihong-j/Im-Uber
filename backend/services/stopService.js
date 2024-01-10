const sequelize = require('../config/database');
const Stop = require('../db/models/Stops');
const addressToLatLon = require('../utils/transformAddr')
const distanceCalculator = require('../utils/distance')

const getAllStops = async (stopIDs) => {
    try {
        const stops = await Stop.findAll({
            where: {
                stopID: stopIDs
            },
            order: [
                [Stop.sequelize.literal(`FIELD(stopID, ${stopIDs.join(',')})`)]
            ],
            raw: true
        });
        return stops;
    } catch (error) {
        throw new Error('An error occurred while getting all stops');
    }
};

const getStopById = async (id) => {
    try {
        const stop = await Stop.findByPk(id);
        return stop;
    } catch (error) {
        throw new Error('An error occurred while getting a stop by id');
    }
};

const getNearestNStops = async (address, nStops, limitDistance) => {
    const position = await addressToLatLon(address);
    const lat = position.lat
    const long = position.lon
    // the distance as L2 norm in ascending order
    try {
        const stops = await Stop.findAll();

        const stopWithDistance = await Promise.all(stops.map(async (stop) => {
            const distance = await distanceCalculator(lat, long, stop.latitude, stop.longitude);
            return {
                ...stop.get(), // ...: spread operator for a shall
                distance: distance
            }
        }))
        
        const filteredStops = stopWithDistance.filter((stop) => stop.distance <= limitDistance);
        const sortedStops = filteredStops.sort((a, b) => a.distance - b.distance).slice(0, nStops);
        return sortedStops
    } catch (error) {
        throw new Error('An error occurred while acquiring the nearest stop');
    }
}

const createStop = async (stopData) => {
    try {
        const stop = await Stop.create(stopData);
        return stop;
    } catch (error) {
        throw new Error('An error occurred while creating a stop');
    }
};

const updateStop = async (id, stopData) => {
    try {
        const stop = await Stop.findByPk(id);
        if (!stop) throw new Error('Stop not found');
        stop.set(stopData);
        await stop.save();
        return stop;
    } catch (error) {
        throw new Error('An error occurred while updating a stop');
    };
};

const deleteStop = async (id) => {
    try {
        const stop = await Stop.findByPk(id);
        if (!stop) throw new Error('Stop not found');
        await stop.destroy();
    } catch (error) {
        throw new Error('An error occurred while deleting a stop');
    };
};

module.exports = {
    getAllStops,
    getStopById,
    getNearestNStops,
    createStop,
    updateStop,
    deleteStop
};
