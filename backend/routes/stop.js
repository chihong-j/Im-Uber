const express = require('express');
const router = express.Router();
const stopController = require('../controllers/stopController');

// Get all stops for driver to choose
router.get('/', stopController.getAllStops);

// // Get three nearest stops for passenger to choose
// router.post('/nearest', stopController.getNearestStop);
module.exports = router;