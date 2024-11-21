import Header from "../components/Header/Header"
import SlideRecipe from "../components/SlideRecipe/SlideRecipe"
import { useEffect, useState } from "react";
import Title from "../components/Title/Title";

const Entrees = () => {
    const [recipes, setRecipes] = useState([]) ; 
    const [recipesSalades, setRecipesSalades] = useState([]) ; 
    const [recipesSoupeVeloute, setRecipesSoupeVeloute] = useState([]) ;
    const [recipesTartesQuiches, setRecipesTartesQuiche] = useState([]) ;
    const [recipesCarpaccioTartare, setRecipesCarpaccioTartare] = useState([]) ;
    const [recipesTerrinesPates, setRecipesTerrinesPates] = useState([]) ;

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
                    console.log(data) 

                    const salades = data.filter(recipe => recipe.categorie === "salades")
                    setRecipesSalades(salades)

                    const soupeVeloute = data.filter(recipe => recipe.categorie === "soupe-veloute")
                    setRecipesSoupeVeloute(soupeVeloute)

                    const tartesQuiches = data.filter(recipe => recipe.categorie === "tartes-quiches")
                    setRecipesTartesQuiche(tartesQuiches)

                    const carpaccioTartare = data.filter(recipe => recipe.categorie === "carpaccio-tartare")
                    setRecipesCarpaccioTartare(carpaccioTartare)

                    const terrinesPates = data.filter(recipe => recipe.categorie === "terrines-pates")
                    setRecipesTerrinesPates(terrinesPates)

                }
            )
        }, []
    )

    return (
        <><Header/>
        <div style={{height: "100%"}}>
            <Title type="h1">Entrées</Title>
            <Title type="h3">Salades</Title>
            <SlideRecipe recipes={recipesSalades}/> 
            <Title type="h3">Soupe & Velouté</Title>
            <SlideRecipe recipes={recipesSoupeVeloute}/>
            <Title type="h3">Tartes & Quiches</Title>
            <SlideRecipe recipes={recipesTartesQuiches}/>
            <Title type="h3">Carpaccio & tartare</Title>
            <SlideRecipe recipes={recipesCarpaccioTartare}/>
            <Title type="h3">Terrines & Patés</Title>
            <SlideRecipe recipes={recipesTerrinesPates}/>
        </div>
        </>
        
    )
}

export default Entrees