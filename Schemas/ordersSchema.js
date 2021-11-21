const mongoose = require("mongoose");

const ordersSchema = new mongoose.Schema({
    address: {
        type: Object,
        required: true,
    },
    cartdetails: {
        type: Object,
        required: true,
    },
    user: {
        type: String,
        required: true,
    },
    deliveryStatus: {
        type: String,
        required: true,
    },
    paymentStatus: {
        type: String,
        required: true,
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    deliveryFee: {
        type: Number,
        required: true,
        default: 0,
    },
   acceptStatus: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    deliveryTime: {
        type: Date,
        default: Date.now,
    },

  
});

module.exports = new mongoose.model('Order', ordersSchema);