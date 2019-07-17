const bcrypt = require('bcrypt');
const mongoogse = require('mongoose');

const UserSchema = new mongoogse.Schema({
  username: {
    type: String,
    required: [true, 'Please provide your username.'],
    unique: true
  },
  email: {
    type: String,
    required: [true, 'Please provide your email.'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Please provide your password.']
  }
});

// Password encyption in databse
UserSchema.pre('save', function(next) {
  const user = this;

  bcrypt.hash(user.password, 10, function(error, encrypted) {
    user.password = encrypted;

    next();
  });
});

module.exports = mongoogse.model('User', UserSchema);
