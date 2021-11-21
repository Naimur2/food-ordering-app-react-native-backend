const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        default: 'Dhaka'
    },
    addressline1: {
        type: String,
        required: true,
    },
    addressline2: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    user: {
        type: String,
        required: true,
    },
});


module.exports = new mongoose.model('Address', addressSchema);