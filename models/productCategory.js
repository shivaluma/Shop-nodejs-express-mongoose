const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productCategorySchema = new Schema({
  // Viết liền không dấu, thể hiện tượng trưng sản phẩm
  // là trường cha ( áo quần phụ kiện ...)
  code: {
    type: String,
    required: true
  },
  // Viết hoa chữ cái đầu mỗi từ, có dấu, có cách
  name: {
    type: String,
    required: true
  },
  // tương tự code, là trường con (aothun, aohoodie, ...)
  childTypeCode: {
    type: [String],
    required: true
  },
  // tương tự name , là trường con mà viết hoa có dấu ...
  childTypeName: {
    type: [String],
    required: true
  }
});

const productCategory = mongoose.model(
  "productCategory",
  productCategorySchema
);
module.exports = productCategory;
