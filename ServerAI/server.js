const express = require('express')
const app = express()

// const mysql = require('mysql');


app.get("/api", (req, res) => {
    res.json({"users": ["U1", "U2", "U3"]})
})

// // Create a user
// app.post('/api/users', (req, res) => {
//     const { username, firstname, lastname, country, password, email } = req.body;
//     const newUser = { username, firstname, lastname, country, password, email };
//     const sql = 'INSERT INTO Users SET ?';
//     db.query(sql, newUser, (err, result) => {
//       if (err) {
//         res.status(500).json({ error: 'Error creating user' });
//       } else {
//         res.status(201).json({ message: 'User created successfully', userId: result.insertId });
//       }
//     });
//   });
  
//   // Get all users
//   app.get('/api/users', (req, res) => {
//     const sql = 'SELECT * FROM Users';
//     db.query(sql, (err, results) => {
//       if (err) {
//         res.status(500).json({ error: 'Error fetching users' });
//       } else {
//         res.status(200).json(results);
//       }
//     });
//   });
  
//   // Get user by ID
//   app.get('/api/users/:id', (req, res) => {
//     const userId = req.params.id;
//     const sql = 'SELECT * FROM Users WHERE user_id = ?';
//     db.query(sql, userId, (err, result) => {
//       if (err) {
//         res.status(500).json({ error: 'Error fetching user' });
//       } else {
//         if (result.length === 0) {
//           res.status(404).json({ error: 'User not found' });
//         } else {
//           res.status(200).json(result[0]);
//         }
//       }
//     });
//   });
  
app.listen(5000, () => {console.log("server started on port 5000")})
