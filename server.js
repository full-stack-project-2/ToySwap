// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
const express = require("express");
const bodyParser = require("body-parser");
const flash = require('connect-flash');
// Sets up the Express App
// =============================================================
const app = express();
const passport = require("./config/passport");
const session = require("express-session");
const PORT = process.env.PORT || 8080;



// Requiring our models for syncing
const db = require("./models");

// Set Handlebars.
const exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");




// Sets up the Express middleware to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));


// Creating express app and configuring middleware needed for authentication
// We need to use sessions to keep track of our user's login status
//passport middleware methods
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }, resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());
//flash is used to show a message on an incorrect login
app.use(flash());
app.use(express.static('public')); 






// Routes
// =============================================================
require("./routes/html-routes")(app);
require("./routes/user-api-routes")(app);
require("./routes/inventory-api-routes")(app);









// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    db.User.create({
      email: "walmart@walmart.com",
      username: "Walmart",
      password: "Walmart",
    }).then(function (walmart) {
    });
    console.log("App listening on PORT " + PORT);
  });
});