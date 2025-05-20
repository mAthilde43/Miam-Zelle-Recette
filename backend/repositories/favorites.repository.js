const { Favorites, Recipes } = require("../models");

const addFavorite = async (userId, recipeId) => {
  return await Favorites.create({ UserId: userId, RecipeId: recipeId });
};

const removeFavorite = async (userId, recipeId) => {
  return await Favorites.destroy({
    where: { UserId: userId, RecipeId: recipeId },
  });
};

const getUserFavorites = async (userId) => {
  return await Favorites.findAll({
    where: { UserId: userId },
    include: [
      {
        model: Recipes,
        as: "recipe",
      },
    ],
  });
};

module.exports = { addFavorite, removeFavorite, getUserFavorites };
