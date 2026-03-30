const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// Kết nối MySQL bằng biến môi trường (Yêu cầu 3.3 & 4)
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'mysql_db',
  user: 'root',
  password: 'password', // Khớp với docker-compose
  database: 'taskdb'
});

db.connect(err => {
  if (err) console.error('MySQL Connection Error:', err);
  else console.log('Connected to MySQL successfully!');
});

// 1. Health Check (Yêu cầu 3.2)
app.get('/health', (req, res) => res.json({ status: "ok" }));

// 2. About (Yêu cầu 3.1)
app.get('/about', (req, res) => res.json({
  name: "Khanh",
  studentID: "2110xxxx", 
  class: "DevOps_Class"
}));

// 3. API GET & POST (Yêu cầu 1.2)
app.get('/tasks', (req, res) => {
  db.query('SELECT * FROM tasks', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

app.post('/tasks', (req, res) => {
  const { title } = req.body;
  db.query('INSERT INTO tasks (title) VALUES (?)', [title], (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(201).json({ id: result.insertId, title });
  });
});

app.listen(process.env.PORT || 5000, () => console.log('BE is running...'));