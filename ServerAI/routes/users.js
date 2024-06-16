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
    console.log(res.user)
    res.json(res.user);
});


// Add a user (Tested and working)
router.post('/register', async (req, res) => {
    console.log('Received POST request:', req.body);
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const user = new User({
            // username: req.body.username,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            image: req.body.image,
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
    if (req.body.email != null) {
        res.user.email = req.body.email;
    }
    if (req.body.image != null) {
        res.user.image = req.body.image;
    }
    // if (req.body.password != null) {
    try {
        const updatedUser = await res.user.save();
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});



// @route    PATCH /users/:id/password
// @desc     Update user password
// @access   Public (assuming it's accessible to the user updating their own password)
router.patch('/:id/password', getUser, async (req, res) => {
    if (req.body.password != null) {
        try {
            // Generate a salt
            const salt = await bcrypt.genSalt(10);
            // Hash the new password
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
            console.log('Password hashed:', hashedPassword); // Debugging line

            // Update the user's password
            res.user.password = hashedPassword;
            
            // Save the updated user with the new hashed password
            const updatedUser = await res.user.save();
            console.log('User updated:', updatedUser); // Debugging line
            
            res.json(updatedUser);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    } else {
        res.status(400).json({ message: 'Password is required' });
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
        res.json({ token, user });
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

router.patch('/:id/password2/', getUser, async (req, res) => {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
        return res.status(400).json({ message: 'Old password and new password are required' });
    }

    try {
        // Check if the old password matches
        const isMatch = await bcrypt.compare(oldPassword, res.user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Old password is incorrect' });
        }

        // Generate a salt and hash the new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        console.log('Password hashed:', hashedPassword); // Add this line for debugging

        // Update the user's password
        res.user.password = hashedPassword;

        // Save the updated user with the new hashed password
        const updatedUser = await res.user.save();
        console.log('User updated:', updatedUser); // Add this line for debugging
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
