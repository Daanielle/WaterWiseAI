const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const ForumMessage = require('../models/forumMessage');

// Add a new forum message
router.post('/newMessage', async (req, res) => {
    console.log('Received POST request:', req.body);
    try {
        const message = new ForumMessage({
            userId: req.body.userId,
            image: req.body.image,
            title: req.body.title,
            body: req.body.body,
            likes: req.body.number,
            recommendation: req.body.recommendation
        });

        const newMessage = await message.save();
        res.status(201).json(newMessage);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

//add like

//get all messages

//add comment

module.exports = router;
