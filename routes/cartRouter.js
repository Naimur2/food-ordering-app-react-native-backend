const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

const Cart = require("../schemas/cartSchema");
const checkLogin = require("../middlewares/checklogin");

// create model


router.post("/all", checkLogin, async (req, res) => {
    try {
        const result = await Cart.find({ userId: req.body.userId });
        res.status(200).json({ result, message: "success" });
    } catch (err) {
        res.status(500).json({ error: "There was a server side error!" });
    }
});

router.post("/add",  checkLogin, async (req, res) => {
    try {
        const item = await new Cart(req.body);
        const result = await item.save();

        res.status(200).json({ result, message: "success" });
    } catch (err) {
        res.status(500).json({ error: "There was a server side error!" });
    }
});

router.delete("/remove",checkLogin, async (req, res) => {
    try {
        const { _id } = req.body;

        await Cart.findOneAndDelete({ _id }); // returns Query

        res.status(200).json({ message: "Cart Deleted!" });
    } catch (err) {
        res.status(500).json({ error: "There was a server side error!" });
    }
});

router.put("/update",checkLogin, async (req, res) => {
    try {
        const { _id, quantity:qty } = req.body;

        const result = await Cart.findOneAndUpdate(
            { _id },
            //  is similar to only quantity
            { $set: {quantity: qty } },
            { new: true }
        );

        res.status(200).json({ result, message: "success" });
    } catch (err) {
        res.status(500).json({ error: "There was a server side error!" });
    }
});

router.delete("/all" ,checkLogin, async (req, res) => {
    try {
        await Cart.deleteMany({ user: req.body.user }); // returns Query
        res.status(200).json({ message: "Cart Deleted!" });
    } catch (err) {
        res.status(500).json({ error: "There was a server side error!" });
    }
});

// export the router
module.exports = router;
