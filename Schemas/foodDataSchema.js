const mongoose = require('mongoose');

const FoodDataSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    discount: {
        type: Number,
        required: true,
        default: 0
    },
    deliveryCharge: {
        type: Number,
        default: 0,
    },
    images: {
        type: Array,
        required: true
    },
    category: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    deliveryTime:{
        type: String,
    }
});


module.exports = FoodDataSchema;
