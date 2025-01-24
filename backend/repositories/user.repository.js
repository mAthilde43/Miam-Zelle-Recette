const User = require("../models/User");

//création d'une fct qui va save un new user
const saveUser = async (userData) => {
  const newUser = await User.create(userData);
  return newUser;
};

//créer une fct qui va récupérer un user (select * from email)
const getUserByEmail = async (emailParams) => {
  try {
    return await User.findOne({
      where: {
        email: emailParams,
      },
    });
  } catch (error) {
    return error;
  }
};

const getUserById = async (userId) => {
  try {
    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
      return null;
    }
    return user.dataValues;
  } catch (error) {
    throw new Error("Erreur lors de la récupération de l'utilisateur");
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

module.exports = {
  saveUser,
  getUserById,
  getUserByEmail,
  updateUser,
  deleteUser,
};
