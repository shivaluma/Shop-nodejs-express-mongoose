const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  star: {
    type: Number,
    required: true
  },
  productID: {
    type: String,
    required: true
  }
});

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
