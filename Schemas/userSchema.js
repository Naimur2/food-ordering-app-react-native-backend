const mongoose = require('mongoose');

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
    },
    role:{
        type: String,
        required: true,
        default: 'customer'
    },
    date: {
        type: Date,
        default: Date.now
    },
    avatar: {
        type: String,
        default: 'user.jpg'
    },
});

module.exports = new mongoose.model('User', userSchema);