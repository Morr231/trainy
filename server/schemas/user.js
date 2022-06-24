const mongoose = require("mongoose");
const { Schema } = mongoose;

const textsSchema = new Schema({
    text: {
        type: String,
        // required: true,
    },
    topic: {
        type: String,
        // required: true,
    },
    date: {
        type: Date,
        // required: true,
    },
    wordCount: {
        type: Number,
        // required: true,
    },
});

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    texts: {
        type: [textsSchema],
        default: null,
    },
});

exports.UserModel = mongoose.model("User", userSchema);
exports.UserTextModel = mongoose.model("UserText", textsSchema);
