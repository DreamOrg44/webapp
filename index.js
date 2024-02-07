const express = require('express');
const bodyParser = require('body-parser');
const healthCheckRoutes = require('./src/routes/healthCheckRoutes');
const userRoutes = require('./src/routes/userRoutes');
const sequelize = require('./src/config/sequelize');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(healthCheckRoutes);
app.use(userRoutes);

//find out by testing
app.use((err, req, res, next) => {
  console.error('Global error handler:', err);

  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({ error: err.message });
  }

  res.status(500).json({ error: 'Internal Server Error' });
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

