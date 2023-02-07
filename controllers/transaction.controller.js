const db = require("../models/dbConfig");
const Transaction = db.Transaction;
const Clients = db.Clients;
const Share = db.Share;

exports.BulkInsert = async (ClientId, ShareId, ShareSize, Operation) => {
    var ShareData = await Share.findByPk(ShareId);
    if(Operation == "BUY"){
        var TotalPrice = ShareData.Price * ShareSize;
    }
    else{
        var TotalPrice = -ShareData.Price * ShareSize;
    }
    
  const newTransaction = {
    ClientId: ClientId,
    ShareId: ShareId,
    ShareSize: ShareSize,
    TotalPrice: TotalPrice,
    Operation: Operation,
  };
  Transaction.create(newTransaction)
    .then((data) => {
        Clients.increment({
            WalletBalance:  TotalPrice
        }, {
            where: { Id: ClientId },
          })
      console.log(res);
    })
    .catch((error) => {
      console.error("Failed to create a new record : ", error);
    });
    
};
// Create and Save a new Transaction Data
exports.create = async (req, res) => {
    var ShareData = await Share.findByPk(req.body.ShareId);
    if(req.body.Operation == "BUY"){
        var TotalPrice = ShareData.Price * req.body.ShareSize;
    }
    else{
        var TotalPrice = -ShareData.Price * req.body.ShareSize;
    }
  const newTransaction = {
    ClientId: req.body.ClientId,
    ShareId: req.body.ShareId,
    ShareSize: req.body.ShareSize,
    TotalPrice: TotalPrice,
    Operation: req.body.Operation,
  };
  Transaction.create(newTransaction)
    .then((data) => {
        Clients.increment({
            WalletBalance:  TotalPrice
        }, {
            where: { Id: ClientId },
          })
      res.send({
        message: "User Created Succesfully",
      });
      console.log(res);
    })
    .catch((error) => {
      res.send(error);
      console.error("Failed to create a new record : ", error);
    });
    
};

// Retrieve all Transaction from the database.
exports.findAll = (req, res) => {
  Transaction.findAll()
    .then((data) => {
      res.send(data);
      console.log(data);
    })
    .catch((error) => {
      console.error("Failed to retrieve data : ", error);
    });
};

// Find a single Transaction with an id
exports.get = (req, res) => {
  const ClientId = req.params.ClientId;
  Transaction.findAll({
    where: { ClientId: ClientId },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.send(error);
      console.error("Failed to create a new record : ", error);
    });
};
