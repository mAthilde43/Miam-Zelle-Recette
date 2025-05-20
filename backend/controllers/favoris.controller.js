const favoriteService = require("../services/favorites.service");

const addFavorite = async (req, res) => {
  try {
    const userId = req.user.sub;
    const { recipeId } = req.body;
    const favorite = await favoriteService.addFavorite(userId, recipeId);
    res.status(201).json(favorite);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const removeFavorite = async (req, res) => {
  try {
    const userId = req.user.sub;
    const { recipeId } = req.params;
    await favoriteService.removeFavorite(userId, recipeId);
    res.status(200).json({ message: "Recette supprimée des favoris." });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getFavorites = async (req, res) => {
  try {
    const userId = req.user.sub;
    const favorites = await favoriteService.getUserFavorites(userId);
    res.status(200).json(favorites);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { addFavorite, removeFavorite, getFavorites };
