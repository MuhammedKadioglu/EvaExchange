module.exports = {
    HOST: "127.0.0.1",
    PORT: "3306",
    USER: "cms",
    PASSWORD: "cms123",
    DB: "Template",
    dialect: "mysql",/* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };
