const mongoose = require('mongoose');
const connection = require('../connectionDB/connection');

const rideSchema = new mongoose.Schema({
    time: {
        type: String,
        required: true,
    },
    car: {
        type: String,
        required: true,
    },
    driver: {
        type: String,
        required: true,
    },
    passengers: [{
        type: Object,
    }],
    route: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Route',
    },
});

module.exports = connection.model('Ride', rideSchema);