module.exports = {
  HOST: "DBHOST",
  PORT: "DBPORT",
  USER: "USERNAME",
  PASSWORD: "PASSWORD",
  DB: "EvaExchange",
  dialect: "mysql",/* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};