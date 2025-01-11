//importer method/fct du repository
const userRepository = require("../repositories/user.repository");

const createUser = async (userData) => {
  return await userRepository.saveUser(userData);
};

//on recupere un email
const findUserByEmail = async (email) => {
  return await userRepository.getUserByEmail(email);
};

module.exports = { createUser, findUserByEmail };
