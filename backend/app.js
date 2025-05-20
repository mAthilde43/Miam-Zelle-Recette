require("dotenv").config();
const express = require("express");
require("./config/db");
const userRouter = require("./routes/auth.route");
const recipeRouter = require("./routes/recipe.route");
require("./models");
const cors = require("cors");
const tipsRoute = require("./routes/tips.route");
const favoritesRoutes = require("./routes/favorites.route");

//créer l'app
const app = express();

// Configuration de CORS
const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));

//ce qui est recu dans le body soit transcrit en javascript
app.use(express.json()); //indispensable pour traiter les données qu'on recoit
app.use("/uploads", express.static("uploads"));

//avec use on prefixe la route et uriliser le routeur
app.use("/auth", userRouter);
app.use("/recipe", recipeRouter);
app.use("/tips", tipsRoute);
app.use("/favorites", favoritesRoutes);
app.use("/uploads", express.static("uploads"));

//definir le PORT pour le lancer
const PORT = process.env.PORT || 4008;
app.listen(PORT, () => console.log("SERVER START"));
