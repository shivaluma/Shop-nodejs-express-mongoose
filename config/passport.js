// passport configuration
var User = require("../models/user");
var LocalStrategy = require("passport-local").Strategy;
var bcrypt = require("bcrypt");
module.exports = function(passport) {
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
    "local-signin",
    new LocalStrategy(function(username, password, done) {
      User.findOne({ username: username }, function(err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, {
            message: "Sai tên đăng nhập hoặc mật khẩu."
          });
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
              message: "Sai tên đăng nhập hoặc mật khẩu."
            });
          }
          return done(null, user);
        });
      });
    })
  );

  passport.use(
    "local-signup",
    new LocalStrategy(function(username, password, done) {
      User.findOne({ username: username }, function(err, user) {
        if (err) {
          return done(err);
        }
        if (user) {
          return done(null, false, {
            message: "Tên đăng nhập đã tồn tại!"
          });
        }

        if (password.length <= 6) {
          return done(null, false, {
            message: "Mật khẩu phải trên 6 ký tự!"
          });
        }

        bcrypt.hash(password, 12).then(hashPassword => {
          const newUser = new User({
            username: username,
            password: hashPassword
          });
          // save the user
          newUser.save(function(err) {
            if (err) return done(err);
            return done(null, newUser);
          });
        });
      });
    })
  );
};
