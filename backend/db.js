const mysql = require("mysql2");

function connectWithRetry() {
  const connection = mysql.createConnection({
    host: process.env.DB_HOST || "db",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "root",
    database: process.env.DB_NAME || "app_db"
  });

  connection.connect((err) => {
    if (err) {
      console.log("❌ DB not ready. Retrying in 5 seconds...");
      setTimeout(connectWithRetry, 5000); // <-- MUST KEEP THIS
    } else {
      console.log("✅ MySQL Connected!");
    }
  });

  return connection; // <-- MUST RETURN
}

const db = connectWithRetry();
module.exports = db;
