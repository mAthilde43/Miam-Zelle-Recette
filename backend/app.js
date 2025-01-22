require("dotenv").config();
const express = require("express");
require("./config/db");
const userRouter = require("./routes/auth.route");
const recipeRouter = require("./routes/recipe.route");
require("./models");

//créer l'app
const app = express();

//ce qui est recu dans le body soit transcrit en javascript
app.use(express.json()); //indispensable pour traiter les données qu'on recoit

//avec use on prefixe la route et uriliser le routeur
app.use("/auth", userRouter);
app.use("/recipe", recipeRouter);

//definir le PORT pour le lancer
const PORT = process.env.PORT || 4008;
app.listen(PORT, () => console.log("SERVER START"));
