// const express = require('express');
// const bodyParser = require('body-parser');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const db = require('./models/users'); // Import the database connection

// const app = express();
// const port = 5001;

// app.use(bodyParser.json());
// const cors = require("cors")
// app.use(cors())

// // Register endpoint
// app.post('/register', (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(400).json({ message: 'Please provide both email and password.' });
//   }

//   // Check if user already exists
//   db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
//     if (err) {
//       return res.status(500).json({ message: 'Database error' });
//     }

//     if (results.length > 0) {
//       return res.status(400).json({ message: 'Email already in use' });
//     }

//     // Hash password before saving
//     bcrypt.hash(password, 10, (err, hashedPassword) => {
//       if (err) return res.status(500).json({ message: 'Error hashing password' });

//       // Insert new user
//       db.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword], (err, result) => {
//         if (err) return res.status(500).json({ message: 'Error registering user' });

//         res.status(200).json({ message: 'User registered successfully' });
//       });
//     });
//   });
// });

// // Login endpoint
// app.post('/login', (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(400).json({ message: 'Please provide both email and password.' });
//   }

//   // Find user by email
//   db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
//     if (err) {
//       return res.status(500).json({ message: 'Database error' });
//     }

//     if (results.length === 0) {
//       return res.status(404).json({ message: 'Email not found' });
//     }

//     const user = results[0];

//     // Compare password with hashed password
//     bcrypt.compare(password, user.password, (err, isMatch) => {
//       if (err) {
//         return res.status(500).json({ message: 'Error comparing passwords' });
//       }

//       if (!isMatch) {
//         return res.status(401).json({ message: 'Invalid password' });
//       }

//       // Generate JWT token
//       const token = jwt.sign({ userId: user.id }, 'your_jwt_secret', { expiresIn: '1h' });

//       res.status(200).json({ message: 'Login successful', token });
//     });
//   });
// });

// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });


// app.get('/', (req, res) => {
//   res.send('Welcome to the API!');
// });





// const express = require('express');
// const bodyParser = require('body-parser');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const db = require('./models/users'); // Import the database connection

// const app = express();
// const port = 5001;

// app.use(bodyParser.json());

// // Register endpoint
// app.post('/register', (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(400).json({ message: 'Please provide both email and password.' });
//   }

//   // Check if user already exists
//   db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
//     if (err) {
//       return res.status(500).json({ message: 'Database error' });
//     }

//     if (results.length > 0) {
//       return res.status(400).json({ message: 'Email already in use' });
//     }

//     // Hash password before saving
//     bcrypt.hash(password, 10, (err, hashedPassword) => {
//       if (err) return res.status(500).json({ message: 'Error hashing password' });

//       // Insert new user
//       db.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword], (err, result) => {
//         if (err) return res.status(500).json({ message: 'Error registering user' });

//         res.status(200).json({ message: 'User registered successfully' });
//       });
//     });
//   });
// });

// // Login endpoint
// app.post('/login', (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(400).json({ message: 'Please provide both email and password.' });
//   }

//   // Find user by email
//   db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
//     if (err) {
//       return res.status(500).json({ message: 'Database error' });
//     }

//     if (results.length === 0) {
//       return res.status(404).json({ message: 'Email not found' });
//     }

//     const user = results[0];

//     // Compare password with hashed password
//     bcrypt.compare(password, user.password, (err, isMatch) => {
//       if (err) {
//         return res.status(500).json({ message: 'Error comparing passwords' });
//       }

//       if (!isMatch) {
//         return res.status(401).json({ message: 'Invalid password' });
//       }

//       // Generate JWT token
//       const token = jwt.sign({ userId: user.id }, 'your_jwt_secret', { expiresIn: '1h' });

//       res.status(200).json({ message: 'Login successful', token });
//     });
//   });
// });

// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });``

// app.get('/', (req, res) => {
//   res.send('Welcome to the API!');
// });




const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRoutes = require("./models/users");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api/users", userRoutes);

const PORT = 5003;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
