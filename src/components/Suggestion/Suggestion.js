import React, { useEffect, useState } from "react";
import RecipeCard from "../RecipeCard/RecipeCard";
import classes from "./Suggestion.module.css";
import Title from "../Title/Title";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';


const Suggestion = () => {
  const [allRecipes, setAllRecipes] = useState([]);
  const [startIndex, setStartIndex] = useState(0); // Index de la 1ère recette visible

  const fetchRecipes = async () => {
    const response = await fetch("http://localhost:5001/recipe");
    const data = await response.json();
    setAllRecipes(data.sort(() => 0.5 - Math.random())); // Mélanger les recettes
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  // Avancer l'index en boucle
  const handleNext = () => {
    setStartIndex((prevIndex) => (prevIndex + 1) % allRecipes.length);
  };

  // Reculer l'index en boucle
  const handlePrev = () => {
    setStartIndex((prevIndex) => (prevIndex - 1 + allRecipes.length) % allRecipes.length);
  };

  // Calculer les 3 recettes visibles à partir de l'index actuel
  const visibleRecipes = allRecipes.slice(startIndex, startIndex + 4).concat(
    allRecipes.slice(0, Math.max(0, startIndex + 4 - allRecipes.length))
  );

  return (
    <>
    <div className={classes.suggestionContainer}>
        {/*barre horizontale*/}
        <div className={classes.horizontalBarTopSet}>
            <div className={classes.horizontalBarTop}></div>
            <div className={classes.horizontalBarTop}></div>
        </div>
        <Title type="h2">Suggestions</Title>

      <div className={classes.carouselContainer}>
        <button onClick={handlePrev} className={classes.navButton}>
          <span className={classes.arrowCircle}><FontAwesomeIcon icon={faArrowLeft}/></span>
        </button>

        <div className={classes.carousel}>
          {visibleRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              title={recipe.title}
              img={recipe.img}
              id={recipe.id}
              // Appliquer une classe spécifique pour les RecipeCard dans Suggestion
              className={classes.suggestionCard}
              imgClassName={classes.suggestionImage}
            />
          ))}
        </div>

        <button onClick={handleNext} className={classes.navButton}>
          <span className={classes.arrowCircle}><FontAwesomeIcon icon={faArrowRight}/></span>
        </button>
      </div>
      {/*barre horizontale*/}
        <div className={classes.horizontalBarBottom}>
            <div className={classes.horizontalBarBottomTop}></div>
            <div className={classes.horizontalBarBottomBottom}></div>
        </div>
        </div>
    </>
  );
};

export default Suggestion;
