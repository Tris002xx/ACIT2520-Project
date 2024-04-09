const { session } = require("passport");

let database = require("../models/userModel").database;
// const session = require("express-session");
let remindersController = {
  list: (req, res) => {
    console.log(req.user)
    if (req.user.role === "admin") {
      res.redirect("/admin")
    } else if (req.user.role === "user") {
      res.render("reminder/index", { reminders: req.user.reminders });
    }
  },

  admin: (req, res) => {
    if (req.user.role === 'admin') {
      const store = req.sessionStore;
      let sessions = []
      store.all(function(error, allSessions){
        for (key in allSessions) {
          if (allSessions[key].passport.user !== req.user.id){
            sessions.push(allSessions[key].passport.user)
          }
        }
        console.log(session)
        const listofusers=Object.keys(allSessions);
        console.log(allSessions);
        // console.log(listofusers);
        res.render('reminder/admin', { user: req.user, sessions: sessions });
      });
    };
  },


  new: (req, res) => {
    res.render("reminder/create");
  },

  listOne: (req, res) => {
    if (req.user.reminders.length > 0) {
      let item = req.user.reminders.find(function (reminder) {
        return reminder.id == req.params["id"];
      });
      res.render("reminder/single-reminder", { reminderItem: item });
    } else {
      res.render("rem inder/index", { reminders: req.user.reminders });
    }
},

  create: (req, res) => {
    let reminder = {
      id: req.user.reminders.length + 1,
      title: req.body.title,
      description: req.body.description,
      completed: false,
    };
    req.user.reminders.push(reminder);
    res.redirect("/reminders");
  },

  edit: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = req.user.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    res.render("reminder/edit", { reminderItem: searchResult });
  },

  update: (req, res) => {
    let reminderToFind = req.params.id;
    req.user.reminders.find(function (reminder) {
      if (reminder.id == reminderToFind) {
        reminder.title = req.body.title;
        reminder.description = req.body.description;
        reminder.completed = true ? req.body.completed === "true" : false;
        return reminder.id
      }
    });
    res.redirect("/reminders");
  },

  delete: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = req.user.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    })
    req.user.reminders.splice(req.user.reminders.indexOf(searchResult), 1);
    res.redirect("/reminders");

  },
};

module.exports = remindersController;
