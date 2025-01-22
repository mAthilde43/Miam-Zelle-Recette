//importer method/fct du repository
const userRepository = require("../repositories/user.repository");

const createUser = async (userData) => {
  return await userRepository.saveUser(userData);
};

//on recupere un email
const findUserByEmail = async (userId) => {
  // return await userRepository.getUserByEmail(email);
  const user = await userRepository.getUserByEmail(userId);
  if (!user) {
    throw new Error("L'utilisateur n'existe pas");
  }
  return user;
};

const modifyUser = async (userId, userData) => {
  return await userRepository.updateUser(userId, userData);
};

const destroyUser = async (userId) => {
  return await userRepository.deleteUser(userId);
};

module.exports = { createUser, findUserByEmail, modifyUser, destroyUser };
