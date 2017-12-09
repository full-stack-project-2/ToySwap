// var db = require("../models");

// module.exports = function(app) {
//   app.get("/api/authors", function(req, res) {
//     // Here we add an "include" property to our options in our findAll query
//     // We set the value to an array of the models we want to include in a left outer join
//     // In this case, just db.Post
//     db.Author.findAll({
//       include: [db.Post]
//     }).then(function(dbAuthor) {
//       res.json(dbAuthor);
//     });
//   });

//   app.get("/api/authors/:id", function(req, res) {
//     // Here we add an "include" property to our options in our findOne query
//     // We set the value to an array of the models we want to include in a left outer join
//     // In this case, just db.Post
//     db.Author.findOne({
//       where: {
//         id: req.params.id
//       },
//       include: [db.Post]
//     }).then(function(dbAuthor) {
//       res.json(dbAuthor);
//     });
//   });

app.get("/toys/:toyID/:userID", function (req, res) {		
     // grabs the two parameters passed in from the ajax call.. its essential we have a user ID associated with the product we are searching for, or else we wont get back all the user's products		
     let toyID = req.params.toyID;		
     let userID = req.params.userID;		
     // toys/:toyId/:userID		
     let query = {};		
     if (req.query.userID) {		
       query.userID = req.query.userID;		
     }		
     // Here we add an "include" property to our options in our findAll query		
     // We set the value to an array of the models we want to include in a left outer join		
     // In this case, just db.Author		
     db.Inventory.findAll({		
       where: query,		
       include: [db.Inventory]		
     }).then(function (dbInventory) {		
       res.render("products", {		
         toyID: toyID,		
         inventory: dbInventory		
       });		
     });		
   });		
 
 		
 -//   app.get("/products", function (req, res) { //<-- Just for testing... byAlex    		
 -//     res.render("products");		
 -//   });










//   app.post("/api/authors", function(req, res) {
//     db.Author.create(req.body).then(function(dbAuthor) {
//       res.json(dbAuthor);
//     });
//   });

//   app.delete("/api/authors/:id", function(req, res) {
//     db.Author.destroy({
//       where: {
//         id: req.params.id
//       }
//     }).then(function(dbAuthor) {
//       res.json(dbAuthor);
//     });
//   });

// };
