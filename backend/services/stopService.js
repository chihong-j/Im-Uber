const Stop = require('../db/models/Stops');

const getAllStops = async () => {
    return Stop.findAll();
};

const getStopById = async (id) => {
    return Stop.findByPk(id);
};

const createStop = async (stopData) => {
    return Stop.create(stopData);
};

const updateStop = async (id, stopData) => {
    return Stop.update(stopData, {
        where: { id: id }
    });
};

const deleteStop = async (id) => {
    return Stop.destroy({
        where: { id: id }
    });
};

module.exports = {
    getAllStops,
    getStopById,
    createStop,
    updateStop,
    deleteStop
};
