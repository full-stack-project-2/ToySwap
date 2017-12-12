// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");
const session = require('client-sessions');
// Routes
// =============================================================
module.exports = function (app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads index.handlebars

  app.get("/", function (req, res) {
    res.render("index");
  });

  app.get("/home", function (req,res){
    // console.log("Redirect inc");
    res.render("index");
  });
  
  app.use(session({
    cookieName: 'session',
    secret: 'this_is_my_secret_phrase',
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000,
    })
  );

  app.get("/login", function (req, res) {
    res.render("login");
  });

  app.post("/login", function (req,res){
    let uName = req.body.username;
    let pwd = req.body.password;
    /**
     * Check if username and password are in db.
     * If they are run:
     *      req.session.user = uName;
     *      res.redirect('/');
     * else redirect back to login with error message
     *      res.render('login',{errMsg: 'INCORRECT USERNAME/PASSWORD'});
     */
    
  });

  app.get("/register", function(req,res){
    res.render("register");
  });

  app.post("/register", function(req,res){
    console.log(req.body);
    res.redirect("products");
  });


  app.get("/products", function (req, res) {   
    res.render("products");
  });

  app.get("/acct/:pgNumIn", function (req, res) { 
    let pgNum = req.params.pgNumIn; 
    if(pgNum === 'log')   
      res.render("activity");
    else if(pgNum === 'messages')   
      res.render("messages");  
    else if(pgNum === 'account') 
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
