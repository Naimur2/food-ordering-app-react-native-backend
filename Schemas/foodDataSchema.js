const mongoose = require('mongoose');

const foodDataSchema = new mongoose.Schema({
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
    rating: {
        type: Number,
        default: 0
    },
    ratingCount: {
        type: Number,
        default: 0
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    max:{
        type: Number,
        default: 5,
    },
    min:{
        type: Number,
        default: 1,
    },
});


module.exports = new mongoose.model('FoodData', foodDataSchema);
