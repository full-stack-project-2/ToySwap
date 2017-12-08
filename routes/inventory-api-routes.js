

// // Create all our routes and set up logic within those routes where required.
//   router.post("/api/burgers", function(req, res) {
//     burger.create([
//       "burger_name"
//     ], [
//       req.body.burger_name
//     ], function(result) {
//       // Send back the ID of the new quote
//       res.json({ id: result.insertId });
//     });
//   });

//   router.put("/api/burgers/:id", function(req, res) {
//     var condition = "id = " + req.params.id;

//     console.log("condition", condition);

//     burger.update({
//       devoured: req.body.devoured
//     }, condition, function(result) {
//       if (result.changedRows == 0) {
//         // If no rows were changed, then the ID must not exist, so 404
//         return res.status(404).end();
//       } else {
//         res.status(200).end();
//       }
//     });
//   });

var db = require("../models");

// Routes
// =============================================================
module.exports = function (app) {
  app.get("/toys", function(req, res) {
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
    }).then(function(dbInventory) {
      let inventory = {
        toys: dbInventory
      }
      let arr = [];
      dbInventory.forEach(function(datum){
        arr.push(datum);
      })

      console.log("My arr works :" + arr);
      console.log(dbInventory[0].dataValues);
      res.render("index", dbInventory[0].dataValues);
    });
  });

  // post request for uploading new toy to DB
  app.post("/toys", function (req, res) {
    console.log(req.body);
    db.Inventory.create({
      title: req.body.title,
      product_condition: req.body.product_condition,
      availability: req.body.availability,
      price: req.body.price,
      url: req.body.url,
      description: req.body.description
    }).then(function (dbToys) {
      res.render("index");
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
