var db = require("../models");
const walmart = require("../walmart_api/data"); //requires the constructor
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
        description: toy.description
      }).then(function (dbToys) {
      });
    })

  };
  runner.getToyData(callbackFnc); //calls the constructors function and passes a callback function.


  // router.get("/burgers", function(req, res) {
  //   // express callback response by calling burger.selectAllBurger
  //   burger.all(function(burgerData) {
  //     // wrapper for orm.js that using MySQL query callback will return burger_data, render to index with handlebar
  //     res.render("index", { burger_data: burgerData });
  //   });
  // });

  // // post route -> back to index
  // router.post("/burgers/create", function(req, res) {
  //   // takes the request object using it as input for buger.addBurger
  //   burger.create(req.body.burger_name, function(result) {
  //     // wrapper for orm.js that using MySQL insert callback will return a log to console,
  //     // render back to index with handle
  //     console.log(result);
  //     
  //   });
  // });

  app.get("/toys", function (req, res) {
    // var query = {};
    // if (req.query.author_id) {
    //   query.AuthorId = req.query.author_id;
    // }
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Author
    db.Inventory.findAll({
      // where: query,
      // include: [db.User]
    }).then(function (dbInventory) {
      res.render("index", {
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
