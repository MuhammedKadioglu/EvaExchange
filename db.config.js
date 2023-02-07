module.exports = {
    HOST: "serverName",
    USER: "userName",
    PASSWORD: "password",
    DB: "DbName",
    dialect: "mssql",/* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };
