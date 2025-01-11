//importer JWT
const jwt = require("jsonwebtoken");
require("dotenv").config();

//fct qui extrait le token, le verifie
const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    //verifier que ce token recu a bien été créer avec la meme clé secret JWT_SECRET
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    //si payload est null = erreur
    if (!payload) {
      throw {
        status: 401,
        message: "Unauthorized",
      };
    }

    //créer une nouvelle propriété à l'object req
    req.user = payload;

    //appeler la method NEXT
    next();
  } catch (error) {
    res.status(401).json(error);
  }
};

module.exports = auth;
