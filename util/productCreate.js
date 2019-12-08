const mongoose = require("mongoose");
const Product = require("../models/product");
const urlConnect = `mongodb+srv://brogrammers2527:brogrammers2527@cluster0-mwti3.mongodb.net/test?retryWrites=true&w=majority
`;

// Connect to database
mongoose.connect(urlConnect, { useNewUrlParser: true }, err => {
  if (err) throw err;
  console.log("Connect successfully!!");

  var product = new Product({
    name: "Áo Sơ Mi 7 Màu",
    description: "Nhìn là đẹp r mua đi",
    stock: 124,
    price: 1123,
    size: ["S", "M", "L", "XL"],
    productType: { main: "Áo", sub: "Áo Sơ Mi" },
    color: ["Nhiều Màu"],
    pattern: "Trơn",
    images: [
      "product-16.jpg",
      "product-16-01.jpg",
      "product-16-02.jpg",
      "product-16-03.jpg"
    ],
    label: "Others",
    materials: ["100% Vải"]
  });

  product.save(function(err) {
    if (err) throw err;
    console.log("Product successfully saved.");
  });
});
