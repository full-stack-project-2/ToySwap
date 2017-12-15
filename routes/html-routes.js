// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
const path = require("path");
const session = require('client-sessions');
const isAuthenticated = require("../config/middleware/authentication");

// Routes
// =============================================================
module.exports = function (app) {
  // Both the / and /home route sends user to home page
  app.get("/", function (req, res) {
    res.render("home");
  });

  app.get("/home", function (req, res) {
    res.render("home");
  });

  app.get("/loginErr", function (req, res) {    
    res.flash('info', 'Flash is back!')
    res.render('login',{errMsg: 'INCORRECT USERNAME/PASSWORD'});
  });

  // If user is authenticated, they may proceed to the list of all products, otherwise they are sent back the login page
  app.get("/login", isAuthenticated, function (req, res) {  
    if (req.user)
      res.redirect("list");
    else
      res.render("login"); 
  });
  
  app.get("/register", function (req, res) {
    res.render("register");
  });

  
  app.get("/products", isAuthenticated, function (req, res) {
    res.render("products");
  });

  app.get("/acct/:pgNumIn", isAuthenticated, function (req, res) {
    let pgNum = req.params.pgNumIn;
    if (pgNum === 'log')
      res.render("activity");
    else if (pgNum === 'messages')
      res.render("messages");
    else if (pgNum === 'account')
      res.render("account");
  });
};
