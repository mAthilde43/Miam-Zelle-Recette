const favoritesRepo = require("../repositories/favorites.repository");

const addFavorite = async (userId, recipeId) => {
  return await favoritesRepo.addFavorite(userId, recipeId);
};

const removeFavorite = async (userId, recipeId) => {
  return await favoritesRepo.removeFavorite(userId, recipeId);
};

const getUserFavorites = async (userId) => {
  return await favoritesRepo.getUserFavorites(userId);
};

module.exports = { addFavorite, removeFavorite, getUserFavorites };
