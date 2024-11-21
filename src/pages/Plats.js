import Header from "../components/Header/Header"
import SlideRecipe from "../components/SlideRecipe/SlideRecipe"
import { useEffect, useState } from "react";
import Title from "../components/Title/Title";

const Plats = () => {
    const [recipes, setRecipes] = useState([]) ; 
    const [recipesViandes, setRecipesViandes] = useState([]) ; 
    const [recipesPoissons, setRecipesPoissons] = useState([]) ;
    const [recipesPlatsVegetariens, setRecipesPlatsVegetariens] = useState([]) ;
    const [recipesPatesRiz, setRecipesPatesRiz] = useState([]) ;
    const [recipesGratinMijotes, setRecipesGratinMijotes] = useState([]) ;

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

                    const viandes = data.filter(recipe => recipe.categorie === "viandes")
                    setRecipesViandes(viandes)

                    const poissons = data.filter(recipe => recipe.categorie === "poissons")
                    setRecipesPoissons(poissons)

                    const platsVegetariens = data.filter(recipe => recipe.categorie === "plats-vegetariens")
                    setRecipesPlatsVegetariens(platsVegetariens)

                    const patesRiz = data.filter(recipe => recipe.categorie === "pates-riz")
                    setRecipesPatesRiz(patesRiz)

                    const GratinMijotes = data.filter(recipe => recipe.categorie === "gratins-mijotes")
                    setRecipesGratinMijotes(GratinMijotes)

                }
            )
        }, []
    )

    return (
        <><Header/>
        <div style={{height: "100%"}}>
            <Title type="h1">Plats</Title>
            <Title type="h3">Viandes</Title>
            <SlideRecipe recipes={recipesViandes}/> 
            <Title type="h3">Poissons</Title>
            <SlideRecipe recipes={recipesPoissons}/>
            <Title type="h3">Plats Végétariens</Title>
            <SlideRecipe recipes={recipesPlatsVegetariens}/>
            <Title type="h3">Pâtes & Riz</Title>
            <SlideRecipe recipes={recipesPatesRiz}/>
            <Title type="h3">Gratin & Mijotés</Title>
            <SlideRecipe recipes={recipesGratinMijotes}/>
        </div>
        </>
        
    )
}

export default Plats