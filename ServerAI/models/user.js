const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    // userName: {
    //     type: String,
    //     required: true
    // },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
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
    },
    image: {
        type: String,
        required: false
    }
});

// Ensure the unique index is created
userSchema.index({ name: 1 }, { unique: true });

module.exports = mongoose.model('User', userSchema);
