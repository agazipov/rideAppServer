const mongoose = require('mongoose');
const crypto = require('crypto');
const connection = require('../connectionDB/connection');
const config = require('../config/config');

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'У пользователя должно быть имя',
    unique: 'Такое имя уже существует',
  },
  passwordHash: {
    type: String,
  },
  salt: {
    type: String,
  },
}, {
  timestamps: true,
});

function generatePassword(salt, password) {
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(
        password, salt,
        config.crypto.iterations,
        config.crypto.length,
        config.crypto.digest,
        (err, key) => {
          if (err) return reject(err);
          resolve(key.toString('hex'));
        },
    );
  });
}

function generateSalt() {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(config.crypto.length, (err, buffer) => {
      if (err) return reject(err);
      resolve(buffer.toString('hex'));
    });
  });
}

adminSchema.methods.setPassword = async function setPassword(password) {
  this.salt = await generateSalt();
  this.passwordHash = await generatePassword(this.salt, password);
};

adminSchema.methods.checkPassword = async function(password) {
  if (!password) return false;

  const hash = await generatePassword(this.salt, password);
  return hash === this.passwordHash;
};

module.exports = mongoose.model('Admin', adminSchema);
// module.exports = connection.model('Admin', adminSchema);
