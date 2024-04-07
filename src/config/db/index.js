const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/f8_education_dev');
        console.log('Connect to MongoDB successfully!');
    } catch (err) {
        console.log('Cannot connect to MongoDB!');
    }
}

module.exports = { connect };
