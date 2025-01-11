//importer l'instense de sequelize definit dans db.js
const sequelize = require("../config/db");
//importer DataTypes
const { DataTypes } = require("sequelize");

//créer nouvelle variable avec define de sequelize
const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(45),
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = User;
