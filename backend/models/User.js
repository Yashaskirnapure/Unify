const mongoose = require("mongoose");
const { bool } = require("sharp");

const schema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
});

const User = mongoose.model('User', schema);

module.exports = { User }