var express = require("express");
var router = express.Router();
var passport = require("passport");
const authController = require("../controllers/auth");

router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);

router.get("/logout", authController.getLogout);
router.get("/create-account", authController.getSignUp);
router.post("/create-account", authController.postSignUp);

module.exports = router;
