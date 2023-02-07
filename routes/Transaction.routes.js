module.exports = app => {
    const transactionController = require("../controllers/transaction.controller");
  
    var router = require("express").Router();


    // Create a new Portfolio Data
    router.post("/", transactionController.create);
  
    // Retrieve all Clients Portfolio
    router.get("/", transactionController.findAll);
  
    // Retrieve a single Client Portfolio with Id
    router.get("/:ClientId", transactionController.get);
  
  
    app.use('/api/Transaction', router);
  };