const passport = require("passport");
const Cart = require("../models/cart");
const nodemailer = require("nodemailer");
const Users = require("../models/user");
var randomstring = require("randomstring");

exports.getLogin = (req, res, next) => {
  var cartProduct;
  if (!req.session.cart) {
    cartProduct = null;
  } else {
    var cart = new Cart(req.session.cart);
    cartProduct = cart.generateArray();
  }
  const message = req.flash("error")[0];
  if (!req.isAuthenticated()) {
    res.render("login", {
      title: "Đăng nhập",
      message: `${message}`,
      user: req.user,
      cartProduct: cartProduct
    });
  } else {
    res.redirect("/");
  }
};

exports.postLogin = (req, res, next) => {
  passport.authenticate("local-signin", {
    successReturnToOrRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true
  })(req, res, next);
};

exports.getLogout = (req, res, next) => {
  req.logout();
  res.redirect("/");
};

exports.getSignUp = (req, res, next) => {
  const message = req.flash("error")[0];
  var cartProduct;
  if (!req.session.cart) {
    cartProduct = null;
  } else {
    var cart = new Cart(req.session.cart);
    cartProduct = cart.generateArray();
  }
  if (!req.isAuthenticated()) {
    res.render("create-account", {
      title: "Đăng ký",
      message: `${message}`,
      user: req.user,
      cartProduct: cartProduct
    });
  } else {
    res.redirect("/");
  }
};

exports.postSignUp = (req, res, next) => {
  passport.authenticate("local-signup", {
    successReturnToOrRedirect: "/verify-email",
    failureRedirect: "/create-account",
    failureFlash: true
  })(req, res, next);
};

exports.getVerifyEmail = (req, res, next) => {
  var transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "nocodenolife2527@gmail.com",
      pass: "password2527@"
    }
  });
  Users.findOne({ username: req.user.username }).then(user => {
    var verification_token = randomstring.generate({
      length: 10
    });
    var mainOptions = {
      from: "Crepp so gud",
      to: req.user.email,
      subject: "Test",
      text: "text ne",
      html:
        "<p>Cảm ơn đã đăng kí tài khoản của Bros shop. Mã kích hoạt của bạn là:</p>" +
        verification_token
    };
    transporter.sendMail(mainOptions, (err, info) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Sent:" + info.response);
      }
    });
    user.verify_token = verification_token;
    user.save();
  });

  const message = req.flash("error")[0];
  var cartProduct;
  if (!req.session.cart) {
    cartProduct = null;
  } else {
    var cart = new Cart(req.session.cart);
    cartProduct = cart.generateArray();
  }
  res.render("verify-email", {
    title: "Xác thực email",
    message: `${message}`,
    user: req.user,
    cartProduct: cartProduct
  });
};

exports.postVerifyEmail = (req, res, next) => {
  const token = req.body.token;
  Users.findOne({ username: req.user.username }, (err, user) => {
    if (token == user.verify_token) {
      user.isAuthenticated = true;
    }
    user.save();
  });
  res.redirect("/login");
};

exports.getForgotPass = (req, res, next) => {
  var cartProduct;
  if (!req.session.cart) {
    cartProduct = null;
  } else {
    var cart = new Cart(req.session.cart);
    cartProduct = cart.generateArray();
  }
  res.render("forgot-password", {
    title: "Quên mật khẩu",
    user: req.user,
    cartProduct: cartProduct
  });
};

exports.postForgotPass = (req, res, next) => {
  const email = req.body.email;
  Users.findOne({ email: email }, (err, user) => {
    if (user) {
      res.redirect("/f-change-password");
    }
  });
};
