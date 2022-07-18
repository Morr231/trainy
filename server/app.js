const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");

const Text = require("./schemas/text");
const IeltsFirstPart = require("./schemas/IeltsFirstPart");

const port = process.env.PORT || 5000;

const app = express();

const signRouter = require("./routes/sign");

const userVerificationRouter = require("./routes/sendMail/sendMail");
const forgotPassword = require("./routes/sendMail//forgotPassword");

const userRouter = require("./routes/userInfo");
const firstEnterRouter = require("./routes/firstEnter");

const randomRouter = require("./routes/randomTopics/randomTopic");
const IelstFPRouter = require("./routes/randomTopics/randomIeltsFP");

const textRouter = require("./routes/text");
const settingsRouter = require("./routes/settings");
const achievedRouter = require("./routes/achieved");

const usersSearchRouter = require("./routes/search/users-search");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(signRouter);
app.use(userVerificationRouter);
app.use(forgotPassword);

app.use("/user", userRouter);
app.use("/user", achievedRouter);
app.use("/user", firstEnterRouter);

app.use("/settings", settingsRouter);

app.use(randomRouter);
app.use(IelstFPRouter);

app.use("/text", textRouter);

app.use(usersSearchRouter);

mongoose
    .connect(
        process.env.NODE_ENV === "production"
            ? process.env.MONGODB_PROD_URL
            : process.env.MONGODB_DEV_URL
    )
    .then((result) => {
        console.log("Connected");
        app.listen(port);
    })
    .catch((err) => {
        console.log(err);
    });
