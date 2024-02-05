const mongoose = require("mongoose");

// Define User Schema and Model
const userSchema = new mongoose.Schema({
    id: Number,
    username: String,
    password: String,
    role: String,
    active: {
        type: Boolean,
        default: true
    },
    date: {
        type: Date,
        default: Date.now
    }
  });
  
  const User = mongoose.model('User', userSchema);
  module.exports = User;