const mongoose = require('mongoose');
const express = require('express');
const Address = require('../schemas/addreessSchema');
const checkLogin = require('../middlewares/checkLogin');

const router = express.Router();

// add address
router.post('/add', checkLogin, async (req, res) => {
    try {
        const address = new Address(req.body);
        const result = await address.save();
        res.status(200).json({result,message:"success"});
    } catch (err) {
        res.status(500).json({ error: "There was a server side error!" });
    }
});

// find all addresses
router.post("/all",checkLogin, async (req, res) => {
    try {
        const result = await Address.find({ user: req.body.user });
        res.status(200).json({ result, message: "success" });
    } catch (err) {
        res.status(500).json({ error: "There was a server side error!" });
    }
});

// delete address
router.delete("/delete/:id",checkLogin, async (req, res) => {
    try {
        const result = await Address.findByIdAndDelete(req.params.id);
        res.status(200).json({ result, message: "success" });
    } catch (err) {
        res.status(500).json({ error: "There was a server side error!" });
    }
});

// update address
router.put("/update/:id",checkLogin, async (req, res) => {
    try {
        const result = await Address.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).json({ result, message: "success" });
    } catch (err) {
        res.status(500).json({ error: "There was a server side error!" });
    }
});


module.exports = router;

