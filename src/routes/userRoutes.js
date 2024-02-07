// routes/healthCheckRoutes.js

const express = require('express');
const router = express.Router();
const userController = require('../controller/UserController');
const authHandler = require('../utils/authHandler');

// User Operations
router.post('/v1/user', userController.createUser);
router.put('/v1/user/self', authHandler, userController.updateUser);
router.get('/v1/user/self', authHandler, userController.getUserInfo);
//added to check if user is authenticated, will have to see the need before making it a final appraoch

module.exports = router;

