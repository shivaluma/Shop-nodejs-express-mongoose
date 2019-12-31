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
    required: false
  },
  lastName: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: false
  },
  address: {
    type: String,
    required: false
  },
  phoneNumber: {
    type: String,
    required: false
  },
  role: {
    type: Number,
    required: false,
    default: 0
  },
  isAuthenticated: {
    type: Boolean,
    required: false,
    default: false
  },
  cart: {
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true
        },
        quantity: { type: Number, required: true }
      }
    ]
  },
  verify_token: {
    type: String,
    required: false
  }
});

const User = mongoose.model("User", userSchema);
module.exports = User;
