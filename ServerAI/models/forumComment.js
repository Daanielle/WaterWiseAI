const mongoose = require('mongoose');

const forumCommentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 100
    },
    body: {
        type: String,
        required: true,
        trim: true
    },
    message: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ForumMessage', // Reference to the ForumMessage model
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('ForumComment', forumCommentSchema);
