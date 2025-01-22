const Recipe = require("../models/Recipes");

//fct qui save/crée recette
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
    // return error;
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

//fct qui crée une recette
// const createRecipe = async (recipeData) => {
//   return await Recipes.create(recipeData);
// };

// //fct qui MAJ une recette
// const updateRecipe = async (recipeId, updates) => {
//   return await Recipes.update(updates, { where: { id: recipeId } });
// };

// //fct qui supprime une recette
// const deleteRecipe = async (recipeId) => {
//   return await Recipes.destroy({ where: { id: recipeId } });
// };

// module.exports = { createRecipe, updateRecipe, deleteRecipe };
