const mongoose = require("mongoose");
const Product = require("../models/product");
const urlConnect = `mongodb+srv://brogrammers2527:brogrammers2527@cluster0-mwti3.mongodb.net/test?retryWrites=true&w=majority
`;

// Connect to database
mongoose.connect(urlConnect, { useNewUrlParser: true }, err => {
  if (err) throw err;
  console.log("Connect successfully!!");

  var product = new Product({
    name: "Áo hoodie len lông cừu East Hamston",
    description:
      "Áo hoodle len lông cừu East Hamston được chế tác từ lông cừu mang cảm giác ấm cúng khi mặc",
    stock: 32,
    price: 20,
    size: ["S", "M", "L", "XL"],
    productType: { mainTypeCode: "ao", subTypeCode: "aohoodie" },
    color: "xanh",
    pattern: "Trơn",
    images: [
      "product-01-01.jpg",
      "product-01-02.jpg",
      "product-01-03.jpg",
      "product-01-04.jpg"
    ],
    materials: ["40% Cotton", "60% Lông cừu"]
  });

  product.save(function(err) {
    if (err) throw err;
    console.log("Product successfully saved.");
  });
});
