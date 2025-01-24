const userRepository = require("../repositories/user.repository");

const createUser = async (userData) => {
  return await userRepository.saveUser(userData);
};

const findUserByEmail = async (email) => {
  return await userRepository.getUserByEmail(email);
};

const findUserById = async (userId) => {
  const user = await userRepository.getUserById(userId);
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

module.exports = {
  createUser,
  findUserById,
  findUserByEmail,
  modifyUser,
  destroyUser,
};
