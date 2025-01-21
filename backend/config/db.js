//importer sequelize
const { Sequelize } = require("sequelize");
require("dotenv").config(); //avoir accès a l'environnement pour la connexion a la base de données

//connecter sequelize avec la db (la db doit exister au prealable)
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: "localhost",
    dialect: "mysql",
  }
);

//tester connexion a la db
sequelize
  .authenticate()
  .then(() => console.log("Connexion réussie"))
  .catch(() => console.log("Connexion échouée"));

//synchroniser l'app avec notre db
sequelize
  .sync({ alter: true })
  .then(() => console.log("Synchronisation réussie"))
  .catch(() => console.log("Synchronisation échouée"));

module.exports = sequelize;
