const Users = require("../models/user");

exports.getUsers = (req, res, next) => {
  Users.find()
    .then(users => {
      console.log(users);
      res.render("login", {
        title: "User",
        users: users
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.postLogin = (req, res, next) => {
    Users.find()
      .then(users => {
        console.log(users);
        res.render("login", {
          title: "User",
          users: users
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
