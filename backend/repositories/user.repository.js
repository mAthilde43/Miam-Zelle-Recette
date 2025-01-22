//dans ce fichier on va avoir toutes nos requêtes à la db;
const User = require("../models/User");

//création d'une fct qui va save un new user
const saveUser = async (userData) => {
  const newUser = await User.create(userData);
  return newUser;
};

//créer une fct qui va récupérer un user (select * from email)
const getUserByEmail = async (emailParam) => {
  try {
    const user = await User.findOne({ where: { email: emailParam } });

    return user.dataValues;
  } catch (error) {
    return error;
  }
};

//MAJ user
const updateUser = async (userId, userData) => {
  return await User.update(userData, {
    where: {
      id: userId,
    },
  });
};

const deleteUser = async (userId) => {
  return await User.destroy({
    where: {
      id: userId,
    },
  });
};

module.exports = { saveUser, getUserByEmail, updateUser, deleteUser };
