const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Favorites = sequelize.define("Favorites", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  UserId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  RecipeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Favorites;
