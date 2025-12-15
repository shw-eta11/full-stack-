require('dotenv').config();   // <-- VERY IMPORTANT

const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

// Test API
app.get('/', (req, res) => {
  res.send('Hello from backend!');
});

// Example: Get all users
app.get('/users', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// Example: Add user
app.post('/users', (req, res) => {
  const { name, email } = req.body;
  db.query(
    'INSERT INTO users (name, email) VALUES (?, ?)', 
    [name, email], 
    (err, results) => {
      if (err) return res.status(500).send(err);
      res.json({ id: results.insertId, name, email });
    }
  );
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend running on port ${PORT}`);
});
