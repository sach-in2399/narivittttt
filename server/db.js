
const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",  // Change if needed
  password: "",  // Change if needed
  database: "narivitt",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("Connected to MySQL database");
  }
});

module.exports = db;

