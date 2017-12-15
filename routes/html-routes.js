// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
const path = require("path");
const session = require('client-sessions');
const isAuthenticated = require("../config/middleware/authentication");

//const socket = require('socket.io');
//const server = require('../server.js');
// const io = socket(server);
// let scrtWrd = [];

// Routes
// =============================================================
module.exports = function (app) {

  app.get("/", function (req, res) {
    res.render("index");
  });

  app.get("/home", function (req, res) {
    res.render("index");
  });

  app.get("/loginErr", function (req, res) {    
    console.log('/loginErr');
    res.render('login',{errMsg: 'INCORRECT USERNAME/PASSWORD'});
  });

  app.get("/login", function (req, res) {    
    console.log('/login');
    if (req.user)
      res.redirect("/products");
    else
      res.render("login");
      
  });

  
  
  // app.get("/chat/:setWord", function(req, res) {
  //   console.log(req.params.setWord);
  //   if(scrtWrd.indexOf(req.params.setWord) === -1)
  //       scrtWrd.push(req.params.setWord);
  //   res.send('');
  // });
  
  // io.on('connection', function (socket) { 
  //   console.log('Socket connection with id = ' + socket.id);
  //   for(let i = 0; i < scrtWrd.length; i++)
  //       socket.on(scrtWrd[i], function (data) {
  //           io.sockets.emit(scrtWrd[i], data);
  //       });
  //   socket.on('disconnect', function () { 
  //       console.log('Client disconnected.');
  //   });    
  // }); 

  
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the products page.
  // Otherwise the user will be sent an error


  // app.post("/register", function (req, res) {
  //   console.log(req.body);
  //   res.redirect("products");
  // });
  app.get("/register", function (req, res) {
    res.render("register");
  });


  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/products", isAuthenticated, function (req, res) {
    res.render("products");
  });

  app.get("/products/getUname", isAuthenticated, function (req, res) {//gets own username for chat setup 
    res.send(req.user.username);
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