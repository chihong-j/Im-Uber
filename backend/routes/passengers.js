const express = require('express');
const router = express.Router();
const passengersController = require('../controllers/passengersController');

router.get('/showCandidates', passengersController.showCandidates);
router.post('/selectCandidate', passengersController.selectCandidates);
router.get('/getArrivalTime', passengersController.getArrivalTime);

module.exports = router;