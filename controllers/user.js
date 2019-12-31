const Users = require("../models/user");
const Cart = require("../models/cart");

exports.getAccount = (req, res, next) => {
  var cartProduct;
  if (!req.session.cart) {
    cartProduct = null;
  } else {
    var cart = new Cart(req.session.cart);
    cartProduct = cart.generateArray();
  }
  res.render("account", {
    title: "Thông tin tài khoản",
    user: req.user,
    cartProduct: cartProduct
  });
};

exports.getAccountChange = (req, res, next) => {
  var cartProduct;
  if (!req.session.cart) {
    cartProduct = null;
  } else {
    var cart = new Cart(req.session.cart);
    cartProduct = cart.generateArray();
  }
  res.render("account-change-info", {
    title: "Thay đổi thông tin tài khoản",
    user: req.user,
    cartProduct: cartProduct
  });
};

exports.postAccountChange = (req, res, next) => {
  req.user.firstName = req.body.firstName;
  req.user.lastName = req.body.lastName;
  req.user.email = req.body.email;
  req.user.address = req.body.address;
  req.user.phoneNumber = req.body.phoneNumber;
  req.user.save();
  res.redirect("/account");
};
