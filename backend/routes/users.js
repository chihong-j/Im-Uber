const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


router.get('/', userController.getAllUsers);
router.get('/myInfo', userController.getMyInfo);
router.post('/createUser', userController.createUser);
router.put('/deleteUser', userController.deleteUser);
router.put('/updateDriver', userController.updateDriver);
router.put('/updatePassenger', userController.updatePassenger);
router.post('/rating', userController.updateRating);
module.exports = router;
    