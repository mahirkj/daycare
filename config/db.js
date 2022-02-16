const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
    try {
        await mongoose.connect(db);
        console.log("mongo db connected...");
    } catch (err) {
        console.error(err.message);
        // Exit process with failure
    }
}

module.exports = connectDB;