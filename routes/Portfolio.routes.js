module.exports = app => {
    const portfolioController = require("../controllers/portfolio.controller");
  
    var router = require("express").Router();


    // Create a new Portfolio Data
    router.post("/", portfolioController.create);
  
    // Retrieve all Clients Portfolio
    router.get("/", portfolioController.findAll);
  
    // Retrieve a single Client Portfolio with Id
    router.get("/:ClientId", portfolioController.get);
  
    // Update a Client portfolio with Id
    router.put("/:Id", portfolioController.update);
  
    // Delete a Client Portfolio with Id
    router.delete("/:Id", portfolioController.delete);
  
  
    app.use('/api/Portfolio', router);
  };