//importer userService, bcrypt, jwt
const userService = require("../services/user.service");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//créer une nouvelle fct pour gérer l'inscription d'un new user
const signUp = async (req, res) => {
  const { password } = req.body;

  //hachage du mot de passe qui prend 2 arguments
  const hash = await bcrypt.hash(password, 10);

  const newUser = await userService.createUser({ ...req.body, password: hash });

  res.status(201).json(newUser); //code 201 car création
};

//créer une nouvelle fct pour faire la connexion
const signIn = async (req, res) => {
  const { username: email, password } = req.body;
  console.log(email);
  console.log(password);
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

const updateUser = async (req, res) => {
  const userId = req.params.id;
  const userData = req.body;
  try {
    const userExist = await userService.findUserById(userId);
    await userService.modifyUser(userExist.id, userData);
    res.status(200).json({ message: "Votre utilisateur a bien été modifié" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const userExist = await userService.findUserById(userId);
    await userService.destroyUser(userId);
    res.status(200).json({ message: "Votre utilisateur a bien été supprimé" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getUser = async (req, res) => {
  const userId = req.user.sub;

  const user = await userService.findUserById(userId);
  res.status(200).json(user);
};

module.exports = {
  getUser,
  signUp,
  signIn,
  updateUser,
  deleteUser,
};
