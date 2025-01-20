//importer l'instense de sequelize definit dans db.js
const sequelize = require("../config/db");
//importer DataTypes
const { DataTypes } = require("sequelize");

//créer nouvelle variable avec define de sequelize
const Favorites = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
});

module.exports = Favorites;
