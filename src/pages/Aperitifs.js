import Header from "../components/Header/Header"
import SlideRecipe from "../components/SlideRecipe/SlideRecipe"
import { useEffect, useState } from "react";
import Title from "../components/Title/Title";

const Aperitifs = () => {
    
    const [recipes, setRecipes] = useState([]) ; //toutes les recettes
    const [recipesVerrinesSalees, setRecipesVerrinesSalees] = useState([]) ; 
    const [recipesCakesSales, setRecipesCakesSales] = useState([]) ;
    const [recipesFeuilletes, setRecipesFeuilletes] = useState([]) ;
    const [recipesBrochettesApero, setRecipesBrochettesApero] = useState([]) ;
    const [recipesTapasMezze, setRecipesTapasMezze] = useState([]) ;

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

                    const verrinesSalees = data.filter(recipe => recipe.categorie === "verrines-salees")
                    setRecipesVerrinesSalees(verrinesSalees)

                    const cakesSales = data.filter(recipe => recipe.categorie === "cakes-sales")
                    setRecipesCakesSales(cakesSales)

                    const feuilletes = data.filter(recipe => recipe.categorie === "feuilletes")
                    setRecipesFeuilletes(feuilletes)

                    const brochettesApero = data.filter(recipe => recipe.categorie === "brochettes-apéro")
                    setRecipesBrochettesApero(brochettesApero)

                    const tapasMezze = data.filter(recipe => recipe.categorie === "tapas-mezze")
                    setRecipesTapasMezze(tapasMezze)

                }
            )
        }, []
    )

    return (
        <><Header/>
        <div style={{height: "100%"}}>
            <Title type="h3">Verrines salées</Title>
            <SlideRecipe recipes={recipesVerrinesSalees}/> 
            <Title type="h3">Cakes salés</Title>
            <SlideRecipe recipes={recipesCakesSales}/>
            <Title type="h3">Feuilletés</Title>
            <SlideRecipe recipes={recipesFeuilletes}/>
            <Title type="h3">Brochettes apéro</Title>
            <SlideRecipe recipes={recipesBrochettesApero}/>
            <Title type="h3">Tapas & Mezze</Title>
            <SlideRecipe recipes={recipesTapasMezze}/>
        </div>
        </>
        
    )
}

export default Aperitifs