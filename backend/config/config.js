/**
 * config/config.js
 *
 * Loads environment variables and exports them as a config object.
 */
require("dotenv").config();

const config = {
  port: process.env.PORT || 4000,
  dbHost: process.env.DB_HOST || "localhost",
  dbUser: process.env.DB_USER || "root",
  dbPass: process.env.DB_PASS || "",
  dbName: process.env.DB_NAME || "employee_management",
  logLevel: process.env.LOG_LEVEL || "info",
};

module.exports = config;
