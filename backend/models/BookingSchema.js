const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    customer_name: {
        type: String,
        required: true
    },
    pickupLocation: {
        type: String,
        required: true
    },
    dropLocation: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: "Pending",
        enum: ["Pending", "Confirmed","Cancelled"]
    }

},{
    collection: 'bookings'
});

module.exports = mongoose.model('Booking', BookingSchema);
