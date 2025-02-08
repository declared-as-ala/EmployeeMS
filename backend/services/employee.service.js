/**
 * services/employee.service.js
 */
const EmployeeModel = require("../models/employee.model");

class EmployeeService {
  async getAllEmployees() {
    return await EmployeeModel.findAll();
  }

  async getEmployeeById(id) {
    return await EmployeeModel.findById(id);
  }

  async createEmployee(data) {
    if (!data.name) {
      const err = new Error("Name is required");
      err.statusCode = 400;
      throw err;
    }
    return await EmployeeModel.create(data);
  }

  async updateEmployee(id, data) {
    const existing = await EmployeeModel.findById(id);
    if (!existing) {
      const err = new Error("Employee not found");
      err.statusCode = 404;
      throw err;
    }
    return await EmployeeModel.update(id, data);
  }
}

module.exports = new EmployeeService();
