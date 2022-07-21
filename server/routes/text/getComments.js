const express = require("express");
const router = express.Router();
require("dotenv").config();

const { UserModel } = require("../../schemas/user");

const validateToken = require("../../middleware/validateToken");
router.all("*", [validateToken]);

router.get("/comment/:userId/:id", (req, res) => {
    const query = UserModel.findOne({ _id: req.params["userId"] });

    try {
        query.exec((err, found) => {
            const textLength = found.texts.length;
            const resultText = found.texts[textLength - req.params["id"] - 1];

            res.json({
                found: resultText.comments,
            });
        });
    } catch (e) {
        res.json({
            found: [],
        });
    }
});

module.exports = router;
