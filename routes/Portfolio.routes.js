module.exports = app => {
    const portfolioController = require("../controllers/portfolio.controller");
  
    var router = require("express").Router();


  
    // Retrieve all Clients Portfolio
    router.get("/", portfolioController.findAll);
  
    // Retrieve a single Client Portfolio with Id
    router.get("/:ClientId", portfolioController.get);
  
  
    app.use('/api/Portfolio', router);
  };