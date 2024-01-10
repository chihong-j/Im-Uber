const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


router.get('/', userController.getAllUsers);
router.get('/myInfoV1', userController.getMyInfoV1);
router.get('/myInfo', userController.getMyInfoV2);
router.post('/createUser', userController.createUser);
router.put('/deleteUser', userController.deleteUser);
router.put('/updateDriver', userController.updateDriver);
router.put('/updatePassenger', userController.updatePassenger);
router.post('/rating', userController.updateRating);
router.put('/updateCarInfo', userController.updateCarInfo);
router.put('/updateDriverFavor', userController.updateDriverFavor);
router.put('/updatePassengerFavor', userController.updatePassengerFavor);

module.exports = router;
    