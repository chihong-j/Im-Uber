const stopService = require('../services/stopService');

const getAllStops = async (req, res) => {
  try {
    const stops = await stopService.getAllStops();
    res.status(200).json(stops);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const getStopById = async (req, res) => {
  const stopId = req.params.id;

  try {
    const stop = await stopService.getStopById(stopId);
    res.status(200).json(stop);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const createStop = async (req, res) => {
  const stopData = req.body;

  try {
    const stop = await stopService.createStop(stopData);
    res.status(201).json(stop);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const updateStop = async (req, res) => {
  const stopId = req.params.id;
  const stopData = req.body;

  try {
    const stop = await stopService.updateStop(stopId, stopData);
    res.status(200).json(stop);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const deleteStop = async (req, res) => {
  const stopId = req.params.id;

  try {
    await stopService.deleteStop(stopId);
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllStops,
  getStopById,
  createStop,
  updateStop,
  deleteStop
};
