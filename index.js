const express = require('express');
const bodyParser = require('body-parser');
const healthCheckRoutes = require('./src/routes/healthCheckRoutes');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(healthCheckRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;

