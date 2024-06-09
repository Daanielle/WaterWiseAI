const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true // Enforce unique email addresses
    },
    password: {
        type: String,
        required: true
    }
});

// Ensure the unique index is created
userSchema.index({ email: 1 }, { unique: true });

module.exports = mongoose.model('User', userSchema);
