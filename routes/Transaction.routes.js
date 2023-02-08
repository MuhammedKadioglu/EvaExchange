module.exports = app => {
    const transactionController = require("../controllers/transaction.controller");
  
    var router = require("express").Router();


    // Create a new Transaction BUY SELL Operation Data
    router.post("/", transactionController.create);
  
    // Retrieve all Transaction LOG
    router.get("/", transactionController.findAll);
  
    // Retrieve a single Client Transaction LOG with Id
    router.get("/:ClientId", transactionController.get);
  
  
    app.use('/api/Transaction', router);
  };