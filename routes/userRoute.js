const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema = require("../schemas/userSchema");
const checkLogin = require("../middlewares/checklogin");

// create model
const User = new mongoose.model("User", userSchema);

// register user
router.post("/register", async (req, res) => {
    try {
        const user = await User.find({ email: req.body.email });
        if (user && user.length > 0) {
            res.status(400).json({
                error: "There was a server side error!",
            });
        } else {
            const encryptedPassword = await bcrypt.hash(req.body.password, 10);
            const newData = {
                name: req.body.name,
                email: req.body.email,
                role: req.body.role,
                password: encryptedPassword,
            };
            const newUser = await new User(newData);
            await newUser.save();

            res.status(200).json({
                data: newData,
                message: "Successfull",
            });
        }
    } catch (err) {
        res.status(500).json({ error: "There was a server side error!" });
    }
});

// login user
router.post("/login", async (req, res) => {
    try {
        const user = await User.find({ email: req.body.email });
        const userData = await User.find({ email: req.body.email }).select({
            password: 0,
        });

        if (user && user.length > 0) {
            const isValidPassword = await bcrypt.compare(
                req.body.password,
                user[0].password
            );
            if (isValidPassword) {
                // generate Token
                const token = jwt.sign(
                    {
                        email: user[0].email,
                        _id: user[0]._id,
                        role: user[0].role,
                    },
                    process.env.JWT_SECRET,
                    {
                        expiresIn: "2d",
                    }
                );
              

                res.status(200).json({
                    user: userData[0],
                    access_token: token,
                    message: "Login Successfull",
                });
            } else {
                res.status(401).json({ error: "Authentication failed!" });
            }
        } else {
            res.status(401).json({ error: "Authentication failed! " });
        }
    } catch (err) {
        res.status(500).json({ error: "There was a server side error!" });
    }
});

router.get("/auth", checkLogin, async (req, res) => {
    try {
        const { email, _id } = req;
        const user = await User.find({ _id }).select({
            password: 0,
        });
        console.log(user)
        res.status(200).json({
            result: user[0],
            message: "Successfull",
        });
    } catch (err) {
        res.status(500).json({ error: "There was a server side error!" });
    }
});

// export the router
module.exports = router;
