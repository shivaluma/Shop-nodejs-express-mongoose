const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: false
  },
  phoneNumber: {
    type: String,
    required: false
  },
  isAdministrator: {
    type: Boolean,
    required: false,
    default: false
  }
});

const User = mongoose.model("User", userSchema);
module.exports = User;
