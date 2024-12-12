import classes from './Recipes.module.css';
import Header from '../../components/Header/Header';
import Title from '../../components/Title/Title';
import RecipeCard from '../../components/RecipeCard/RecipeCard';
import { useState, useEffect } from 'react';
import React from 'react';
import CreatableSelect from 'react-select/creatable';

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
    const [photo, setPhoto] = useState(null);
    const [recipes, setRecipes] = useState([]);
    const [ingredientOptions, setIngredientOptions] = useState([]);
    const [ingredientKg, setIngredientKg] = useState([]);
    const [preparationStep, setPreparationStep] = useState([]);
    // const [ingredientsLength, setIngredientsLength] = useState(0);
    // const [stepsLength, setStepsLength] = useState(0);
    const [isFetch, setIsFetch] = useState(false)


    useEffect(
        function(){
            fetch("http://localhost:5001/recipe")
            .then(
                function(response){
                    return response.json()
                }
            )
            .then(
                function(data){
                    
                    const recette = data.filter(r => r.userId == 1)

                    setRecipes(recette);
                    setIsFetch(false)
                }
            )

            fetch("http://localhost:5001/ingredientsOptions")
        .then(
            function(response){
                return response.json()
            }
        )
        .then(
            function(data){
                setIngredientOptions(data)
            }
        );
    
    fetch("http://localhost:5001/ingredientsKg")
        .then(
            function(response){
                return response.json()
            }
        )
        .then(
            function(data){
                setIngredientKg(data)
            }
        );

    fetch("http://localhost:5001/preparationSteps")
        .then(
            function(response){
                return response.json()
            }
        )
        .then(
            function(data){
                setPreparationStep(data)
            }
        );

        }, [isFetch]
    )

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
            setIngredientValue(value); 
            // setIngredientsLength(value.length);
        }
        else if (name === "steps") {
            setStepValue(value);
            // setStepsLength(value.length);
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

        setIngredients((prevTab) => [...prevTab, ingredientValue])
        setSteps((prevTab) => [...prevTab, stepValue])

        const newRecipe = {
            title: titleRecipe,
            category,
            subCategory,
            preparationTime,
            difficulty,
            ingredients,
            etapes: steps,
            photo,
            userId: 1
        };

        console.log("SUBMIT RECIP ", newRecipe)

        fetch("http://localhost:5001/recipe", {
            method: "POST",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify(newRecipe)
        })
        .then(
            function(data){
                console.log(data)
                setIsFetch(true)
            })
        .catch(
            function(err){
                console.log(err)
            }
        )

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

    // // Redimensionner textarea en fonction de son contenu
    // const autoResize = (e) => {
    //     e.target.style.height = "auto";
    //     e.target.style.height = `${e.target.scrollHeight}px`;
    // };


    

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
                                options={ingredientOptions}
                                placeholder="Sélectionner ou entrer les ingrédients" 
                            />
                            
                            <CreatableSelect 
                                isMulti 
                                options={ingredientKg} 
                                placeholder="Sélectionner ou entrer le grammage"
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
                            isMulti 
                            options={preparationStep} 
                            className={classes.selectDropdown} 
                            placeholder="Entrer les étapes à suivre"/>
                        </div>

                    <div className={classes.formGroup}>
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
                    {console.log(recipes)}
                    {recipes.map((recipe) => <RecipeCard key={recipe.id} title={recipe.title} img={recipe.photo} id={recipe.id}/>)}
                </div> 
             </div>
        </>
    );
};

export default Recipes;
