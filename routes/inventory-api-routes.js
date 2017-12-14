var db = require("../models");
const walmart = require("../walmart_api/data"); //requires the constructor
const isAuthenticated = require("../config/middleware/authentication");
// Routes
// =============================================================
module.exports = function (app) {
// This is were the initial data from the walmart API gets stored into the DB

    let result = ''; //declare a global empty variable.
    let runner = new walmart(); //creates a new object
  let callbackFnc = function (data) { //callback function to fetch data
    result = data;
    result.forEach(function (toy) {
      db.Inventory.create({
        title: toy.name,
        product_condition: "New",
        availability: 40,
        price: toy.price,
        url: toy.image,
        description: toy.description,
        UserId: 1
      }).then(function (dbToys) {
      });
    })

  };

  db.User.create({
    email: "walmart@walmart.com",
    username: "walmart",
    password: "walmart",
  }).then(function (walmart) {
  });
  runner.getToyData(callbackFnc);
  
  // runner.getToyData(callbackFnc);
   //calls the constructors function and passes a callback function.

  // app.get("/list", isAuthenticated, function (req, res) {    
  //   db.Inventory.findAll({
  //     where: query,
  //     include: [db.Inventory]
  //   }).then(function (dbInventory) {
  //     res.render("products", {
  //       toyID: toyID,
  //       inventory: dbInventory
  //     });
  //   });

  // });






  app.get("/list-toys", isAuthenticated, function (req, res) {
    
    console.log("FROM DB *****************************************");
    // var query = {};
    // if (req.query.author_id) {
    //   query.AuthorId = req.query.author_id;
    // }
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Author
    db.Inventory.findAll({
      // where: query,
      include: [db.User]
    }).then(function (dbInventory) {
      console.log("FROM DB *****************************************" + "\n" + dbInventory);
      res.render("list", {
        inventory: dbInventory
      });
    });
  });


  // post request for uploading new toy to DB
  app.post("/toys", function (req, res) {
    // console.log(req.body);
    db.Inventory.create({
      title: req.body.title,
      product_condition: req.body.product_condition,
      availability: req.body.availability,
      price: req.body.price,
      url: req.body.url,
      description: req.body.description
    }).then(function (dbToys) {
      res.redirect("/");
    });
  });






  //   // Get rotue for retrieving a single post
  //   app.get("/api/posts/:id", function(req, res) {
  //     // Here we add an "include" property to our options in our findOne query
  //     // We set the value to an array of the models we want to include in a left outer join
  //     // In this case, just db.Author
  //     db.Post.findOne({
  //       where: {
  //         id: req.params.id
  //       },
  //       include: [db.Author]
  //     }).then(function(dbPost) {
  //       res.json(dbPost);
  //     });
  //   });

  //   // DELETE route for deleting posts
  //   app.delete("/api/posts/:id", function(req, res) {
  //     db.Post.destroy({
  //       where: {
  //         id: req.params.id
  //       }
  //     }).then(function(dbPost) {
  //       res.json(dbPost);
  //     });
  //   });

  //   // PUT route for updating posts
  //   app.put("/api/posts", function(req, res) {
  //     db.Post.update(
  //       req.body,
  //       {
  //         where: {
  //           id: req.body.id
  //         }
  //       }).then(function(dbPost) {
  //         res.json(dbPost);
  //       });
  //   });
};
