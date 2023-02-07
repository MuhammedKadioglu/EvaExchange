module.exports = app => {
    const clientsController = require("../controllers/clients.controller");
  
    var router = require("express").Router();


    // Create a new Client
    router.post("/", clientsController.create);
  
    // Retrieve all Clients
    router.get("/", clientsController.findAll);
  
    // Retrieve a single Client with id
    router.get("/:Id", clientsController.get);
  
    // Update a Client with id
    router.put("/:Id", clientsController.update);
  
    // Delete a Client with id
    router.delete("/:Id", clientsController.delete);
  
  
    app.use('/api/Client', router);
  };