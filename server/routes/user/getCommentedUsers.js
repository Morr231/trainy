const express = require("express");
const router = express.Router();
require("dotenv").config();

const { UserModel } = require("../../schemas/user");

const validateToken = require("../../middleware/validateToken");
router.all("*", [validateToken]);

router.get("/all-users/:userId", (req, res) => {
    const query = UserModel.findOne({ _id: req.params["userId"] });

    try {
        query.exec((err, found) => {
            const resultText = found.texts;

            const userIds = [];

            resultText.forEach((el) => {
                el.comments.forEach((comment) => {
                    userIds.push(comment.user);
                });
            });

            const users = UserModel.find({
                _id: {
                    $in: userIds,
                },
            });

            users.exec((err, allUsers) => {
                allUsers.forEach((el) => {
                    delete el.password;
                });

                res.json({
                    found: allUsers,
                });
            });
        });
    } catch (e) {
        res.json({
            found: [],
        });
    }
});

module.exports = router;
