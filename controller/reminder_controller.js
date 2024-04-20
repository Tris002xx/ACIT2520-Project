const { session, use } = require("passport");

async function keywordtoImage(keyword){
  const url= `https://api.unsplash.com/search/photos?page=1&query=${keyword}&client_id=wBg-GsJRbcsk66BOM6omEXopj-wqnHjIcHueHBiQcIY`
  const response = (await fetch(url));
  const data = await response.json();
  console.log(data)
  return data.results[0].urls.regular;
}

let database = require("../models/userModel").database;
// const session = require("express-session");
let remindersController = {
  list: (req, res) => {
    console.log(req.user)
    if (req.user.role === "admin") {
      res.redirect("/admin")
    } else if (req.user.role === "user") {
      res.render("reminder/index", { reminders: req.user.reminders, user: req.user });
    }
  },

  admin: (req, res) => {
    if (req.user.role === 'admin') {
      const store = req.sessionStore;
      store.all(function (error, allSessions) {
        console.log(allSessions);
        const listofusers = Object.keys(allSessions);
        console.log(listofusers);
        res.render("reminder/admin", { keys: listofusers, sessions: allSessions, user: req.user });
      });
    } else {
      res.redirect("/reminders")
    };
  },

  delete_session: (req, res) => {
    const store = req.sessionStore;
    store.destroy(req.params.id, function (error) {
      if (error) {
        console.log(error);
      }
      if (req.user.role === "admin") {
        res.redirect("/admin");
      }

      res.render("auth/login");

    });
  },

  new: (req, res) => {
    res.render("reminder/create", { user: req.user });
  },

  listOne: async (req, res) => {
    if (req.user.reminders.length > 0) {
      let item = req.user.reminders.find(function (reminder) {
        return reminder.id == req.params["id"];
      });
      if (item.banner.length < 20){
        item.banner = await keywordtoImage(`${item.banner}`)
      }
      res.render("reminder/single-reminder", { reminderItem: item, user: req.user });
    } else {
      res.render("reminder/index", { reminders: req.user.reminders, user: req.user });
    }
  },

  create: async (req, res) => {
    let reminder = {
      id: req.user.reminders.length + 1,
      title: req.body.title,
      description: req.body.description,
      completed: false,
      banner: await keywordtoImage(`${req.body.banner}`)
    };
    req.user.reminders.push(reminder);
    res.redirect("/reminders");
  },

  edit: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = req.user.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    res.render("reminder/edit", { reminderItem: searchResult, user: req.user });
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

  logout: (req, res) => {
    req.logout(function(err){
      if (err) {
        return next(err);
      }
    res.redirect("/login");
    });
  },
};

module.exports = remindersController;
