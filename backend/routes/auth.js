const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Route for user registration (signup)
router.post('/signup', authController.signup);

// Route for user login (signin)
router.post('/signin', authController.signin);

router.post('/signout', authController.signout);
module.exports = router;
