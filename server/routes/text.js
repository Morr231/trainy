const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const router = express.Router();

const { UserModel, UserTextsModel } = require("../schemas/user");
const validateToken = require("../middleware/validateToken");

router.all("*", [validateToken]);

router.post("/save", (req, res) => {
    let wordCount = 0;

    const textFromUser = req.body.text.split(" ");

    for (let i = 0; i < textFromUser.length; i++) {
        if (textFromUser !== " ") {
            wordCount++;
        }
    }

    const newText = {
        ...req.body,
        wordCount: wordCount,
    };

    const user = UserModel.findOne({ username: req.tokenData.username });

    user.exec((err, found) => {
        if (err) return HandleError(err);

        if (found) {
            let foundTextIndex = -1;

            found.texts.forEach((el, index) => {
                if (newText.topic === el.topic) {
                    foundTextIndex = index;
                }
            });

            if (foundTextIndex === -1) {
                found.texts.push(newText);

                // const textModel = new UserTextsModel(newText);

                // textModel.save();
            } else {
                console.log(foundTextIndex);
                found.texts[foundTextIndex] = newText;
            }

            found.save().then((item) => {
                res.json({ saved: true });
                console.log("Text saved");
            });
        } else {
            res.json({ saved: false });
        }
    });
});

module.exports = router;
