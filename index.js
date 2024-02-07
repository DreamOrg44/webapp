const express = require('express');
const bodyParser = require('body-parser');
const healthCheckRoutes = require('./src/routes/healthCheckRoutes');
const userRoutes = require('./src/routes/userRoutes');
const sequelize = require('./src/config/sequelize');
const CustomError=require('./src/utils/errorHandler')

const app = express();
const PORT = 3000;

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

const startServer = async () => {
  try {
    // Synchronize the database schema with the defined models
    await sequelize.sync({ alter: true });

    // Start the server only after the synchronization is successful
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error synchronizing database:', error);
  }
};

startServer();

module.exports = app;

