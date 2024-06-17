const mongoose = require('mongoose');

const forumCommentSchema = new mongoose.Schema({
    userId: String,
    image: String,
    title: String,
    body: String,
    recommendation: String,
    message: String,
}, { timestamps: true });

module.exports = mongoose.model('ForumComment', forumCommentSchema);
