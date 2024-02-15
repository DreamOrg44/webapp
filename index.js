const app = require('./src/app');
const sequelize = require('./src/config/sequelize');
const PORT = 3000;

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

