/**
 * middlewares/rateLimiter.js
 *
 * Basic rate limiter to protect endpoints from excessive requests.
 */
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per window per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: "Too many requests from this IP, please try again later.",
});

module.exports = limiter;
