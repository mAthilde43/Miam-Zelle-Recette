const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: "localhost",
    dialect: "mysql",
    port: 3306,
  }
);
sequelize
  .authenticate()
  .then(() => console.log("Connexion réussie"))
  .catch((error) => {
    console.error("Connexion échouée :", error.message);
  });

sequelize
  .sync({})
  .then(() => console.log("Synchronisation réussie"))
  .catch((error) => {
    console.error("Synchronisation échouée :", error.message);
  });

module.exports = sequelize;
