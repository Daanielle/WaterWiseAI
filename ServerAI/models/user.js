const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

// Middleware to hash password before saving
// userSchema.pre('save', async function(next) {
//     if (this.isModified('password')) {
//         try {
//             const salt = await bcrypt.genSalt(10);
//             this.password = await bcrypt.hash(this.password, salt);
//         } catch (err) {
//             return next(err);
//         }
//     }
//     next();
// });

// userSchema.methods.comparePassword = async function (password) {
//     if (!password) throw new Error('Password is missing');

//     try {
//         return await bcrypt.compare(password, this.password);
//     } catch (error) {
//         throw new Error('Error comparing passwords');
//     }
// };

module.exports = mongoose.model('User', userSchema);
