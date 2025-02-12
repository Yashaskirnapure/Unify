const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    original: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Image',
        required: true
    },
    final: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Image',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const Transform = mongoose.model('Transform', schema);

module.exports = { Transform }