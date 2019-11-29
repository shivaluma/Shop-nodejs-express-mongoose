const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const bcrypt = require("bcrypt");
const shopRouter = require("./routes/shop");
const authRouter = require("./routes/auth");
const app = express();

const Product = require("./models/product");
const urlConnect = `mongodb+srv://brogrammers2527:brogrammers2527@cluster0-mwti3.mongodb.net/test?retryWrites=true&w=majority
`;

// Connect to database
mongoose.connect(
  urlConnect,
  { useNewUrlParser: true, useUnifiedTopology: true },
  err => {
    if (err) throw err;
    console.log("Connect successfully!!");
  }
);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());
app.use(
  session({
    secret: "notsecret",
    saveUninitialized: false,
    resave: false
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(shopRouter);
app.use(authRouter);

// passport configuration
var User = require("./models/user");
var LocalStrategy = require("passport-local").Strategy;

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  User.findOne({
    _id: id
  })
    .then(function(user) {
      done(null, user);
    })
    .catch(function(err) {
      console.log(err);
    });
});

passport.use(
  new LocalStrategy(function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: "Incorrect username." });
      }

      bcrypt.compare(password, user.password, function(err, result) {
        if (err) {
          return done(err);
        }
        console.log(
          "acc : " + user.username + " " + user.password + " " + password,
          result
        );
        if (!result) {
          return done(null, false, {
            message: "Incorrect username and password"
          });
        }
        return done(null, user);
      });
    });
  })
);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
