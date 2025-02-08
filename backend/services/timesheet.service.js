/**
 * services/timesheet.service.js
 */
const dayjs = require("dayjs");
const TimesheetModel = require("../models/timesheet.model");
const EmployeeModel = require("../models/employee.model");

class TimesheetService {
  async findAllTimesheets() {
    return TimesheetModel.findAll();
  }

  async getTimesheetById(id) {
    const ts = await TimesheetModel.findById(id);
    if (!ts) {
      const err = new Error("Timesheet not found");
      err.statusCode = 404;
      throw err;
    }
    return ts;
  }

  async createTimesheet(data) {
    // Check employee
    const employee = await EmployeeModel.findById(data.employeeId);
    if (!employee) {
      const err = new Error(`Employee not found with ID: ${data.employeeId}`);
      err.statusCode = 400;
      throw err;
    }

    // Validate time range
    const start = new Date(data.startTime);
    const end = new Date(data.endTime);
    if (start >= end) {
      const err = new Error("Start time must be before end time");
      err.statusCode = 400;
      throw err;
    }

    // Reformat ISO -> MySQL DATETIME
    const startFormatted = dayjs(data.startTime).format("YYYY-MM-DD HH:mm:ss");
    const endFormatted = dayjs(data.endTime).format("YYYY-MM-DD HH:mm:ss");

    const newData = {
      ...data,
      startTime: startFormatted,
      endTime: endFormatted,
    };

    return TimesheetModel.create(newData);
  }

  async updateTimesheet(id, data) {
    const existing = await TimesheetModel.findById(id);
    if (!existing) {
      const err = new Error("Timesheet not found");
      err.statusCode = 404;
      throw err;
    }

    // Check employee if changed
    if (data.employeeId && data.employeeId !== existing.employeeId) {
      const employee = await EmployeeModel.findById(data.employeeId);
      if (!employee) {
        const err = new Error(`Employee not found with ID: ${data.employeeId}`);
        err.statusCode = 400;
        throw err;
      }
    }

    // Validate times
    const start = new Date(data.startTime);
    const end = new Date(data.endTime);
    if (start >= end) {
      const err = new Error("Start time must be before end time");
      err.statusCode = 400;
      throw err;
    }

    // Reformat
    const startFormatted = dayjs(data.startTime).format("YYYY-MM-DD HH:mm:ss");
    const endFormatted = dayjs(data.endTime).format("YYYY-MM-DD HH:mm:ss");

    const updatedData = {
      ...data,
      startTime: startFormatted,
      endTime: endFormatted,
    };

    return TimesheetModel.update(id, updatedData);
  }
}

module.exports = new TimesheetService();
