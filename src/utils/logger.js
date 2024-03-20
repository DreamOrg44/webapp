const { createLogger, format } = require('winston');
const { LoggingWinston } = require('@google-cloud/logging-winston');

// Create a Winston logger instance
const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.json() // Use JSON format for logs
  ),
  transports: [
    new LoggingWinston({
      projectId: 'csye6225-ns-cloud-dev',
    }),
  ],
});

module.exports = logger;
