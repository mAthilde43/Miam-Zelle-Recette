const User = require("./User");
const Recipes = require("./Recipes");
const Category = require("./Category");
const Subcategory = require("./Subcategory");
const Ingredients = require("./Ingredients");
const Step = require("./Step");
const Difficulty = require("./Difficulty");
const Tips = require("./Tips");
const Favorites = require("./Favorites");

User.hasMany(Recipes);
Recipes.belongsTo(User);

Recipes.belongsTo(Category);
Category.hasMany(Subcategory);

Recipes.hasMany(Ingredients);
Recipes.hasMany(Step);
Recipes.hasMany(Difficulty);

User.belongsToMany(Recipes, {
  through: Favorites,
  foreignKey: "UserId",
  as: "favorites",
});
Recipes.belongsToMany(User, {
  through: Favorites,
  foreignKey: "RecipeId",
  as: "favoritedBy",
});

Favorites.belongsTo(User, { foreignKey: "UserId" });
Favorites.belongsTo(Recipes, { foreignKey: "RecipeId", as: "recipe" });

User.hasMany(Favorites, { foreignKey: "UserId" });
Recipes.hasMany(Favorites, { foreignKey: "RecipeId" });

module.exports = {
  User,
  Recipes,
  Category,
  Subcategory,
  Ingredients,
  Step,
  Difficulty,
  Tips,
  Favorites,
};
