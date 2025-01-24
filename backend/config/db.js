const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: "localhost",
    dialect: "mysql",
  }
);

sequelize
  .authenticate()
  .then(() => console.log("Connexion réussie"))
  .catch(() => console.log("Connexion échouée"));

sequelize
  .sync({})
  .then(() => console.log("Synchronisation réussie"))
  .catch(() => console.log("Synchronisation échouée"));

module.exports = sequelize;
