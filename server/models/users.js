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





require('dotenv').config(); // Ensure this is at the top of your db.js file
const express = require("express");
const db = require("../db");
const bcrypt = require('bcryptjs');

const router = express.Router();

// Signup Route
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if email already exists in the database
    const query = "SELECT * FROM users WHERE email = ?";
    db.promise().query(query, [email])
      .then(async ([rows]) => {
        if (rows.length > 0) {
          return res.status(400).json({ message: "Email already exists" });
        }

        // Hash the password before saving to DB
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert the user into the database
        const insertQuery = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
        db.promise().query(insertQuery, [name, email, hashedPassword])
          .then(() => {
            res.status(201).json({ message: "User registered successfully" });
          })
          .catch((err) => {
            console.error(err);
            res.status(500).json({ message: "Database insertion error" });
          });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ message: "Database error" });
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists in the database
    const query = "SELECT * FROM users WHERE email = ?";
    db.promise().query(query, [email])
      .then(async ([rows]) => {
        if (rows.length === 0) {
          return res.status(401).json({ message: "User not found. Please sign up first." });
        }

        const user = rows[0];

        // Compare the password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(401).json({ message: "Wrong credentials. Please try again." });
        }

        res.status(200).json({ message: "Login successful" });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ message: "Database error" });
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
