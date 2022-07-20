const express = require("express");
const router = express.Router();
require("dotenv").config();

const { UserModel } = require("../../schemas/user");

const validateToken = require("../../middleware/validateToken");
router.all("*", [validateToken]);

router.get("/comment/:id", (req, res) => {
    const query = UserModel.findOne({ _id: req.body.user });

    try {
        query.exec((err, found) => {
            const resultText = found.texts.filter(
                (el) => el.topic === req.body.topic
            )[0];

            found.save().then(() => {
                res.json({
                    found: true,
                });
            });
        });
    } catch (e) {
        res.json({
            found: false,
        });
    }
});

module.exports = router;
