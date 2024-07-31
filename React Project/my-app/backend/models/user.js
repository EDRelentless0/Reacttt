const mongoose = require("mongoose");

const user = new mongoose.Schema({
  userId: String,
  username: String,
  email: String,
  password: String,
  phone: String,
});

module.exports = mongoose.model("users", user);
