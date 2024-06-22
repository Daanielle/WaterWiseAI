const mongoose = require('mongoose');

const forumMessageSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    image: {
        type: String,
        required: false
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
    recommendation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recommendation', // Reference to the Recommendation model
        required: false
    }
}, { timestamps: true });

// Adding an index for better performance on userId and title
forumMessageSchema.index({ userId: 1, title: 1 });

module.exports = mongoose.model('ForumMessage', forumMessageSchema);
