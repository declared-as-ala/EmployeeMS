/**
 * routes/timesheet.routes.js
 */
const express = require("express");
const router = express.Router();
const TimesheetController = require("../controllers/timesheet.controller");
const timesheetController = new TimesheetController();

router.get("/", (req, res, next) => timesheetController.getAll(req, res, next));
router.get("/:id", (req, res, next) =>
  timesheetController.getOne(req, res, next)
);
router.post("/", (req, res, next) =>
  timesheetController.create(req, res, next)
);
router.put("/:id", (req, res, next) =>
  timesheetController.update(req, res, next)
);

module.exports = router;
