const mongoose = require("mongoose");
const comment = require("../models/comment");
const Product = require("../models/product");
const urlConnect = `mongodb+srv://brogrammers2527:brogrammers2527@cluster0-mwti3.mongodb.net/test?retryWrites=true&w=majority
`;

//Connect to db
mongoose.connect(
  urlConnect,
  { useNewUrlParser: true, useUnifiedTopology: true },
  err => {
    if (err) throw err;
    console.log("Connect to update!!");
    Product.find({}, (err, res) => {
      console.log(res);
    });
  }
);
