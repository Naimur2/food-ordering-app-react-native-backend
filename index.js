const express = require("express");
const cors = require("cors");

const FoodDataRoute = require('./routes/foodDataRoute');
const CartRoute = require('./routes/cartRouter');
const UserRoute = require('./routes/userRoute');
const AddressRoute = require('./routes/addressRouter');
const OrderRoute = require('./routes/orderRoute');
const mongoose = require("mongoose");
const dotenv = require("dotenv");



dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static("public"));

// create database connection
mongoose.connect(process.env.MONGODB_URI, () => {
    console.log("connection Successful");
});



app.use('/foods', FoodDataRoute);
app.use('/user',UserRoute)
app.use('/cart',CartRoute);
app.use('/address',AddressRoute)
app.use('/orders',OrderRoute)


const errorHandler = (err, req, res, next) => {
    if (err.headerSent) {
        return next(err);
    }
    res.status(500).json({
        message: err.message,
    });
};

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log("Server Started at", port);
});
