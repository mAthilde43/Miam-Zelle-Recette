import Header from "../components/Header/Header"
import SlideRecipe from "../components/SlideRecipe/SlideRecipe"
import { useEffect, useState } from "react";
import Title from "../components/Title/Title";

const Boissons = () => {
    const [recipes, setRecipes] = useState([]) ; 
    const [recipesCocktails, setRecipesCocktails] = useState([]) ; 
    const [recipesMocktails, setRecipesMocktails] = useState([]) ;
    const [recipesSmoothies, setRecipesSmoothies] = useState([]) ;
    const [recipesBoissonsChaudes, setRecipesBoissonsChaudes] = useState([]) ;
    const [recipesBoissonsSaisonnieres, setRecipesBoissonsSaisonnieres] = useState([]) ;


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

                    const cocktails = data.filter(recipe => recipe.categorie === "cocktails")
                    setRecipesCocktails(cocktails)

                    const mocktails = data.filter(recipe => recipe.categorie === "mocktails")
                    setRecipesMocktails(mocktails)

                    const smoothies = data.filter(recipe => recipe.categorie === "smoothie")
                    setRecipesSmoothies(smoothies)

                    const boissonsChaudes = data.filter(recipe => recipe.categorie === "boissons-chaudes")
                    setRecipesBoissonsChaudes(boissonsChaudes)

                    const boissonsSaisonnieres = data.filter(recipe => recipe.categorie === "boissons-saisonnieres")
                    setRecipesBoissonsSaisonnieres(boissonsSaisonnieres)

                }
            )
        }, []
    )

    return (
        <><Header/>
        <div style={{height: "100%"}}>
            <Title type="h1">Boissons</Title>
            <Title type="h3">Cocktails</Title>
            <SlideRecipe recipes={recipesCocktails}/> 
            <Title type="h3">Mocktails</Title>
            <SlideRecipe recipes={recipesMocktails}/>
            <Title type="h3">Smoothies</Title>
            <SlideRecipe recipes={recipesSmoothies}/>
            <Title type="h3">Boissons chaudes</Title>
            <SlideRecipe recipes={recipesBoissonsChaudes}/>
            <Title type="h3">Boissons saisonnières</Title>
            <SlideRecipe recipes={recipesBoissonsSaisonnieres}/>
        </div>
        </>
        
    )
}

export default Boissons