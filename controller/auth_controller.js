const passport = require("passport");

let authController = {
  login: (req, res) => {
    res.render("auth/login", {user: req.user} );
  },

  register: (req, res) => {
    res.render("auth/register", {user: req.user});
  },

  loginSubmit: (req, res, next) => {
    passport.authenticate("local", {
      successRedirect: "/reminders",
      failureRedirect: "/login",
    })(req, res, next);
  },

  registerSubmit: (req, res) => {
    // implement later
  },
};

module.exports = authController;
