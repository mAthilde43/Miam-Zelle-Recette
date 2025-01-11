//importer userService
const userService = require("../services/user.service");
//importer bcrypt pour el hachage du mot de passe
const bcrypt = require("bcrypt");
//importer jwt
const jwt = require("jsonwebtoken");

//créer une nouvelle fct pour gérer l'inscription d'un new user
const signUp = async (req, res) => {
  const { email, password } = req.body;

  //hachage du mot de passe qui prend 2 arguments
  const hash = await bcrypt.hash(password, 10);

  const newUser = await userService.createUser({ email, password: hash });

  res.status(201).json(newUser); //code 201 car création
};

//créer une nouvelle fct pour faire la connexion
const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    //chercher l'user en bdd
    const userExist = await userService.findUserByEmail(email);

    //comparer les mots de passe : on va utiliser bcrypt
    const isVerif = await bcrypt.compare(password, userExist.password);

    //si les password ne correspondent pas, on return une error
    if (!isVerif) {
      throw "Connexion refusé";
    }

    //créer du JWT
    const token = jwt.sign(
      {
        sub: userExist.id,
        email: userExist.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "10m", //validiter de 10min
      }
    );

    res.status(200).json({ token });

    //retourner une reponse
  } catch (error) {
    res.status(401).json({ message: error });
  }
};

const getUser = (req, res) => {
  res.status(200).json({ message: "Ici on ne joue pas Fortnite" });
};

//exporter getUser
module.exports = { getUser, signUp, signIn };
