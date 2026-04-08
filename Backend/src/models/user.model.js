const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: [true, "username already exist"],
    requried: true,
  },
  email: {
    type: String,
    required: [true, "Account already exists with this email address"],
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});


const userModel = mongoose.model("users", userSchema);

module.exports = userModel;