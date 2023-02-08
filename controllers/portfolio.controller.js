const db = require("../models/dbConfig");
const Portfolio = db.Portfolio;
const Clients = db.Clients;
const Share = db.Share;



// Retrieve Client all Portfolio from the database.
exports.findAll = (req, res) => {
    Portfolio.findAll().then(data => {
    res.send(data);
    console.log(data);
  }).catch((error) => {
    console.error('Failed to retrieve data : ', error);
  });
};

// Find a single Portfolio with an id
exports.get = (req, res) => {
  const ClientId = req.params.ClientId;
  Portfolio.findAll({
    where: { ClientId : ClientId }
  }
    
    ).then(data => {
      res.send(data);
  }).catch((error) => {
    res.send(error);
      console.error('Failed to create a new record : ', error);
  });
};











