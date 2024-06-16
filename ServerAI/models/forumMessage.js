const mongoose = require('mongoose');

const forumMessageSchema = new mongoose.Schema({
    userId: String,
    image: String,
    title: String,
    body: String,
    likes: Number,
    recommendation: String
}, { timestamps: true });

module.exports = mongoose.model('ForumMessage', forumMessageSchema);
