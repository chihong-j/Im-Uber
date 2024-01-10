const express = require('express');
const router = express.Router();
const walletController = require('../controllers/walletController');


router.put('/topUp', walletController.topUp);

module.exports = router;
