const express = require('express');
const bodyParser = require('body-parser');
const healthCheckRoutes = require('./routes/healthCheckRoutes');
const userRoutes = require('./routes/userRoutes');
const CustomError = require('./utils/errorHandler')

const app = express();

app.use(bodyParser.json());
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

