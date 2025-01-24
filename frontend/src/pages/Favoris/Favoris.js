import classes from "./Favoris.module.css";
import Title from "../../components/Title/Title";
import React, { useState, useEffect } from "react";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import Header from "../../components/Header/Header";

const Favoris = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Récupérer les favoris depuis le localStorage
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  return (
    <>
      <Header />
      <div className={classes.favoris}>
        <Title type="h1">Mes favoris</Title>
        <div className={classes.listfavori}>
          {favorites.length > 0 ? (
            favorites.map((fav) => (
              <RecipeCard key={fav.id} {...fav} /> // Afficher chaque recette favorite
            ))
          ) : (
            <p>Aucun favori n'a été ajouté...</p>
          )}
        </div>
      </div>{" "}
    </>
  );
};

export default Favoris;
