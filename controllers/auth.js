const passport = require("passport");

exports.getLogin = (req, res, next) => {
  const message = req.flash("error")[0];
  if (!req.isAuthenticated()) {
    res.render("login", {
      title: "Đăng nhập",
      message: `${message}`
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
  console.log(message);
  console.log(req.flash("success")[0]);
  if (!req.isAuthenticated()) {
    res.render("create-account", {
      title: "Đăng ký",
      message: `${message}`
    });
  } else {
    res.redirect("/");
  }
};

exports.postSignUp = (req, res, next) => {
  passport.authenticate("local-signup", {
    successReturnToOrRedirect: "/login",
    failureRedirect: "/create-account",
    failureFlash: true
  })(req, res, next);
};
