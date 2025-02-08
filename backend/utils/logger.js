/**
 * utils/logger.js
 *
 * Winston logger for structured logging and easy expansion.
 */
const winston = require("winston");
const config = require("../config/config");

const logger = winston.createLogger({
  level: config.logLevel,
  format: winston.format.combine(
    winston.format.timestamp(),
    // Print in console-friendly format
    winston.format.printf(
      ({ timestamp, level, message }) => `[${timestamp}] [${level}] ${message}`
    )
  ),
  transports: [new winston.transports.Console()],
});

module.exports = logger;
