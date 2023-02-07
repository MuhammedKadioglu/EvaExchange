const db = require("../models/dbConfig");
const Clients = db.Clients;

// Create and Save a new Client
exports.create = (req, res) => {
  const newClient = {
    Name: req.body.Name,
    WalletBalance: req.body.WalletBalance,
  };
  Clients.create(newClient)
    .then((data) => {
      res.send({
        message: "Client Created Succesfully",
      });
    })
    .catch((error) => {
      res.send(error);
      console.error("Failed to create a new record : ", error);
    });
};

// Retrieve all Clients from the database.
exports.findAll = (req, res) => {
  Clients.findAll()
    .then((data) => {
      res.send(data);
      console.log(data);
    })
    .catch((error) => {
      console.error("Failed to retrieve data : ", error);
    });
};

// Find a single Client with an id
exports.get = (req, res) => {
  const Id = req.params.Id;
  Clients.findByPk(Id)
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.send(error);
      console.error("Failed to create a new record : ", error);
    });
};

// Update a Client by the id in the request
exports.update = (req, res) => {
  const Id = req.params.Id;
  console.log(req.body);
  Clients.update(req.body, {
    where: { Id: Id },
  })
    .then((result) => {
      if (result == 1) {
        res.send({
          message: "Client was updated successfully.",
        });
      } else {
        res.send({
          message: "Cannot update Client ",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Client with Id=" + Id,
      });
    });
};

// Delete a Client with the specified id in the request
exports.delete = (req, res) => {
  const Id = req.params.Id;

  Clients.destroy({
    where: { Id: Id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Client was deleted successfully!",
        });
      } else {
        res.send({
          message: "Cannot delete Client",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Client with id=" + id,
      });
    });
};
