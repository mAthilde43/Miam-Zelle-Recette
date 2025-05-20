const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

const Ingredients = sequelize.define("Ingredients", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Ingredients;
