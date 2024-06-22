const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const ForumComment = require('../models/forumComment')
const ForumMessage = require('../models/forumMessage');
const User = require('../models/user');

// add a new forum message
router.post('/newMessage', async (req, res) => {
    console.log('Received POST request:', req.body);
    try {
        // Create a new message object with mandatory fields
        const messageData = {
            userId: req.body.userId,
            image: req.body.image,
            title: req.body.title,
            body: req.body.body
        };

        // Include recommendation if it exists
        if (req.body.recommendation !== undefined) {
            messageData.recommendation = req.body.recommendation;
        }

        const message = new ForumMessage(messageData);

        const newMessage = await message.save();
        res.status(201).json(newMessage);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


// add new comment

// Route to add a new comment to a message
router.post('/messages/:messageId/comments', async (req, res) => {
    const { userId, image, title, body, recommendation } = req.body;
    const messageId = req.params.messageId;

    try {
        // Check if the referenced message exists
        const parentMessage = await ForumMessage.findById(messageId);
        if (!parentMessage) {
            return res.status(404).json({ message: 'Message not found' });
        }
        // Check if the user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Create a new comment
        const commentData = {
            userId,
            image,
            title,
            body,
            message: messageId  // Store the message ID as a reference
        };

        // Include recommendation if it exists
        if (recommendation !== undefined && recommendation !== null) {
            commentData.recommendation = recommendation;
        }

        const comment = new ForumComment(commentData);

        // Save the comment
        const newComment = await comment.save();
        res.status(201).json(newComment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// get all messages
// Route to get all forum messages
router.get('/messages', async (req, res) => {
    try {
        const messages = await ForumMessage.find();
        res.json(messages);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// get all comments for a message
// Route to get all comments for a specific message
router.get('/messages/:messageId/comments', async (req, res) => {
    try {
        const comments = await ForumComment.find({ message: req.params.messageId });
        res.json(comments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});



// TODO: think about adding edit and delete message and comment
// Update a message
router.put('/messages/:messageId', async (req, res) => {
    try {
        const updatedMessage = await ForumMessage.findByIdAndUpdate(
            req.params.messageId,
            { $set: req.body },
            { new: true }
        );
        res.json(updatedMessage);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a message and its associated comments
router.delete('/messages/:messageId', async (req, res) => {
    try {
        // Delete the message
        const deletedMessage = await ForumMessage.findByIdAndDelete(req.params.messageId);

        // Delete associated comments
        await ForumComment.deleteMany({ message: req.params.messageId });

        res.json({ message: 'Message deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


module.exports = router;
