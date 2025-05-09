require('dotenv').config();
const mysql = require('mysql2/promise'); // ✅ usa el módulo de promesas

const db = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'plaxtilineas'
});

module.exports = db;
