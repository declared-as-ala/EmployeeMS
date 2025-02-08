/**
 * controllers/employee.controller.js
 */
const employeeService = require("../services/employee.service");

class EmployeeController {
  async getAll(req, res, next) {
    try {
      const employees = await employeeService.getAllEmployees();
      return res.json(employees);
    } catch (error) {
      return next(error);
    }
  }

  async getOne(req, res, next) {
    try {
      const { id } = req.params;
      const employee = await employeeService.getEmployeeById(id);
      if (!employee) {
        const err = new Error("Employee not found");
        err.statusCode = 404;
        throw err;
      }
      return res.json(employee);
    } catch (error) {
      return next(error);
    }
  }

  async create(req, res, next) {
    try {
      const newEmployee = await employeeService.createEmployee(req.body);
      return res.status(201).json(newEmployee);
    } catch (error) {
      return next(error);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const updatedEmployee = await employeeService.updateEmployee(
        id,
        req.body
      );
      return res.json(updatedEmployee);
    } catch (error) {
      return next(error);
    }
  }
}

module.exports = EmployeeController;
