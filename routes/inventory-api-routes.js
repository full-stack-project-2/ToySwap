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
      }).then(function (dbToys) {});
    })

  };
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

  // app.get("/toys", function (req, res) {
  //   // var query = {};
  //   // if (req.query.author_id) {
  //   //   query.AuthorId = req.query.author_id;
  //   // }
  //   // Here we add an "include" property to our options in our findAll query
  //   // We set the value to an array of the models we want to include in a left outer join
  //   // In this case, just db.Author
  //   db.Inventory.findAll({
  //     // where: query,
  //     // include: [db.User]
  //   }).then(function (dbInventory) {
  //     res.render("index", {
  //       inventory: dbInventory
  //     });
  //   });
  // });




  // app.get("/list-toys", isAuthenticated, function (req, res) {
  //   // Here we add an "include" property to our options in our findAll query
  //   // We set the value to an array of the models we want to include in a left outer join
  //   // In this case, just db.Author
  //   db.Inventory.findAll({
  //     // where: query,
  //     // include: [db.User]
  //   }).then(function (dbInventory) {
  //     console.log(dbInventory);
  //     // console.log("FROM DB *****************************************" + "\n" + dbInventory);
  //     // console.log(dbInventory[0].dataValues);
  //     // console.log(dbInventory[0].dataValues.User.dataValues);
  //     // let hbsObject = {
  //     //   toys: dbInventory
  //     // };
  //     // console.log(hbsObject);
  //     res.render("list", {inventory: dbInventory});
  //   });
  // });

  app.get("/list", isAuthenticated, function (req, res) {
    if (req.user) {
      db.Inventory.findAll({
        include: [db.User]
      }).then(function (dbInventory) {
        res.render("list", {
          // toyID: toyID,
          inventory: dbInventory
        });
      });
    } else {
      res.render("login");
    }

  });

  app.get("/toy/:toyID/:UserId", function (req, res) {
    // grabs the two parameters passed in from the ajax call.. its essential we have a user ID associated with the product we are searching for, or else we wont get back all the user's products		
    let toyID = req.params.toyID;
    let UserId = req.params.UserId;

    let query = {
      UserId: UserId,
      id: {
        $not: toyID
      }
    };

    // console.log(query);
    // Here we add an "include" property to our options in our findAll query		
    // We set the value to an array of the models we want to include in a left outer join		
    // In this case, just db.Author		
    db.Inventory.findAll({
      where: query,
      include: [db.User],
      id: {
        $not: toyID
      }
    }).then(function (userInventory) {
      // console.log("DB INVENTORY ----------------------------------------\n" + userInventory);
      let toyQuery = {
        id: toyID
      }
      db.Inventory.findAll({
        where: toyQuery,
        include: [db.User]
      }).then(function (selectedToy) {
        // Current user in the session along with their information can be found in the req.user object
        // console.log("REQ.USEReeeee " + req.user);
        let visitorId = req.user.id;
        // console.log(visitorUsername);
        let swapQuery = {
          id: visitorId,
          availability: {
            $gt: 0
          }
        }
        db.Inventory.findAll({
          where: swapQuery,
          include: [db.User]
        }).then(function (toysToSwap) {
          res.render("products", {
            inventory: userInventory,
            toy: selectedToy,
            swapables: toysToSwap
          });
          // console.log("toys2swap ----------------------------------------\n" + toysToSwap);
        });
      });
    });
  });




  app.post("/swaps", function (req, res) {
    console.log(req.body);
    db.Swaps.create({
      incomingId: req.body.incomingId,
      incomingUrl: req.body.incomingUrl,
      incomingTitle: req.body.incomingTitle,
      sellerId: req.body.sellerId,
      sellerTitle: req.body.sellerTitle,
      sellerUrl: req.body.sellerUrl,
    }).then(function (dbToys) {
      res.redirect(200, "/list");
    });
  });



  //   .findAll({
  //     //attributes: ['id'] //select fields
  //     })
  // //.then((todos) => res.status(200).send(todos))
  // .then((todos) => res.render('test/test_view', {layout: 'ca_layout.handlebars', test_data: todos}))
  // .catch((error) => res.status(400).send(error));
  // } FOR DEBUGGING SENDING USERS A CUSTOM 404 PAGE

  // post request for uploading new toy to DB
  // app.post("/toys", function (req, res) {
  //   // console.log(req.body);
  //   db.Inventory.create({
  //     title: req.body.title,
  //     product_condition: req.body.product_condition,
  //     availability: req.body.availability,
  //     price: req.body.price,
  //     url: req.body.url,
  //     description: req.body.description
  //   }).then(function (dbToys) {
  //     res.redirect("/");
  //   });
  // });






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
