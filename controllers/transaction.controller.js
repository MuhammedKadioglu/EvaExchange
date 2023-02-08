const db = require("../models/dbConfig");
const Transaction = db.Transaction;
const Clients = db.Clients;
const Share = db.Share;
const Portfolio = db.Portfolio;


// BUY SELL Operation
shareOperation = async (newTransaction) => {
  return new Promise((resolve) => {
    Transaction.create(newTransaction)
      .then(async (data) => {
        if (newTransaction.Operation == "BUY") {
          var TotalPriceWallet = -newTransaction.TotalPrice;
          var TotalPrice = newTransaction.TotalPrice;
          var ShareSizeShareTable = -newTransaction.ShareSize;
          var ShareSize = newTransaction.ShareSize;
        } else {
          var TotalPriceWallet = -newTransaction.TotalPrice;
          var TotalPrice = newTransaction.TotalPrice;
          var ShareSize = -newTransaction.ShareSize;
          var ShareSizeShareTable = newTransaction.ShareSize;
        }
        Clients.increment(
          {
            WalletBalance: TotalPriceWallet,
          },
          {
            where: { Id: newTransaction.ClientId },
          }
        ).then(async (data) => {
          Share.increment(
            {
              ShareCount: ShareSizeShareTable,
            },
            {
              where: {
                Id: newTransaction.ShareId,
              },
            }
          )
            .then(async (data) => {
              const ClientPortfolio = await Portfolio.findOne({
                where: {
                  ClientId: newTransaction.ClientId,
                  ShareId: newTransaction.ShareId,
                },
              });
              if (ClientPortfolio == null) {
                const newPortfolio = {
                  ClientId: newTransaction.ClientId,
                  ShareId: newTransaction.ShareId,
                  ShareSize: newTransaction.ShareSize,
                  TotalPrice: TotalPrice,
                };
                Portfolio.create(newPortfolio)
                  .then((data) => {
                    resolve("Success");
                  })
                  .catch((error) => {
                    resolve(error);
                  });
              } else {
                Portfolio.increment(
                  {
                    ShareSize: ShareSize,
                    TotalPrice: TotalPrice,
                  },
                  {
                    where: {
                      Id: ClientPortfolio.Id,
                    },
                  }
                )
                  .then((data) => {
                    resolve("Success");
                  })
                  .catch((error) => {
                    resolve(error);
                  });
              }
            })
            .catch((error) => {
              resolve(error);
            });
        }).catch((error) => {
          resolve(error);
        });
      })
      .catch((error) => {
        resolve(error);
        console.error("Failed to create a new record : ", error);
      });
  });
};

exports.BulkInsert = async (ClientId, ShareId, ShareSize, Operation) => {
  var ShareData = await Share.findByPk(ShareId);
  var ClientData = await Clients.findByPk(ClientId);
  if (ShareData == null || ClientData == null) {
    console.log("client or share not defined");
  } else {
    if (Operation == "BUY") {
      var TotalPrice = ShareData.Price * ShareSize;
      if (
        ShareData.ShareCount >= ShareSize &&
        ClientData.WalletBalance >= TotalPrice
      ) {
        const newTransaction = {
          ClientId: ClientId,
          ShareId: ShareId,
          ShareSize: ShareSize,
          TotalPrice: TotalPrice,
          Operation: Operation,
        };
        await shareOperation(newTransaction);
      } else {
        console.log(
          "Share size have not bigger than Share Count or Client wallet balance lower than TotalPrice"
        );
      }
    } else {
      const ClientShare = await Portfolio.findOne({
        where: {
          ClientId: ClientId,
          ShareId: ShareId,
        },
      });
      if (ClientShare !== null) {
        var TotalPrice = -ShareData.Price * ShareSize;
        if (ClientShare.ShareSize >= ShareSize) {
          const newTransaction = {
            ClientId: ClientId,
            ShareId: ShareId,
            ShareSize: ShareSize,
            TotalPrice: TotalPrice,
            Operation: Operation,
          };
          await shareOperation(newTransaction);
        } else {
          console.log("Share size have not bigger than Share Count");
        }
      } else {
        console.log("Client Dont have this share");
      }
    }
  }
};
// Create and Save a new Transaction Data
exports.create = async (req, res) => {
  var ShareData = await Share.findByPk(req.body.ShareId);
  var ClientData = await Clients.findByPk(req.body.ClientId);
  if (ShareData == null || ClientData == null) {
    console.log("client or share not defined");
  } else {
    if (req.body.Operation == "BUY") {
      var TotalPrice = ShareData.Price * req.body.ShareSize;
      if (
        ShareData.ShareCount >= req.body.ShareSize &&
        ClientData.WalletBalance >= TotalPrice
      ) {
        const newTransaction = {
          ClientId: req.body.ClientId,
          ShareId: req.body.ShareId,
          ShareSize: req.body.ShareSize,
          TotalPrice: TotalPrice,
          Operation: req.body.Operation,
        };
        var result = await shareOperation(newTransaction);
        console.log("result", result);
        res.send({
          message: result,
        });
      } else {
        res.send({
          message:
            "Share size have not bigger than Share Count or Client wallet balance lower than TotalPrice",
        });
      }
    } else {
      const ClientShare = await Portfolio.findOne({
        where: {
          ClientId: req.body.ClientId,
          ShareId: req.body.ShareId,
        },
      });
      if (ClientShare !== null) {
        var TotalPrice = -ShareData.Price * req.body.ShareSize;
        if (ClientShare.ShareSize >= req.body.ShareSize) {
          const newTransaction = {
            ClientId: req.body.ClientId,
            ShareId: req.body.ShareId,
            ShareSize: req.body.ShareSize,
            TotalPrice: TotalPrice,
            Operation: req.body.Operation,
          };
          var result = await shareOperation(newTransaction);
          res.send({
            message: result,
          });
        } else {
          res.send({
            message: "Share size have not bigger than Share Count",
          });
        }
      } else {
        res.send({
          message: "Client dont have this share",
        });
      }
    }
  }
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
