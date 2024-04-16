// routes/healthCheckRoutes.js

const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const authHandler = require('../utils/authHandler');

// User Operations
router.post('/v2/user', userController.createUser);
router.put('/v2/user/self', authHandler, userController.updateUser);
router.get('/v2/user/self', authHandler, userController.getUserInfo);
router.get('/verify', userController.updateUserEmailVerification);
//added to check if user is authenticated, will have to see the need before making it a final appraoch

module.exports = router;

