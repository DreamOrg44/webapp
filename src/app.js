const express = require('express');
const bodyParser = require('body-parser');
const healthCheckRoutes = require('./routes/healthCheckRoutes');
const userRoutes = require('./routes/userRoutes');
const CustomError = require('./utils/errorHandler');
const sequelize = require('./config/sequelize');

const app = express();
const bootstrapDatabase = async () => {
    try {
        await sequelize.sync({ alter: true });
        console.log("database synchronization completed successfully");
    } catch (error) {
        console.error("database synchronization failed", error);
    }
}
app.use(bodyParser.json());
bootstrapDatabase();
app.use(healthCheckRoutes);
app.use(userRoutes);

//Globally propogated since declared later in the codeflow
app.use((err, req, res, next) => {
    console.error('Arrived in global error handler:', err);
    console.error('err instanceof CustomError', err instanceof CustomError);


    if (err instanceof CustomError) {
        return res.status(err.statusCode).json({ error: err.message });
    }

    res.status(400).json({ error: 'Bad request' });
});


module.exports = app;

