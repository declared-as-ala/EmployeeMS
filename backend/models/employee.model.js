/**
 * models/employee.model.js
 */
const pool = require("./db");

module.exports = {
  async findAll() {
    const [rows] = await pool.query("SELECT * FROM employees");
    return rows;
  },

  async findById(id) {
    const [rows] = await pool.query("SELECT * FROM employees WHERE id = ?", [
      id,
    ]);
    return rows[0] || null;
  },

  async create(data) {
    const { name, email, phone, jobTitle, department, startDate, endDate } =
      data;
    const [result] = await pool.query(
      `INSERT INTO employees 
       (name, email, phone, jobTitle, department, startDate, endDate)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [name, email, phone, jobTitle, department, startDate, endDate]
    );
    return this.findById(result.insertId);
  },

  async update(id, data) {
    const { name, email, phone, jobTitle, department, startDate, endDate } =
      data;
    await pool.query(
      `UPDATE employees
       SET name=?, email=?, phone=?, jobTitle=?, 
           department=?, startDate=?, endDate=?
       WHERE id=?`,
      [name, email, phone, jobTitle, department, startDate, endDate, id]
    );
    return this.findById(id);
  },
};
