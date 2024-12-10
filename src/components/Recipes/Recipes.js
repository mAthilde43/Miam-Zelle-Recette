import classes from './Recipes.module.css';
import Header from '../Header/Header';
import Title from '../Title/Title';
import RecipeCard from '../RecipeCard/RecipeCard';
import Modal from '../Modal/Modal';
import { useState } from 'react';

const Recipes = () => {
    const [titleRecipe, setTitleRecipe] = useState("");
    const [category, setCategory] = useState("");
    const [subCategory, setSubCategory] = useState("");
    const [preparationTime, setPreparationTime] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [steps, setSteps] = useState("");
    const [photo, setPhoto] = useState(null);
    const [recipes, setRecipes] = useState([]);
    const [ingredientsLength, setIngredientsLength] = useState(0);
    const [stepsLength, setStepsLength] = useState(0);


    const subCategoryOptions = {
        Ptitdej: ["Pancakes & Gauffres", "Céréales & Ganola", "Dej salés", "Oeufs & Omelettes", "Viennoiseries"],
        Apéritifs: ["Verrines salées", "Cakes salés", "Feuilletés", "Brochettes apéro", "Tapas & Mezze"],
        Entrees: ["Salades", "Soupes & Veloutés", "Tartes & Quiches", "Carpaccio & Tartares", "Terrines & Patés"],
        Plats: ["Viandes", "Poissons", "Plats végétariens", "Pâtes & Riz", "Gratins & Mijotés"],
        Fromages: ["Plateaux de fromages", "Fromages chauds", "Fondues & Raclettes", "Fromage frais", "Tartines au fromage"],
        Desserts: ["Gâteaux", "Tartes & Tartelettes", "Mousses & Crèmes", "Glaces & Sorbets", "Biscuits"],
        Boissons: ["Cocktails", "Mocktails", "Smoothies", "Boissons chaudes", "Boissons saisonnières"]
    };

    const inputRecipeHandler = (e) => {
        const { name, value } = e.target;

        if (name === "titleRecipe") setTitleRecipe(value);
        else if (name === "category") setCategory(value);
        else if (name === "subCategory") setSubCategory(value);
        else if (name === "preparationTime") setPreparationTime(value);
        else if (name === "difficulty") setDifficulty(value);
        else if (name === "ingredients") {
            setIngredients(value); // Garde le texte brut pour ingrédients
            setIngredientsLength(value.length);
        }
        else if (name === "steps") {
            setSteps(value); // Garde le texte brut pour les étapes
            setStepsLength(value.length);
        }
    };

    const photoChangeHandler = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPhoto(URL.createObjectURL(file));
        }
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
            steps,
            photo,
        };

        setRecipes((prevRecipes) => [...prevRecipes, newRecipe]);

        // Reset form
        setTitleRecipe("");
        setCategory("");
        setSubCategory("");
        setPreparationTime("");
        setDifficulty("");
        setIngredients("");
        setSteps("");
        setPhoto(null);
    };

    // Redimensionner textarea en fonction de son contenu
    const autoResize = (e) => {
        e.target.style.height = "auto";
        e.target.style.height = `${e.target.scrollHeight}px`;
    };

    return (
        <>
            <Header />
            <div className={classes.recipesPage}>
                <Title type="h1">Mes Recettes</Title>
                <Title type="h2">Ajouter une recette</Title>

                <form onSubmit={submitRecipeHandler}>
                    <div>
                        <label>Titre de la recette :</label>
                        <input
                            type="text"
                            name="titleRecipe"
                            value={titleRecipe}
                            placeholder="Titre de la recette"
                            onChange={inputRecipeHandler}
                        />
                    </div>
                    <div>
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
                    <div>
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

                    <div>
                        <label>Temps de préparation :</label>
                        <input
                            type="text"
                            name="preparationTime"
                            value={preparationTime}
                            placeholder="Temps de préparation"
                            onChange={inputRecipeHandler}
                        />
                    </div>

                    {/* <div>
                        <label>Difficulté :</label>
                        <input
                            type="text"
                            name="difficulty"
                            value={difficulty}
                            placeholder="Difficulté"
                            onChange={inputRecipeHandler}
                        />
                    </div> */}

                    <div className={classes.inputContainer}>
                        <label>Ingrédients :</label>
                        <textarea
                            name="ingredients"
                            value={ingredients}
                            placeholder="Ingrédients"
                            onChange={inputRecipeHandler}
                            maxLength={500}
                            onInput={autoResize}
                        />
                        <div className={classes.charCount}>{500 - ingredientsLength}/500</div>
                    </div>
                    <div className={classes.inputContainer}>
                        <label>Étapes de préparation :</label>
                        <textarea
                            name="steps"
                            value={steps}
                            placeholder="Étapes de préparation"
                            onChange={inputRecipeHandler}
                            maxLength={1000}
                            onInput={autoResize}
                        />
                        <div className={classes.charCount}>{1000 - stepsLength}/1000</div>
                    </div>
                    <div>
                        <label>Image de la recette :</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={photoChangeHandler}
                        />
                        {photo && (
                            <div className={classes.imagePreview}>
                                <img src={photo} alt="Prévisualisation" />
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
                        img={recipe.photoNewRecipe}
                      />
                    ))}
                    

                </div> 
             </div>
        </>
    );
};

export default Recipes;
