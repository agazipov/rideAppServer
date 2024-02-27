const mongoose = require('mongoose');
const connection = require('../connectionDB/connection');

const routeSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
    },
    direction: {
        type: String,
        required: true,
    },
    seats: {
        type: Number,
    },
    color: {
        type: String,
    }
});

module.exports = connection.model('Route', routeSchema);