const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    fullName: { type: String, required: true },
    verificationToken: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, expires: '24h' }
});

const Unverified = mongoose.model('Unverified', schema);

module.exports = { Unverified }