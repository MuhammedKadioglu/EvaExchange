module.exports = {
    HOST: "CMSPORTALPROD02",
    USER: "cms",
    PASSWORD: "cms123",
    DB: "CoreTemplate",
    dialect: "mssql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };