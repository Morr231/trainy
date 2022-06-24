const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const router = express.Router();
const { UserModel } = require("../schemas/user");

const validateToken = require("../middleware/validateToken");

router.all("*", [validateToken]);

router.get("/data", (req, res) => {
    const query = UserModel.findOne({ username: req.tokenData.username });
    query.exec((err, found) => {
        if (err) return handleError(err);

        res.json({
            userInfo: found,
        });
    });
});

module.exports = router;
