const mongoose = require("mongoose");
const ProductCategory = require("../models/productCategory");
const urlConnect = `mongodb+srv://brogrammers2527:brogrammers2527@cluster0-mwti3.mongodb.net/test?retryWrites=true&w=majority
`;

// Connect to database
mongoose.connect(urlConnect, { useNewUrlParser: true }, err => {
  if (err) throw err;
  console.log("Connect successfully!!");

  var abc = new ProductCategory({
    name: "Quần",
    childName: ["Quần Dài", "Quần Ngắn", "Quần Thể Thao", "Quần Xì"]
  });

  abc.save(function(err) {
    if (err) throw err;
    console.log("Category successfully saved.");
  });
});
