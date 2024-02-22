#!/usr/bin/env node
const app = require('./src/app');
const sequelize = require('./src/config/sequelize');
const PORT = 3000;


// Start the server only after the synchronization is successful
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

