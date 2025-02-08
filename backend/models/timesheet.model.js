/**
 * models/timesheet.model.js
 */
const pool = require("./db");

module.exports = {
  async findAll() {
    const [rows] = await pool.query("SELECT * FROM timesheets");
    return rows;
  },

  async findById(id) {
    const [rows] = await pool.query("SELECT * FROM timesheets WHERE id=?", [
      id,
    ]);
    return rows[0] || null;
  },

  async create(data) {
    const { employeeId, startTime, endTime, summary } = data;
    const [result] = await pool.query(
      `INSERT INTO timesheets (employeeId, startTime, endTime, summary)
       VALUES (?, ?, ?, ?)`,
      [employeeId, startTime, endTime, summary]
    );
    return this.findById(result.insertId);
  },

  async update(id, data) {
    const { employeeId, startTime, endTime, summary } = data;
    await pool.query(
      `UPDATE timesheets
       SET employeeId=?, startTime=?, endTime=?, summary=?
       WHERE id=?`,
      [employeeId, startTime, endTime, summary, id]
    );
    return this.findById(id);
  },
};
