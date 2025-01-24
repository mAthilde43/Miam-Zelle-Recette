import classes from "./ModalModify.module.css";
import { useState } from "react";

const ModalModify = ({ funcEvent, recipeData }) => {
  const [titleRecipe, setTitleRecipe] = useState(recipeData.title);
  const [category, setCategory] = useState(recipeData.category || "");
  const [subcategory, setSubcategory] = useState(recipeData.subcategory || "");
  const [preparationTime, setPreparationTime] = useState(
    recipeData.preparationTime || ""
  );
  const [difficulty, setDifficulty] = useState(recipeData.difficulty || "");

  // Initialiser ingredients et steps avec un tableau vide si undefined
  const [ingredients, setIngredients] = useState(
    recipeData.ingredients ? recipeData.ingredients.join("\n") : ""
  );
  const [steps, setSteps] = useState(
    recipeData.steps ? recipeData.steps.join("\n") : ""
  );

  const [image, setImage] = useState(recipeData.img);

  function closeModal() {
    funcEvent(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const updatedRecipe = {
      ...recipeData,
      titleRecipe,
      category,
      subcategory,
      preparationTime,
      difficulty,
      ingredients: ingredients.split("\n"),
      steps: steps.split("\n"),
      img: image,
    };

    fetch(`http://localhost:5001/recipe/${recipeData.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedRecipe),
    })
      .then((response) => response.json())
      .then(() => {
        alert("Recette mise à jour !");
        funcEvent(false);
      });
  }

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

  return (
    <div className={classes.modalBackdrop} onClick={closeModal}>
      <div
        className={classes.modalContent}
        onClick={(e) => e.stopPropagation()} // Empêche la fermeture si on clique dans la modal
      >
        <h2>Modifier la recette</h2>
        <form onSubmit={handleSubmit}>
          <label>Titre :</label>
          <input
            type="text"
            value={titleRecipe}
            placeholder="Titre de la recette"
            onChange={(e) => setTitleRecipe(e.target.value)}
          />

          <label>Catégorie :</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
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

          <label>Sous-catégorie :</label>
          <select
            value={subcategory}
            onChange={(e) => setSubcategory(e.target.value)}
            disabled={!category}
          >
            <option value="">Sous-catégorie</option>
            {category &&
              subCategoryOptions[category]?.map((subCat) => (
                <option key={subCat} value={subCat}>
                  {subCat}
                </option>
              ))}
          </select>

          <label>Temps de préparation :</label>
          <input
            type="text"
            value={preparationTime}
            placeholder="Temps de préparation"
            onChange={(e) => setPreparationTime(e.target.value)}
          />

          <label>Difficulté :</label>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option value="">Difficulté</option>
            <option value="Facile">Facile</option>
            <option value="Moyen">Moyen</option>
            <option value="Difficile">Difficile</option>
          </select>

          <label>Ingrédients :</label>
          <textarea
            rows="5"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
          ></textarea>

          <label>Étapes de préparation :</label>
          <textarea
            rows="5"
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
          ></textarea>

          <label>Image de la recette (URL) :</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />

          <div className={classes.modalActions}>
            <button type="submit">Enregistrer</button>
            <button type="button" onClick={closeModal}>
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalModify;
