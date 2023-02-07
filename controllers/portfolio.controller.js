const db = require("../models/dbConfig");
const Portfolio = db.Portfolio;


exports.BulkInsert = (ClientId,ShareId,ShareSize,TotalPrice) => {
    const newPortfolio = {
        ClientId: ClientId,
        ShareId: ShareId,
        ShareSize: ShareSize,
        TotalPrice: TotalPrice,
      };
  Portfolio.create(newPortfolio).then(data => {
      console.log(res)
  }).catch((error) => {
      console.error('Failed to create a new record : ', error);
  });

};
// Create and Save a new Portfolio Data
exports.create = (req, res) => {
    const newPortfolio = {
        ClientId: req.body.ClientId,
        ShareId: req.body.ShareId,
        ShareSize: req.body.ShareSize,
        TotalPrice: req.body.TotalPrice,
      };
  Portfolio.create(newPortfolio).then(data => {
      res.send({
        message: "Portfolio Created Succesfully"
      });
      console.log(res)
  }).catch((error) => {
    res.send(error);
      console.error('Failed to create a new record : ', error);
  });

};

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

// Update a Portfolio by the id in the request
exports.update = (req, res) => {
  const Id = req.params.Id;

  Portfolio.update(req.body, {
    where: { Id: Id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Portfolio was updated successfully."
        });
      } else {
        res.send({
          message: 'Cannot update Portfolio '
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Portfolio with Id=" + Id
      });
    });
};

// Delete a Portfolio with the specified id in the request
exports.delete = (req, res) => {
  const Id = req.params.Id;

  Portfolio.destroy({
    where: { Id: Id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Portfolio was deleted successfully!"
        });
      } else {
        res.send({
          message: 'Cannot delete Portfolio'
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Portfolio with id=" + id
      });
    });
};









