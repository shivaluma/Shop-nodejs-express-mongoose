const Users = require("../models/user");

exports.getAccount = (req, res, next) => {
  res.render("account", {
    title: "Thông tin tài khoản",
    user: req.user
  });
};

exports.getAccountChange = (req, res, next) => {
  res.render("account-change-info", {
    title: "Thay đổi thông tin tài khoản",
    user: req.user
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
