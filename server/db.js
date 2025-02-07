// Load environment variables from .env file
require('dotenv').config();

const mysql = require("mysql2");

// const urlDB = `mysql://:${process.env.MYSQLUSER}:${process.env.MYSQLPASSWORD}@${process.env.MYSQLHOST}:${process.env.MYSQLPORT}/${process.env.MYSQLDATABASE}`

const urlDB = `mysql://root:GldNTtBVRpYiVTGOCJbhtkwLraQYKiUu@monorail.proxy.rlwy.net:56506/railway`

const db = mysql.createConnection(urlDB);

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("Connected to MySQL database");
  }
});

module.exports = db;
