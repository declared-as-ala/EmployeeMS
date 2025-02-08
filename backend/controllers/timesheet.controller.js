/**
 * controllers/timesheet.controller.js
 */
const timesheetService = require("../services/timesheet.service");

class TimesheetController {
  async getAll(req, res, next) {
    try {
      const timesheets = await timesheetService.findAllTimesheets();
      return res.json(timesheets);
    } catch (error) {
      return next(error);
    }
  }

  async getOne(req, res, next) {
    try {
      const { id } = req.params;
      const ts = await timesheetService.getTimesheetById(id);
      if (!ts) {
        const err = new Error("Timesheet not found");
        err.statusCode = 404;
        throw err;
      }
      return res.json(ts);
    } catch (error) {
      return next(error);
    }
  }

  async create(req, res, next) {
    try {
      const newTS = await timesheetService.createTimesheet(req.body);
      return res.status(201).json(newTS);
    } catch (error) {
      return next(error);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const updatedTS = await timesheetService.updateTimesheet(id, req.body);
      return res.json(updatedTS);
    } catch (error) {
      return next(error);
    }
  }
}

module.exports = TimesheetController;
