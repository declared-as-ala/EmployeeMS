/**
 * middlewares/errorHandler.js
 *
 * Central error-handling middleware for consistent API error responses.
 */
const logger = require("../utils/logger");

function errorHandler(err, req, res, next) {
  // Log error details
  logger.error(err.message);

  if (res.headersSent) {
    return next(err);
  }

  // Decide status code
  const status = err.statusCode || 500;
  const message = status < 500 ? err.message : "Internal Server Error";

  return res.status(status).json({ error: message });
}

module.exports = errorHandler;
