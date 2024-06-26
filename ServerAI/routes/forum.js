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
        const { userId, image, title, body, recommendations } = req.body;

        // Check if userId is provided
        if (!userId) {
            return res.status(400).json({ message: 'userId is required' });
        }

        // Check if the user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Include recommendations if they exist
        const messageData = { userId, image, title, body };

        // Check if recommendations are provided and are an array
        if (recommendations && Array.isArray(recommendations)) {
            messageData.recommendations = recommendations;
        }

        const message = new ForumMessage(messageData);

        const newMessage = await message.save();
        res.status(201).json(newMessage);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});
// // add a new forum message
// router.post('/newMessage', async (req, res) => {
//     console.log('Received POST request:', req.body);
//     try {
//         // Create a new message object with mandatory fields
//         const { userId, image, title, body } = req.body;

//         // Check if userId is provided
//         if (!userId) {
//             return res.status(400).json({ message: 'userId is required' });
//         }

//         // Check if the user exists
//         const user = await User.findById(userId);
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         // Include recommendation if it exists
//         const messageData = { userId, image, title, body };
//         if (req.body.recommendation !== undefined) {
//             messageData.recommendation = req.body.recommendation;
//         }

//         const message = new ForumMessage(messageData);

//         const newMessage = await message.save();
//         res.status(201).json(newMessage);
//     } catch (err) {
//         res.status(400).json({ message: err.message });
//     }
// });

// // add a new forum message
// router.post('/newMessage', async (req, res) => {
//     console.log('Received POST request:', req.body);
//     try {
//         // Create a new message object with mandatory fields
//         const messageData = {
//             userId: req.body.userId,
//             image: req.body.image,
//             title: req.body.title,
//             body: req.body.body
//         };
//         // Check if the user exists
//         const user = await User.findById(userId);
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         // Include recommendation if it exists
//         if (req.body.recommendation !== undefined) {
//             messageData.recommendation = req.body.recommendation;
//         }

//         const message = new ForumMessage(messageData);

//         const newMessage = await message.save();
//         res.status(201).json(newMessage);
//     } catch (err) {
//         res.status(400).json({ message: err.message });
//     }
// });


// add new comment

// Route to add a new comment to a message
router.post('/messages/:messageId/comments', async (req, res) => {
    const { userId, title, body } = req.body;
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
            title,
            body,
            message: messageId  // Store the message ID as a reference
        };

        const comment = new ForumComment(commentData);

        // Save the comment
        const newComment = await comment.save();

        // Update parentMessage numOfComments
        parentMessage.numOfComments = parentMessage.numOfComments + 1;
        await parentMessage.save();

        res.status(201).json(newComment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


// Route to get all forum messages ordered by newest to oldest
router.get('/messages', async (req, res) => {
    try {
        // Find all messages and sort by createdAt field in descending order
        const messages = await ForumMessage.find().sort({ createdAt: -1 });
        res.json(messages);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route to get all comments for a specific message ordered by createdAt (newest to oldest)
router.get('/messages/:messageId/comments', async (req, res) => {
    try {
        const comments = await ForumComment.find({ message: req.params.messageId })
            .sort({ createdAt: -1 }); // Sort by createdAt in descending order

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
