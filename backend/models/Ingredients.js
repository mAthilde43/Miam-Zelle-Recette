const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

const Ingredients = sequelize.define("Category", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false, //ce champ ne peut pas etre null, il doit obligatoirement contenir qqch
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Ingredients;
