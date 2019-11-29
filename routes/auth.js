var express = require("express");
var router = express.Router();
var passport = require("passport");
const authController = require("../controllers/auth");

router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);

router.get("/logout", isLoggedIn, authController.getLogout);
router.get("/create-account", authController.getSignUp);
router.post("/create-account", authController.postSignUp);

module.exports = router;

function isLoggedIn(req, res, next) {
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated()) return next();
  // if they aren't redirect them to the home page
  res.redirect("/");
}
