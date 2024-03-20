// controllers/HealthCheckController.js
const logger = require('../utils/logger');

async function performHealthCheck(req, res, next) {

    // Check postgres connection
    console.log("Reached in controller to perform health check");
    logger.debug('Reached in controller to perform health check');
    console.log("req.body is ", req.body);
    if (req.method !== 'GET') {
        console.log("Reached to verify if request type is correct");
        logger.debug('Reached to verify if request type is correct');
        res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
        res.status(405).send();
    } else if (req.headers['content-type'] && req.headers['content-type'] !== 'application/json') {
        console.log("Reached to verify content type");
        res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
        return res.status(415).send();
    } else if (Object.keys(req.body).length > 0 || Object.keys(req.query).length > 0) {
        console.log("Reached to check if no payload");
        res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
        logger.warn('Bad request sent');
        res.status(400).send();
    } else {
        console.log("Skipping next as heakth check tested fine");
        logger.debug('Skipping next as heakth check tested fine');
        next();
    }

    // console.error('Database connection error:', error);
    // res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
    // res.status(503).send();

}

module.exports = {
    performHealthCheck,
};
