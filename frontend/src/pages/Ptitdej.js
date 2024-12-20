import Header from "../components/Header/Header"
import SlideRecipe from "../components/SlideRecipe/SlideRecipe"
import { useEffect, useState } from "react";
import Title from "../components/Title/Title";


const Ptitdej = () => {
    const [recipes, setRecipes] = useState([]) ; //toutes les recettes
    const [recipesPancakesGauffres, setRecipesPancakesGauffres] = useState([]) ; 
    const [recipesCerealesGranola, setRecipesCerealesGranola] = useState([]) ;
    const [recipesDejSales, setRecipesDejSales] = useState([]) ;
    const [recipesOeufsOmelettes, setRecipesOeufsOmelettes] = useState([]) ;
    const [recipesViennoiserie, setRecipesViennoiserie] = useState([]) ;

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

                    const pancakesGauffres = data.filter(recipe => recipe.categorie === "pancakes-gauffres")
                    setRecipesPancakesGauffres(pancakesGauffres)

                    const cerealesGranola = data.filter(recipe => recipe.categorie === "cereales-granola")
                    setRecipesCerealesGranola(cerealesGranola)

                    const smoothies = data.filter(recipe => recipe.categorie === "dej-sales")
                    setRecipesDejSales(smoothies)

                    const oeufsOmelettes = data.filter(recipe => recipe.categorie === "oeufs-omelettes")
                    setRecipesOeufsOmelettes(oeufsOmelettes)

                    const viennoiserie = data.filter(recipe => recipe.categorie === "viennoiserie")
                    setRecipesViennoiserie(viennoiserie)

                }
            )
        }, []
    )

    return (
        <><Header/>
        <div style={{height: "100%"}}>
            <Title type="h1">P'tit dej</Title>
            <Title type="h3">Pancakes & Gauffres</Title>
            <SlideRecipe recipes={recipesPancakesGauffres}/> 
            <Title type="h3">Céréales & Granola</Title>
            <SlideRecipe recipes={recipesCerealesGranola}/>
            <Title type="h3">Dej Salés</Title>
            <SlideRecipe recipes={recipesDejSales}/>
            <Title type="h3">Oeufs & Omelettes</Title>
            <SlideRecipe recipes={recipesOeufsOmelettes}/>
            <Title type="h3">Viennoiseries</Title>
            <SlideRecipe recipes={recipesViennoiserie}/>
        </div>
        </>
        
    )
}

export default Ptitdej