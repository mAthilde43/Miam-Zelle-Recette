import Header from "../components/Header/Header"
import SlideRecipe from "../components/SlideRecipe/SlideRecipe"
import { useEffect, useState } from "react";
import Title from "../components/Title/Title";

const Fromages = () => {
    const [recipes, setRecipes] = useState([]) ; 
    const [recipesPlateauxFromages, setRecipesPlateauxFromages] = useState([]) ; 
    const [recipesFromagesChauds, setRecipesFromagesChauds] = useState([]) ;
    const [recipesFonduesRaclettes, setRecipesFonduesRaclettes] = useState([]) ;
    const [recipesFromagesFrais, setRecipesFromagesFrais] = useState([]) ;
    const [recipesTartinesFromage, setRecipesTartinesFromage] = useState([]) ;

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

                    const plateauxFromages = data.filter(recipe => recipe.categorie === "plateaux-fromages")
                    setRecipesPlateauxFromages(plateauxFromages)

                    const fromageChauds = data.filter(recipe => recipe.categorie === "fromages-chauds")
                    setRecipesFromagesChauds(fromageChauds)

                    const fonduesRaclettes = data.filter(recipe => recipe.categorie === "fondues-raclettes")
                    setRecipesFonduesRaclettes(fonduesRaclettes)

                    const fromageFrais = data.filter(recipe => recipe.categorie === "fromages-frais")
                    setRecipesFromagesFrais(fromageFrais)

                    const tartinesFromage = data.filter(recipe => recipe.categorie === "tartines-fromages")
                    setRecipesTartinesFromage(tartinesFromage)

                }
            )
        }, []
    )

    return (
        <><Header/>
        <div style={{height: "100%"}}>
            <Title type="h1">Fromages</Title>
            <Title type="h3">Plateaux de fromages</Title>
            <SlideRecipe recipes={recipesPlateauxFromages}/> 
            <Title type="h3">Fromages chauds</Title>
            <SlideRecipe recipes={recipesFromagesChauds}/>
            <Title type="h3">Fondues & Raclettes</Title>
            <SlideRecipe recipes={recipesFonduesRaclettes}/>
            <Title type="h3">Fromage frais</Title>
            <SlideRecipe recipes={recipesFromagesFrais}/>
            <Title type="h3">Tartines au fromage</Title>
            <SlideRecipe recipes={recipesTartinesFromage}/>
        </div>
        </>
        
    )
}

export default Fromages