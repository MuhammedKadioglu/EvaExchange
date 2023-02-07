module.exports = app => {
    const shareController = require("../controllers/share.controller");
  
    var router = require("express").Router();


    // Create a new Share
    router.post("/", shareController.create);
  
    // Retrieve all Shares
    router.get("/", shareController.findAll);
  
    // Retrieve a single Share with id
    router.get("/:Id", shareController.get);
  
    // Update a Share with id
    router.put("/:Id", shareController.update);
  
    // Delete a Share with id
    router.delete("/:Id", shareController.delete);
  
  
    app.use('/api/Share', router);
  };