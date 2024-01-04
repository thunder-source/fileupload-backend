const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: [true, 'must provide name'],
    trim: true,
    maxlength: [20, 'name can not be more than 20 characters'],
  },
  password: {
    type: String,
    required: [true, 'must provide password'],
    trim: true,
    minlength: [8, 'password can not be less than 8 characters'],
    maxlength: [20, 'password can not be more than 20 characters'],
  },
});

module.exports = mongoose.model('User', userSchema);
