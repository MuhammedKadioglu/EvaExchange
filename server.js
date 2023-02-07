const express = require("express"); //Import the express dependency
const app = express(); //Instantiate an express app, the main work horse of this server
const port = 8080;
const bodyparse = require("body-parser");
app.use(bodyparse.json());
app.use(bodyparse.urlencoded({ extended: true }));
require("./routes/Clients.routes")(app);
require("./routes/Share.routes")(app);
require("./routes/Portfolio.routes")(app);
require("./routes/Transaction.routes")(app);
const db = require("./models/dbConfig");
const Clients = db.Clients;
const Shares = db.Share;
const transactionController = require("./controllers/transaction.controller");

db.sequelize
  .sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

db.sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error);
  });
app.get("/", async function (req, res) {
  await Clients.destroy({
    truncate: true,
  });
  const user1 = await Clients.create({ Name: "User1", WalletBalance: 500.00 });
  const user2 = await Clients.create({ Name: "User2", WalletBalance: 234.12 });
  const user3 = await Clients.create({ Name: "User3", WalletBalance: 22054.96 });
  const user4 = await Clients.create({ Name: "User4", WalletBalance: 1349.67 });
  const user5 = await Clients.create({ Name: "User5", WalletBalance: 980.20 });

  await Shares.destroy({
    truncate: true,
  });
  const shareBNB = await Shares.create({ ShareCode: "BNB", Price: 329.9 });
  const shareBTC = await Shares.create({ ShareCode: "BTC", Price: 23097.96 });
  const shareTRY = await Shares.create({ ShareCode: "TRY", Price: 18.67 });

  await transactionController.BulkInsert(ClientId = user1.Id, ShareId = shareBNB.Id,ShareSize = 1,Operation = "BUY");
  await transactionController.BulkInsert(ClientId = user2.Id, ShareId = shareTRY.Id,ShareSize = 2,Operation = "SELL");
  await transactionController.BulkInsert(ClientId = user3.Id, ShareId = shareBTC.Id,ShareSize = 1,Operation = "SELL");
  await transactionController.BulkInsert(ClientId = user4.Id, ShareId = shareBNB.Id,ShareSize = 1,Operation = "BUY");
  await transactionController.BulkInsert(ClientId = user5.Id, ShareId = shareTRY.Id,ShareSize = 1,Operation = "BUY");

  res.send({
    message: "EvaExchange Started",
  });
});

app.listen(port, () => {
  //server starts listening for any attempts from a client to connect at port: {port}
  console.log(`Now listening on port http://Localhost:${port}`);
});
