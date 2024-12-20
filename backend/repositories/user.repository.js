const User = require('../models/User')

//création d'une fonction qui va sauvegarder un nouvel utilisateur
const saveUser = async (userData) => { //asynchrone pour traiter la reponse
    const newUser = new User(userData)
    return await newUser.save();
}

const getUser = async (userId) => {
    try {
        return await User.findOne ({
            id: userId
        })
    } catch (error) {
        return error
    }
}

//recupere la liste dune ressource,recup une ressource en fct d'un id, faire modif et suppression
//save / update/ findOne/ findAll / deleteOne
module.exports = {saveUser, getUser};


//db –> repository –> service –> controller –> routes –> app