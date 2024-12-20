const userRepository = require("../repositories/user.repository")

const createUser = async (userData) => {
    return await userRepository.saveUser(userData)
}

//on récupère un userId
const findUserById = async (id) => {
    return await userRepository.getUser(id)
}

module.exports = {createUser, findUserById};