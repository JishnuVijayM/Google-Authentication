const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false,
        trim: true,
    },
    googleId: {
        type: String,
        required: false,
        trim: true,
    },
    email: {
        type: String,
        required: false,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
    },
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;