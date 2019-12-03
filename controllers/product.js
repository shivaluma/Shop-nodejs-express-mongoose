const Products = require("../models/product");

// demo chu chua xu ly
exports.getIndexProducts = (req, res, next) => {
  Products.find()
    .then(products => {
      res.render("index", {
        title: "Trang chủ",
        user: req.user,
        trendings: products
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Products.find({ _id: `${prodId}` })
    .then(product => {
      res.render("product", {
        title: `${product[0].name}`,
        user: req.user,
        prod: product[0]
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getProducts = (req, res, next) => {
  const ptype = req.query.type !== undefined ? req.query.type : "";
  const pprice = req.query.price !== undefined ? req.query.price : 999999;
  const psize = req.query.size !== undefined ? req.query.size : "";
  const plabel = req.query.label !== undefined ? req.query.label : "";
  const plowerprice = pprice !== 999999 ? pprice - 50 : 0;
  Products.find({
    type: new RegExp(ptype, "i"),
    size: new RegExp(psize, "i"),
    labels: new RegExp(plabel, "i"),
    price: { $gt: plowerprice, $lt: pprice }
  })
    .then(products => {
      res.render("products", {
        title: "Danh sách sản phẩm",
        user: req.user,
        allProducts: products
      });
    })
    .catch(err => {
      console.log(err);
    });
};
