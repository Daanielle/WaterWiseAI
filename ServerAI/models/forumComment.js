// const mongoose = require('mongoose');

// const forumCommentSchema = new mongoose.Schema({
//     userId: String,
//     image: String,
//     title: String,
//     body: String,
//     recommendation: String,
//     message: String,
// }, { timestamps: true });

// module.exports = mongoose.model('ForumComment', forumCommentSchema);

const mongoose = require('mongoose');

const forumCommentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
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
    },
    message: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ForumMessage', // Reference to the ForumMessage model
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('ForumComment', forumCommentSchema);
