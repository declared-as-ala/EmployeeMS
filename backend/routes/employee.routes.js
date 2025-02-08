/**
 * routes/employee.routes.js
 */
const express = require("express");
const router = express.Router();
const EmployeeController = require("../controllers/employee.controller");
const employeeController = new EmployeeController();

router.get("/", (req, res, next) => employeeController.getAll(req, res, next));
router.get("/:id", (req, res, next) =>
  employeeController.getOne(req, res, next)
);
router.post("/", (req, res, next) => employeeController.create(req, res, next));
router.put("/:id", (req, res, next) =>
  employeeController.update(req, res, next)
);

module.exports = router;
