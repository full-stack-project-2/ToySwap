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

  app.get("/login", isAuthenticated, function (req, res) {
    // console.log("GET!");    
    if (req.user)
      res.render("list");
    else
      res.render("login"); 
  });
  
  app.get("/register", function (req, res) {
    res.render("register");
  });


  // app.get("/list", isAuthenticated, function (req, res) {    
  //   if (req.user) 
  //     res.render("list");
  //   else
  //     res.render("login");
  // });

  // app.get("/inventory", isAuthenticated, function (req, res) {    
  //   if (req.user)
  //     res.render("list");
  //   else
  //     res.render("login");
  // });
  
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the products page.
  // Otherwise the user will be sent an error


  // app.post("/register", function (req, res) {
  //   console.log(req.body);
  //   res.redirect("products");
  // });



  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
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

  // // cms route loads cms.html
  // app.get("/cms", function(req, res) {
  //   res.sendFile(path.join(__dirname, "../public/cms.html"));
  // });

  // // blog route loads blog.html
  // app.get("/blog", function(req, res) {
  //   res.sendFile(path.join(__dirname, "../public/blog.html"));
  // });

  // // authors route loads author-manager.html
  // app.get("/authors", function(req, res) {
  //   res.sendFile(path.join(__dirname, "../public/author-manager.html"));
  // });

};