const mysql = require("mysql2");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Harry@9901",
  database: "ubereats_db",
  connectionLimit: 10,
});

db.getConnection((err, connection) => {
  if (err) {
    console.error("Database connection failed:", err.message);
    process.exit(1);
  } else {
    console.log("✅ MySQL Connected Successfully");
    connection.release();
  }
});

module.exports = db;
