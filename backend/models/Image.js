const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: { type: String, required: true },
    url: { type: String, required: true },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    path: {
        type: String,
        required: true,
        default: '/'
    }
});

const Image = mongoose.model('Image', schema);

module.exports = { Image }