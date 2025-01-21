const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

const Difficulty = sequelize.define("Difficulty", {
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

module.exports = Difficulty;
