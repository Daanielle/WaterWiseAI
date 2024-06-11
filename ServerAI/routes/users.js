const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authenticateToken = require('../middleware/auth');

// Middleware function to get a user by ID
async function getUser(req, res, next) {
    let user;
    try {
        user = await User.findById(req.params.id);
        if (user == null) {
            return res.status(404).json({ message: 'Cannot find user' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.user = user;
    next();
}

// Getting all users (Tested and working)
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Getting a specific user
router.get('/:id', getUser, (req, res) => {
    res.json(res.user);
});


// Add a user (Tested and working)
router.post('/register', async (req, res) => {
    console.log('Received POST request:', req.body);
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        });

        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update a user
router.patch('/:id', getUser, async (req, res) => {
    if (req.body.name != null) {
        res.user.name = req.body.name;
    }
    if (req.body.email != null) {
        res.user.email = req.body.email;
    }
    if (req.body.password != null) {
        try {
            const salt = await bcrypt.genSalt(10);
            res.user.password = await bcrypt.hash(req.body.password, salt);
        } catch (err) {
            return res.status(400).json({ message: err.message });
        }
    }

    try {
        const updatedUser = await res.user.save();
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a user
router.delete('/:id', getUser, async (req, res) => {
    try {
        await res.user.remove();
        res.json({ message: 'Deleted User' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// User login (Tested and working), ganarate a token for the user.
router.post('/login', async (req, res) => {
    try {
        // Find the user by email
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            // If user not found, return error
            return res.status(400).json({ message: '1 Invalid email or password' });
        }


        // Compare the provided password with the hashed password
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            // If password is invalid, return error
            return res.status(400).json({ message: '2 Invalid email or password' });
        }

        // If both email and password are valid, generate JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({ message: err.message });
    }
});

// GET route to check if the user is logged in
router.get('/login/check', authenticateToken, (req, res) => {
    // Check if req.user is null, indicating that the user is not logged in
    if (!req.user) {
        res.json({ loggedIn: false });
    } else {
        // User is logged in
        // You can access user information from req.user if needed
        res.json({ loggedIn: true });
    }
  });
module.exports = router;
