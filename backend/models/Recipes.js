//importer l'instense de sequelize definit dans db.js
const sequelize = require("../config/db");
//importer DataTypes
const { DataTypes } = require("sequelize");

//créer nouvelle variable avec define de sequelize
const Recipes = sequelize.define("Recipes", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  preparationTime: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    // allowNull: false,
  },
});

module.exports = Recipes;
