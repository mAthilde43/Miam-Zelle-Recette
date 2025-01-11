//dans ce fichier on va avoir toutes nos requêtes à la db
const { where } = require("sequelize");
const User = require("../models/User");

//création d'une fct qui va save un new user
const saveUser = async (userData) => {
  const newUser = await User.create(userData);
  return newUser;
};

//créer une fct qui va récupérer un user (select * from email)
const getUserByEmail = async (emailParam) => {
  try {
    return await User.findOne({
      where: {
        email: emailParam,
      },
    });
  } catch (error) {
    return error;
  }
};

module.exports = { saveUser, getUserByEmail };
