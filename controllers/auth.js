const passport = require("passport");
const User = require("../models/user");

exports.getLogin = (req, res, next) => {
  console.log("login");
  res.render("login", { title: "Đăng nhập" });
};

exports.postLogin = (req, res, next) => {
  passport.authenticate("local", {
    successReturnToOrRedirect: "/",
    failureRedirect: "/login"
  })(req, res, next);
};
