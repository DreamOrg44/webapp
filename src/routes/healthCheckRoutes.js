// routes/healthCheckRoutes.js
const express = require('express');
const router = express.Router();
// const statusCheck = require('../models/statusCheck');
const { Sequelize, DataTypes } = require('sequelize');
//const dbConfig = require('../config/dbConfig');
const sequelize = require('../config/sequelize');
// const sequelize = new Sequelize(dbConfig.database);
// const HealthCheck = statusCheck(sequelize, DataTypes);
const healthCheckController = require('../controller/healthCheckController');

router.use('/healthz', healthCheckController.performHealthCheck);

router.get('/healthz', async (req, res) => {
    console.log("Reached in routes after performing health check");

  try {
    await sequelize.authenticate();
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
    res.status(200).send();
  } catch (error) {
    console.error('Unexpected error:', error);
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
    res.status(503).send();
  }
});

module.exports = router;
