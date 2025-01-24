const Recipe = require("../models/Recipes");

const saveRecipe = async (recipeData) => {
  const newRecipe = await Recipe.create(recipeData);
  return newRecipe;
};

const getRecipeById = async (recipeId) => {
  try {
    const recipe = await Recipe.findOne({ where: { id: recipeId } });
    if (!recipe) {
      return null;
    }
    return recipe.dataValues;
  } catch (error) {
    throw new Error("Erreur lors de la récupération de la recette");
  }
};

const updateRecipe = async (recipeId, recipeData) => {
  return await Recipe.update(recipeData, {
    where: {
      id: recipeId,
    },
  });
};

const deleteRecipe = async (recipeId) => {
  return await Recipe.destroy({
    where: {
      id: recipeId,
    },
  });
};
module.exports = { saveRecipe, getRecipeById, updateRecipe, deleteRecipe };
