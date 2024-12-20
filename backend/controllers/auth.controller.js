const userService = require("../services/user.service");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//créer une nouvelle fonction pour gérer l'inscription d'un new user
const signUp = async (req, res) => {
  //il faut que ce soit async pour await
  const { name, firstName, username, password } = req.body; //utiliser le restructuring sur req body

  //hachage du mot de passe qui prend 2 arguments (1: mdp recu dans req.body / 2: donne un nb qui va definir le nb de tour que ca va faire)
  const hash = await bcrypt.hash(password, 10);

  const newUser = await userService.createUser({
    name,
    firstName,
    username,
    password: hash,
  });
  console.log(newUser);
  res.status(201).json(newUser); //code 201 car création
};

const getUser = (req, res) => {
  res.status(200).json({ message: "Ici on ne joue pas a Fortnite" });
};

module.exports = { getUser, signUp };
