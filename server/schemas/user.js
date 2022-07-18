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
    timeSpend: {
        type: Number,
        default: null,
    },
    imageUrl: {
        type: String,
        default: null,
    },
});

const dateSchema = new Schema({
    date: {
        type: String,
    },
    count: {
        type: Number,
    },
});

const statsSchema = new Schema({
    daysStreak: {
        type: Number,
        default: null,
    },
    bestDay: {
        type: Number,
        default: null,
    },
    fastestEssay: {
        type: textsSchema,
        default: null,
    },
    longestEssay: {
        type: textsSchema,
        default: null,
    },
    averageWPM: {
        type: Number,
        default: null,
    },
    averageTime: {
        type: Number,
        default: null,
    },
    averageWordCount: {
        type: Number,
        default: null,
    },
    dailyWordCount: {
        type: [],
        default: null,
    },
    dailyTime: {
        type: [],
        default: null,
    },
});

const achievementSchema = new Schema({
    title: {
        type: String,
        default: "",
    },
    description: {
        type: String,
        default: "",
    },
    achievedTime: {
        type: Date,
        default: null,
    },
    achieved: {
        type: Boolean,
        default: false,
    },
    rank: {
        type: String,
        default: "",
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
    name: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: "",
    },
    texts: {
        type: [textsSchema],
        default: null,
    },
    imageUrl: {
        type: String,
        default: null,
    },
    firstEnter: {
        type: Boolean,
        default: true,
    },
    daysTextCount: [dateSchema],
    statistics: { type: statsSchema, default: null },
    achievements: {
        type: [achievementSchema],
        default: [],
    },
    friends: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

exports.UserModel = mongoose.model("User", userSchema);
exports.UserTextModel = mongoose.model("UserText", textsSchema);
