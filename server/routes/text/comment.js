const express = require("express");
const router = express.Router();
require("dotenv").config();

const { UserModel } = require("../../schemas/user");

const validateToken = require("../../middleware/validateToken");
router.all("*", [validateToken]);

router.post("/comment", (req, res) => {
    const query = UserModel.findOne({ _id: req.body.user });

    try {
        query.exec((err, found) => {
            const changingText = found.texts.filter(
                (el) => el.topic === req.body.topic
            )[0];

            const comment = {
                text: req.body.text,
                date: req.body.date,
                user: req.body.user,
                startPosition: req.body.startPosition,
                endPosition: req.body.endPosition,
            };

            changingText.comments.push(comment);

            found.save().then(() => {
                res.json({
                    saved: true,
                });
            });
        });
    } catch (e) {
        res.json({
            saved: false,
        });
    }
});

module.exports = router;
