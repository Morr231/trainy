const nodemailer = require("nodemailer");
const express = require("express");
require("dotenv").config();

const { TokenModel } = require("../schemas/token");

const router = express.Router();

const sendMail = (token, email) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.MY_EMAIL,
            pass: process.env.MY_PASSWORD,
        },
    });

    const mailOptions = {
        from: process.env.MY_EMAIL,
        to: email,
        subject: "Verify your trainy email!",
        text: `randomNumber: ${token}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log("Email sent: " + info.response);
        }
    });
};

router.post("/send-email", (req, res) => {
    const query = TokenModel.findOne({ email: req.body.email });

    query.exec((err, found) => {
        if (err) return HandleError(err);

        const randomNumber = Math.floor(100000 + Math.random() * 900000);
        sendMail(randomNumber, req.body.email);

        console.log(randomNumber);

        if (!found) {
            const emailToken = new TokenModel();

            emailToken.email = req.body.email;
            emailToken.token = randomNumber;

            emailToken.save().then(() => {
                res.json({
                    saved: true,
                });
            });
        } else {
            found.token = randomNumber;
            found.save().then((item) => {
                console.log(item);
                res.json({
                    saved: true,
                });
            });
        }
    });
});

module.exports = router;
