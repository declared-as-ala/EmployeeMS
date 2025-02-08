/**
 * models/db.js
 *
 * Creates a MySQL connection pool and initializes tables if they don't exist.
 */
const mysql = require("mysql2/promise");
const config = require("../config/config");
const logger = require("../utils/logger");

const pool = mysql.createPool({
  host: config.dbHost,
  user: config.dbUser,
  password: config.dbPass,
  database: config.dbName,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

async function initDB() {
  const createEmployeesTable = `
    CREATE TABLE IF NOT EXISTS employees (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100),
      phone VARCHAR(50),
      jobTitle VARCHAR(100),
      department VARCHAR(100),
      startDate DATE,
      endDate DATE
    )
  `;
  const createTimesheetsTable = `
    CREATE TABLE IF NOT EXISTS timesheets (
      id INT AUTO_INCREMENT PRIMARY KEY,
      employeeId INT NOT NULL,
      startTime DATETIME NOT NULL,
      endTime DATETIME NOT NULL,
      summary TEXT,
      FOREIGN KEY (employeeId) REFERENCES employees(id)
    )
  `;

  const conn = await pool.getConnection();
  try {
    await conn.execute(createEmployeesTable);
    await conn.execute(createTimesheetsTable);
    logger.info("Tables ensured (employees, timesheets).");
  } catch (err) {
    logger.error("Error initializing MySQL tables: " + err.message);
  } finally {
    conn.release();
  }
}

initDB().catch((err) => logger.error(err.message));

module.exports = pool;
