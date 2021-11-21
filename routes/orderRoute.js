const express = require("express");
const Order = require("../schemas/ordersSchema");
const checkLogin = require("../middlewares/checkLogin");

const router = express.Router();

router.post("/add", checkLogin, async (req, res) => {
    try {
        const order = new Order(req.body);
        const result = await order.save();
        console.log(result);
        res.status(200).json({ result, message: "success" });
    } catch (err) {
        res.status(500).json({ error: "There was a server side error!" });
    }
});

router.post("/all", checkLogin, async (req, res) => {
    try {
        const result = await Order.find({ user: req.body.user });
        res.status(200).json({ result, message: "success" });
    } catch (err) {
        res.status(500).json({ error: "There was a server side error!" });
    }
});

router.put("/update", async (req, res) => {
    try {
        const { orderId: _id, status } = req.body;

        let result = [];
      
        if (status === "accepted" || status === "rejected") {
            const acceptStatus = status === "accepted";
            const deliveryStatus = acceptStatus ? "processing" : status;
           

            result = await Order.findOneAndUpdate(
                { _id },
                { $set: { acceptStatus, deliveryStatus  } },
                { new: true }
            );
        }
        else {
            result = await Order.findOneAndUpdate(
                { _id },
                { $set: { deliveryStatus:status } },
                { new: true }
            );
        }

        res.status(200).json({ result, message: "success" });
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: "There was a server side error!" });
    }
});

module.exports = router;
