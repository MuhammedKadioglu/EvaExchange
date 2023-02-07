module.exports = app => {
    const department = require("../controllers/Department.controller");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", department.create);
  
    // Retrieve all Tutorials
    router.get("/", department.findAll);
  
    // Retrieve all published Tutorials
    router.get("/published", department.findAllPublished);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", department.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", department.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", department.delete);
  
    // Delete all Tutorials
    router.delete("/", department.deleteAll);
  
    app.use('/api/Department', router);
  };