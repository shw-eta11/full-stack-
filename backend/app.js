const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;

// Create MySQL pool
const db = mysql.createPool({
  host: process.env.DB_HOST || 'db_app',   // Docker service name
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_NAME || 'app_db'
});

// Retry DB connection until ready
function checkDbConnection(retries = 5) {
  db.getConnection((err, connection) => {
    if (err) {
      console.error('❌ DB not ready. Retrying in 5 seconds...');
      if (retries > 0) setTimeout(() => checkDbConnection(retries - 1), 5000);
      else console.error('❌ Could not connect to DB:', err);
    } else {
      console.log('✅ MySQL Connected!');
      connection.release();
    }
  });
}
checkDbConnection();

// Root route
app.get('/', (req, res) => {
  res.send('Backend is running! Use /users to fetch data.');
});

// /users route
app.get('/users', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      console.error('DB query error:', err);
      return res.status(500).json({ error: 'Database query failed' });
    }
    res.json(results);
  });
});

// Handle unknown routes
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
