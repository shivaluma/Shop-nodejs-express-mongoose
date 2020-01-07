// passport configuration
var User = require('../models/user');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcryptjs');
var nodemailer = require('nodemailer');
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
    'local-signin',
    new LocalStrategy(function(username, password, done) {
      User.findOne({ username: username }, function(err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, {
            message: 'Sai tên đăng nhập hoặc mật khẩu.'
          });
        }

        if (user.isLock) {
          return done(null, false, {
            message: 'Tài khoản đã bị khoá.'
          });
        }

        bcrypt.compare(password, user.password, function(err, result) {
          if (err) {
            return done(err);
          }
          console.log('acc : ' + user.username + ' ' + user.password + ' ' + password, result);
          if (!result) {
            return done(null, false, {
              message: 'Sai tên đăng nhập hoặc mật khẩu.'
            });
          }
          return done(null, user);
        });
      });
    })
  );

  passport.use(
    'local-signup',
    new LocalStrategy({ passReqToCallback: true }, function(req, username, password, done) {
      User.findOne({ username: username }, function(err, user) {
        if (err) {
          return done(err);
        }
        if (user) {
          return done(null, false, {
            message: 'Tên đăng nhập đã tồn tại!'
          });
        }

        if (password.length <= 6) {
          return done(null, false, {
            message: 'Mật khẩu phải trên 6 ký tự!'
          });
        }

        if (password !== req.body.password2) {
          return done(null, false, {
            message: 'Hai mật khẩu không khớp!'
          });
        }
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(String(req.body.email).toLowerCase())) {
          return done(null, false, {
            message: 'Địa chỉ email không hợp lệ!'
          });
        }
        User.findOne({ email: req.body.email }, (err, user) => {
          if (err) {
            return done(err);
          } else if (user) {
            return done(null, false, {
              message: 'Địa chỉ email đã tồn tại!'
            });
          }
        });

        bcrypt.hash(password, 12).then(hashPassword => {
          const newUser = new User({
            username: username,
            password: hashPassword,
            email: req.body.email
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
