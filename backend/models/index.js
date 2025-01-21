const User = require("./User");
const Recipes = require("./Recipes");
const Category = require("./Category");
const Subcategory = require("./Subcategory");
const Ingredients = require("./Ingredients");
const Step = require("./Step");
const Difficulty = require("./Difficulty");

User.hasMany(Recipes);
Recipes.belongsTo(User);

Recipes.belongsTo(Category);
Category.hasMany(Subcategory);

Recipes.hasMany(Ingredients);
Recipes.hasMany(Step);
Recipes.hasMany(Difficulty);

User.belongsToMany(Recipes, { through: "Favorites" });
Recipes.belongsToMany(User, { through: "Favorites" });

module.exports = {
  User,
  Recipes,
  Category,
  Subcategory,
  Ingredients,
  Step,
  Difficulty,
};
