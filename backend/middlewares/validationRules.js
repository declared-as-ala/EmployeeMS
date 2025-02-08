/**
 * middlewares/validationRules.js
 */
const { body, validationResult } = require("express-validator");

const superheroCreationRules = [
  body("name").notEmpty().withMessage("Name is required"),
  body("superpower").notEmpty().withMessage("Superpower is required"),
  body("humilityScore")
    .isInt({ min: 1, max: 10 })
    .withMessage("Humility score must be an integer between 1 and 10"),
];

// This middleware checks validation results
function checkValidationResult(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Return the first validation error
    const error = errors.array()[0].msg;
    const err = new Error(error);
    err.statusCode = 400;
    return next(err);
  }
  return next();
}

module.exports = {
  superheroCreationRules,
  checkValidationResult,
};
