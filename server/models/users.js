// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const db = require('../db');  // Import database connection
// require('dotenv').config();

// // Register new user
// const registerUser = (email, password, callback) => {
//   bcrypt.hash(password, 10, (err, hashedPassword) => {
//     if (err) return callback(err);

//     const query = 'INSERT INTO users (email, password) VALUES (?, ?)';
//     db.query(query, [email, hashedPassword], (err, result) => {
//       if (err) return callback(err);
//       callback(null, result);
//     });
//   });
// };

// // Find user by email
// const findUserByEmail = (email, callback) => {
//   const query = 'SELECT * FROM users WHERE email = ?';
//   db.query(query, [email], (err, results) => {
//     if (err) return callback(err);
//     callback(null, results[0]);
//   });
// };

// // Generate JWT token
// const generateToken = (userId) => {
//   return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
// };

// module.exports = { registerUser, findUserByEmail, generateToken };




// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const db = require('../db');  // Import database connection
// require('dotenv').config();

// // Register new user
// const registerUser = (email, password, callback) => {
//   bcrypt.hash(password, 10, (err, hashedPassword) => {
//     if (err) return callback(err);

//     const query = 'INSERT INTO users (email, password) VALUES (?, ?)';
//     db.query(query, [email, hashedPassword], (err, result) => {
//       if (err) return callback(err);
//       callback(null, result);
//     });
//   });
// };

// // Find user by email
// const findUserByEmail = (email, callback) => {
//   const query = 'SELECT * FROM users WHERE email = ?';
//   db.query(query, [email], (err, results) => {
//     if (err) return callback(err);
//     callback(null, results[0]);
//   });
// };

// // Generate JWT token
// const generateToken = (userId) => {
//   return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
// };

// module.exports = { registerUser, findUserByEmail, generateToken };





const express = require("express");
const db = require("../db");
const bcrypt = require("bcrypt");

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if email already exists
    db.query("SELECT * FROM users WHERE email = ?", [email], async (err, result) => {
      if (err) return res.status(500).json({ message: "Database error" });
      if (result.length > 0) return res.status(400).json({ message: "Email already exists" });

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert user into database
      db.query("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, hashedPassword], (err) => {
        if (err) return res.status(500).json({ message: "Database insertion error" });
        res.status(201).json({ message: "User registered successfully" });
      });
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;


router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    db.query("SELECT * FROM users WHERE email = ?", [email], async (err, result) => {
      if (err) return res.status(500).json({ message: "Database error" });

      if (result.length === 0) return res.status(401).json({ message: "User not found. Please sign up first." });

      const user = result[0];

      // Compare password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(401).json({ message: "Wrong credentials. Please try again." });

      res.status(200).json({ message: "Login successful" });
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

