const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'must provide title'],
    trim: true,
  },
  content: String,
});

module.exports = mongoose.model('Note', noteSchema);
