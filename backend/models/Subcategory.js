const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

const Subcategory = sequelize.define("Subcategory", {
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

module.exports = Subcategory;
