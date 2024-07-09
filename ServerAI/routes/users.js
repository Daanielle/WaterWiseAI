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
        if (user === null) {
            res.user = null
            //return res.status(404).json({ message: 'Cannot find user' });
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

// Check if an email exists in the database
router.post('/check-email', async (req, res) => {
    const { email } = req.body;

    // Simple email format validation
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
        return res.status(400).json({ message: "Invalid email format" });
    }

    try {
        const user = await User.findOne({ email: email });
        if (user) {
            res.status(200).json({ exists: true });
        } else {
            res.status(200).json({ exists: false });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
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
    if (req.body.firstName != null) {
        res.user.firstName = req.body.firstName;
    }
    if (req.body.lastName != null) {
        res.user.lastName = req.body.lastName;
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
            return res.status(400).json({ message: 'email' });
        }


        // Compare the provided password with the hashed password
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            // If password is invalid, return error
            return res.status(400).json({ message: 'password' });
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


// Check if an email exists in the database
router.post('/check-email-token', async (req, res) => {
    const { email } = req.body;

    // Simple email format validation
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
        return res.status(400).json({ message: "Invalid email format" });
    }

    try {
        const user = await User.findOne({ email: email });
        if (user) {
            // Generate a shorter-lived token for email confirmation
            const emailToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '10m' });

            // Return the token and indication that email exists
            res.status(200).json({ exists: true, emailToken });
        } else {
            res.status(200).json({ exists: false });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// @route    PATCH /users/password-reset/:token
// @desc     Update user password using token
// @access   Public
router.patch('/password-reset/:token', async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    if (!password) {
        return res.status(400).json({ message: 'Password is required' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Generate a salt
        const salt = await bcrypt.genSalt(10);
        // Hash the new password
        const hashedPassword = await bcrypt.hash(password, salt);
        
        // Update the user's password
        user.password = hashedPassword;
        await user.save();

        res.json({ message: 'Password updated successfully' });
    } catch (err) {
        console.error('Error during password reset:', err);
        res.status(400).json({ message: 'Invalid or expired token' });
    }
});

module.exports = router;
