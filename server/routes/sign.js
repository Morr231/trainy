const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { UserModel, UserTextModel } = require("../schemas/user");

function generateAccessToken(username) {
    return jwt.sign({ username }, process.env.TOKEN_SECRET, {
        expiresIn: "1800s",
    });
}

router.post("/signUp", (req, res) => {
    const query = UserModel.find({ email: req.body.email });
    query.exec((err, found) => {
        if (err) return handleError(err);

        if (!found.length) {
            const user = new UserModel({ ...req.body, texts: [] });
            user.save().then((item) => {
                res.json({ saved: true });
                console.log("data saved in DB");
            });
        } else {
            res.json({ saved: false });
        }
    });
});

router.post("/signIn", (req, res) => {
    const query = UserModel.find({ email: req.body.email });
    query.exec((err, found) => {
        if (err) return handleError(err);

        if (found.length) {
            const token = generateAccessToken(found[0].username);

            res.json({
                found: true,
                token: `Bearer ${token}`,
                username: found[0].username,
            });
        } else {
            res.json({ found: false });
        }
    });
});

module.exports = router;
