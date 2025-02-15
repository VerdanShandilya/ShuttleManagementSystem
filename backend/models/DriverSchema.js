const mongoose = require('mongoose');

const DriverSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    currentStatus: {
        type: String,
        required: true,
        default: "Available",
        enum: ["Available", "Unavailable","On Break"]
    }

},{
    collection: 'drivers'
});

module.exports = mongoose.model('Driver', DriverSchema);

