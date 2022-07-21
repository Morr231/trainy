const express = require("express");
const router = express.Router();
require("dotenv").config();

const { UserModel } = require("../../schemas/user");

const validateToken = require("../../middleware/validateToken");
router.all("*", [validateToken]);

router.get("/:id", (req, res) => {
    const query = UserModel.findOne({ username: req.params["id"] });

    try {
        query.exec((err, found) => {
            res.json({
                found: found,
            });
        });
    } catch (e) {
        res.json({
            found: null,
        });
    }
});

module.exports = router;
