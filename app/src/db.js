const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: process.env.DB_HOST || "192.168.57.12",
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || "task_user",
  password: process.env.DB_PASSWORD || "task_password",
  database: process.env.DB_NAME || "task_manager",
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0
});

async function checkDatabaseConnection() {
  const [rows] = await pool.query("SELECT 1 AS ok");
  return rows[0];
}

module.exports = {
  pool,
  checkDatabaseConnection
};
