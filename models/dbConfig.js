const dbConfig = require("../db.config");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle,
    },
    define:{
        timestamps: false,
        freezeTableName: true
    }
});



const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Share = require("./share.model.js")(sequelize, Sequelize);
db.Clients = require("./clients.model.js")(sequelize, Sequelize);
db.Portfolio = require("./portfolio.model.js")(sequelize, Sequelize);
db.Transaction = require("./transaction.model.js")(sequelize, Sequelize);

module.exports = db;