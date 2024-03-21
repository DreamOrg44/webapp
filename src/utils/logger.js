const winston = require("winston");
const path = require("path");
const logDirectory = path.join(__dirname, "logs");


const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(), // Include timestamp
    winston.format.json() // Use JSON format for logs
  ),  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "/var/log/csye6225/webapp.log" }),
    // new winston.transports.File({ filename: path.join(logDirectory, "webapp.log") })
    //new winston.transports.File({ filename: "./webapp.log" }),
  ],
});

module.exports = logger;