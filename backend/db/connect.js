const mongoose = require("mongoose");

mongoose.set('strictQuery', true);
const connectDB = async (uri) => {
    return mongoose.connect(uri)
}

module.exports = { connectDB }