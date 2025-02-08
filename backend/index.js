/**
 * index.js
 * Main entry point to start the server with best practices.
 */
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const config = require("./config/config");
const logger = require("./utils/logger");
const errorHandler = require("./middlewares/errorHandler");
const rateLimiter = require("./middlewares/rateLimiter");

// Routes
const employeeRoutes = require("./routes/employee.routes");
const timesheetRoutes = require("./routes/timesheet.routes");

const app = express();

// Security
app.use(helmet());
app.use(cors());
app.use(rateLimiter); // optional, but recommended

// JSON parsing
app.use(express.json());

// Route mounting
app.use("/employees", employeeRoutes);
app.use("/timesheets", timesheetRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("Employee Management API (MySQL) is running with best practices!");
});

// Global error handler
app.use(errorHandler);

app.listen(config.port, () => {
  logger.info(`Server running at http://localhost:${config.port}`);
});
