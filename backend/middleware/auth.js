const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      console.log("Authorization header missing");
      return res.status(401).json({ message: "Token manquant" });
    }

    const authHeader = req.headers.authorization;
    console.log("Authorization header:", authHeader);

    const tokenParts = authHeader.split(" ");
    if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
      console.log("Format token invalide");
      return res.status(401).json({ message: "Format du token invalide" });
    }

    const token = tokenParts[1];

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    if (!payload) {
      console.log("Token invalide");
      return res.status(401).json({ message: "Token invalide" });
    }

    req.user = payload;
    console.log("User payload:", payload);

    next();
  } catch (error) {
    console.log("Erreur auth middleware:", error.message);
    return res.status(401).json({ message: "Token invalide ou expiré" });
  }
};

module.exports = auth;
