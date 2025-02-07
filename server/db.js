// Load environment variables from .env file
require('dotenv').config();

const mysql = require("mysql2");

const db = mysql.createConnection({
  host: process.env.DB_HOST,  // Use DB_HOST from .env
  user: process.env.DB_USER,  // Use DB_USER from .env
  password: process.env.DB_PASSWORD,  // Use DB_PASSWORD from .env
  database: process.env.DB_DATABASE,  // Use DB_DATABASE from .env
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("Connected to MySQL database");
  }
});

module.exports = db;
