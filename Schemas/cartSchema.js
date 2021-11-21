const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    price: {
        type: Number,
        required: true,
    },
    productId: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    user: {
        type: String,
        required: true,
    },
  
});

module.exports = new mongoose.model("Cart", cartSchema);