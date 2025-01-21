const User = require("./User");
const Recipes = require("./Recipes");
const Favorites = require("./Favorites");
const Category = require("./Category");
const Subcategory = require("./Subcategory");
const Ingredients = require("./Ingredients");
const Step = require("./Step");
const Difficulty = require("./Difficulty");

User.hasMany(Recipes);
Recipes.belongsTo(User);
User.hasMany(Favorites);

Recipes.belongsTo(Category);

Category.hasMany(Subcategory);
// Subcategory.belongsTo(Category);
Recipes.hasMany(Ingredients);
Recipes.hasMany(Step);
Recipes.hasMany(Difficulty);

module.exports = {
  User,
  Recipes,
  Favorites,
  Category,
  Subcategory,
  Ingredients,
  Step,
  Difficulty,
};
