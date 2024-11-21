import Header from "../components/Header/Header"
import SlideRecipe from "../components/SlideRecipe/SlideRecipe"
import { useEffect, useState } from "react";
import Title from "../components/Title/Title";

const Desserts = () => {
    const [recipes, setRecipes] = useState([]) ; 
    const [recipesGateaux, setRecipesGateaux] = useState([]) ; 
    const [recipesTartesTartelettes, setRecipesTartesTartelettes] = useState([]) ;
    const [recipesMoussesCremes, setRecipesMoussesCremes] = useState([]) ;
    const [recipesGlacesSorbets, setRecipesGlacesSorbets] = useState([]) ;
    const [recipesBiscuits, setRecipesBiscuits] = useState([]) ;


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

                    const gateaux = data.filter(recipe => recipe.categorie === "gateaux")
                    setRecipesGateaux(gateaux)

                    const tartesTartelettes = data.filter(recipe => recipe.categorie === "tartes-tartelettes")
                    setRecipesTartesTartelettes(tartesTartelettes)

                    const moussesCremes = data.filter(recipe => recipe.categorie === "mousses-cremes")
                    setRecipesMoussesCremes(moussesCremes)

                    const glacesSorbets = data.filter(recipe => recipe.categorie === "glaces-sorbets")
                    setRecipesGlacesSorbets(glacesSorbets)

                    const biscuits = data.filter(recipe => recipe.categorie === "biscuits")
                    setRecipesBiscuits(biscuits)

                }
            )
        }, []
    )

    return (
        <><Header/>
        <div style={{height: "100%"}}>
            <Title type="h1">Desserts</Title>
            <Title type="h3">Gâteaux</Title>
            <SlideRecipe recipes={recipesGateaux}/> 
            <Title type="h3">Tartes & Tartelettes</Title>
            <SlideRecipe recipes={recipesTartesTartelettes}/>
            <Title type="h3">Mousses & Crèmes</Title>
            <SlideRecipe recipes={recipesMoussesCremes}/>
            <Title type="h3">Glaces & Sorbets</Title>
            <SlideRecipe recipes={recipesGlacesSorbets}/>
            <Title type="h3">Biscuits</Title>
            <SlideRecipe recipes={recipesBiscuits}/>
        </div>
        </>
        
    )
}

export default Desserts