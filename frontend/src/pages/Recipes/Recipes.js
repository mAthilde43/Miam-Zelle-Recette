import classes from "./Recipes.module.css";
import Header from "../../components/Header/Header";
import Title from "../../components/Title/Title";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import { useState, useEffect } from "react";
import React from "react";
import CreatableSelect from "react-select/creatable";

const Recipes = () => {
  const [titleRecipe, setTitleRecipe] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [preparationTime, setPreparationTime] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [steps, setSteps] = useState([]);
  const [ingredientValue, setIngredientValue] = useState("");
  const [stepValue, setStepValue] = useState("");
  const [img, setImg] = useState(null);
  const [recipes, setRecipes] = useState([]);
  // const [ingredientsLength, setIngredientsLength] = useState(0);
  // const [stepsLength, setStepsLength] = useState(0);
  const [isFetch, setIsFetch] = useState(false);
  const [isPrivate, setIsPrivate] = useState(true);

  useEffect(
    function () {
      fetch("http://localhost:5001/recipe")
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          const recette = data.filter((r) => r.userId == 1);

          setRecipes(recette);
          setIsFetch(false);
        });
    },
    [isFetch]
  );

  const subCategoryOptions = {
    Ptitdej: [
      "Pancakes & Gauffres",
      "Céréales & Ganola",
      "Dej salés",
      "Oeufs & Omelettes",
      "Viennoiseries",
    ],
    Apéritifs: [
      "Verrines salées",
      "Cakes salés",
      "Feuilletés",
      "Brochettes apéro",
      "Tapas & Mezze",
    ],
    Entrees: [
      "Salades",
      "Soupes & Veloutés",
      "Tartes & Quiches",
      "Carpaccio & Tartares",
      "Terrines & Patés",
    ],
    Plats: [
      "Viandes",
      "Poissons",
      "Plats végétariens",
      "Pâtes & Riz",
      "Gratins & Mijotés",
    ],
    Fromages: [
      "Plateaux de fromages",
      "Fromages chauds",
      "Fondues & Raclettes",
      "Fromage frais",
      "Tartines au fromage",
    ],
    Desserts: [
      "Gâteaux",
      "Tartes & Tartelettes",
      "Mousses & Crèmes",
      "Glaces & Sorbets",
      "Biscuits",
    ],
    Boissons: [
      "Cocktails",
      "Mocktails",
      "Smoothies",
      "Boissons chaudes",
      "Boissons saisonnières",
    ],
  };

  const inputRecipeHandler = (e) => {
    const { name, value } = e.target;

    if (name === "titleRecipe") setTitleRecipe(value);
    else if (name === "category") setCategory(value);
    else if (name === "subCategory") setSubCategory(value);
    else if (name === "preparationTime") setPreparationTime(value);
    else if (name === "difficulty") setDifficulty(value);
    else if (name === "ingredients") {
      setIngredientValue(value);
      // setIngredientsLength(value.length);
    } else if (name === "steps") {
      setStepValue(value);
      // setStepsLength(value.length);
    }
  };

  const imgChangeHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImg(URL.createObjectURL(file));
    }
  };

  const toggleVisibilityHandler = () => {
    setIsPrivate(!isPrivate);
  };

  const submitRecipeHandler = (e) => {
    e.preventDefault();

    const newRecipe = {
      title: titleRecipe,
      category,
      subCategory,
      preparationTime,
      difficulty,
      ingredients,
      etapes: steps,
      img,
      userId: 1,
      visibility: isPrivate ? "private" : "public",
    };

    console.log("SUBMIT RECIP ", newRecipe);

    fetch("http://localhost:5001/recipe", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(newRecipe),
    })
      .then(function (data) {
        console.log(data);
        setIsFetch(true);
      })
      .catch(function (err) {
        console.log(err);
      });

    // Reset form
    setTitleRecipe("");
    setCategory("");
    setSubCategory("");
    setPreparationTime("");
    setDifficulty("");
    setIngredients([]);
    setSteps([]);
    setImg(null);
  };

  // // Redimensionner textarea en fonction de son contenu
  // const autoResize = (e) => {
  //     e.target.style.height = "auto";
  //     e.target.style.height = `${e.target.scrollHeight}px`;
  // };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      borderRadius: "20px",
      border: "1px solid #CDA274",
      ":hover": {
        borderColor: state.isFocused ? "#CDA274" : "#CDA274",
      },
      boxShadow: state.isFocused ? "0 0 0 0px #CDA274" : null,
    }),
    input: (provided) => ({
      ...provided,
      color: "#643300",
      fontSize: "15px",
    }),
    placeholder: (provided) => ({
      ...provided,
      textAlign: "left",
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: "#ffe0be",
      color: "#643300",
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: "#643300",
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: "#CDA274",
      ":hover": {
        color: "#643300",
      },
    }),
    menu: (provided) => ({
      ...provided,
      background: "#fff",
    }),
  };

  return (
    <>
      <Header />
      <div className={classes.recipesPage}>
        <Title type="h1">Mes Recettes</Title>
        <Title type="h2">Ajouter une recette</Title>

        <form onSubmit={submitRecipeHandler}>
          <div className={classes.formGroup}>
            <label>Titre de la recette :</label>
            <input
              type="text"
              name="titleRecipe"
              value={titleRecipe}
              placeholder="Titre de la recette"
              onChange={inputRecipeHandler}
            />
          </div>
          <div className={classes.formGroup}>
            <label>Catégorie :</label>
            <select
              name="category"
              value={category}
              onChange={inputRecipeHandler}
            >
              <option value="">Catégorie</option>
              <option value="Ptitdej">P'tit Dej</option>
              <option value="Apéritifs">Apéritifs</option>
              <option value="Entrees">Entrées</option>
              <option value="Plats">Plats</option>
              <option value="Fromages">Fromages</option>
              <option value="Desserts">Desserts</option>
              <option value="Boissons">Boissons</option>
            </select>
          </div>
          <div className={classes.formGroup}>
            <label>Sous-catégorie :</label>
            <select
              name="subCategory"
              value={subCategory}
              onChange={inputRecipeHandler}
              disabled={!category} // Désactive si aucune catégorie sélectionnée
            >
              <option value="">Sous-catégorie</option>
              {category &&
                subCategoryOptions[category]?.map((subCat) => (
                  <option key={subCat} value={subCat}>
                    {subCat}
                  </option>
                ))}
            </select>
          </div>

          <div className={classes.formGroup}>
            <label>Temps de préparation :</label>
            <input
              type="text"
              name="preparationTime"
              value={preparationTime}
              placeholder="Temps de préparation"
              onChange={inputRecipeHandler}
            />
          </div>

          <div className={classes.formGroup}>
            <label>Difficulté :</label>
            <select
              name="difficulty"
              value={difficulty}
              onChange={inputRecipeHandler}
            >
              <option value="">Difficulté</option>
              <option value="Facile">Facile</option>
              <option value="Moyen">Moyen</option>
              <option value="Difficile">Difficile</option>
            </select>
          </div>

          <div className={`${classes.formGroup} ${classes.formGroupSelect}`}>
            <label>Ingrédients :</label>
            {/* <textarea
                            name="ingredients"
                            value={ingredientValue}
                            placeholder="Ingrédients"
                            onChange={inputRecipeHandler}
                            maxLength={500}@
                            onInput={autoResize}
                        />
                        <div className={classes.charCount}>{500 - ingredientsLength}/500</div> */}

            <div className={classes.selectRow}>
              <CreatableSelect
                isMulti
                placeholder="Insérer les ingrédients et leur dosage"
                onChange={(choice) => {
                  const values = choice.map((c) => c.value);
                  setIngredients(values);
                }}
                styles={customStyles}
              />
            </div>
          </div>

          <div className={classes.formGroup}>
            <label>Étapes de préparation :</label>
            {/* <textarea
                            name="steps"
                            value={stepValue}
                            placeholder="Étapes de préparation"
                            onChange={inputRecipeHandler}
                            maxLength={1000}
                            onInput={autoResize}
                        />
                        <div className={classes.charCount}>{1000 - stepsLength}/1000</div> */}
            <CreatableSelect
              className={classes.selectDropdown}
              isMulti
              placeholder="Insérer les étapes de préparation"
              onChange={(choice) => {
                const values = choice.map((c) => c.value);
                setSteps(values);
              }}
              styles={customStyles}
            />
          </div>

          <div className={classes.formGroup}>
            <label>Image de la recette :</label>
            <input type="file" accept="image/*" onChange={imgChangeHandler} />
            {img && (
              <div className={classes.imagePreview}>
                <img src={img} alt="Prévisualisation" />
              </div>
            )}
          </div>

          <button className={classes.buttonForm} type="submit">
            Ajouter
          </button>
        </form>

        <Title type="h2">Mes recettes ajoutées</Title>
        <div className={classes.recipeList}>
          {recipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              title={recipe.title}
              img={recipe.img}
              id={recipe.id}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Recipes;
