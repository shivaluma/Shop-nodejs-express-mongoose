const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const labelSchema = new Schema({
  list: {
    type: [String],
    required: true
  }
});

const Label = mongoose.model("Label", labelSchema);
module.exports = Label;
