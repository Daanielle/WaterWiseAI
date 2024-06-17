const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const ForumMessage = require('../models/forumMessage');

// add a new forum message
router.post('/newMessage', async (req, res) => {
    console.log('Received POST request:', req.body);
    try {
        const message = new ForumMessage({
            userId: req.body.userId,
            image: req.body.image,
            title: req.body.title,
            body: req.body.body,
            recommendation: req.body.recommendation
        });

        const newMessage = await message.save();
        res.status(201).json(newMessage);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// add new comment

// get all messages

// get all comments for a message

// add comment

// TODO: think about adding edit and delete message and comment

module.exports = router;
