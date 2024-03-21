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
const logger = require('../utils/logger');

router.use('/healthz', healthCheckController.performHealthCheck);

router.get('/healthz', async (req, res) => {
    console.log("Reached in routes after performing health check");
    logger.info('Reached in routes after performing health check');

  try {
    await sequelize.authenticate();
    logger.debug('Sequelize request in process');
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
    res.status(200).send();
  } catch (error) {
    console.error('Unexpected error:', error);
    logger.error('Unexpected error:', error);
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
    res.status(503).send();
  }
});

module.exports = router;
