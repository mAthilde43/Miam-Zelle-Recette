import classes from "./SlideRecipe.module.css";
import RecipeCard from "../RecipeCard/RecipeCard";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const SlideRecipe = ({ recipes }) => {
  const [startIndex, setStartIndex] = useState(0); //index de la 1ere recette visible

  //avancer l'index en boucle
  const handleNext = () => {
    setStartIndex((prevIndex) => (prevIndex + 1) % recipes.length);
  };

  //reculer l'index en boucle
  const handlePrev = () => {
    setStartIndex(
      (prevIndex) => (prevIndex - 1 + recipes.length) % recipes.length
    );
  };

  //calculer les 4 recetets visibles à partir de l'index actuel
  const visibleRecipes = recipes
    .slice(startIndex, startIndex + 4)
    .concat(recipes.slice(0, Math.max(0, startIndex + 4 - recipes.length)));

  return (
    <div className={classes["slide-container"]}>
      <button onClick={handlePrev} className={classes.navButton}>
        <span className={classes.arrowCircle}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </span>
      </button>
      <div className={classes.carousel}>
        {visibleRecipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            title={recipe.title}
            img={recipe.img}
            id={recipe.id}
          />
        ))}
      </div>
      <button onClick={handleNext} className={classes.navButton}>
        <span className={classes.arrowCircle}>
          <FontAwesomeIcon icon={faArrowRight} />
        </span>
      </button>
    </div>
  );
};

export default SlideRecipe;
