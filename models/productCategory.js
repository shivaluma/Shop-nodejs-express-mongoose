const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productCategorySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  // tương tự code, là trường con (aothun, aohoodie, ...)
  // tương tự name , là trường con mà viết hoa có dấu ...
  childName: {
    type: [String],
    required: true
  }
});

const productCategory = mongoose.model(
  "productCategory",
  productCategorySchema
);
module.exports = productCategory;
