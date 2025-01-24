import RecipeCard from "../../components/RecipeCard/RecipeCard"; // Assurez-vous que ce composant existe
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import classes from "./SearchResults.module.css";
import Title from "../../components/Title/Title";
import Header from "../../components/Header/Header";
const SearchResults = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const searchQuery = queryParams.get("query") || "";

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch("http://localhost:5001/recipe");
        if (!response.ok) {
          throw new Error("Erreur de réseau");
        }
        const data = await response.json();

        // Filtrer les recettes en fonction du mot-clé dans le titre
        const filteredRecipes = data.filter((recipe) =>
          recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setRecipes(filteredRecipes);
      } catch (err) {
        setError("Erreur lors du chargement des recettes.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [searchQuery]);

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <Header />
      <div className={classes.searchresults}>
        <Title type="h1">Résultats de recherche pour "{searchQuery}"</Title>

        <div className={classes.recipecard}>
          {recipes.length === 0 ? (
            <p>Aucune recette trouvée...</p>
          ) : (
            recipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                title={recipe.title}
                img={recipe.img}
                id={recipe.id}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default SearchResults;
