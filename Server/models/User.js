const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  sender: String, // USER OR AI
  content: String,
  timestamp: { type: Date, default: Date.now },
});

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  messages: [messageSchema],
});

module.exports = mongoose.model('User', userSchema);
