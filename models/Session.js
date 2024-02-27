const mongoose = require('mongoose');
const connection = require('../connectionDB/connection');

const schema = new mongoose.Schema({
  token: {
    type: String,
    unique: true,
    required: true,
  },
  lastVisit: {
    type: Date,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Admin',
  },
});

schema.path('lastVisit').index({expires: '7d'});

module.exports = connection.model('Session', schema);
