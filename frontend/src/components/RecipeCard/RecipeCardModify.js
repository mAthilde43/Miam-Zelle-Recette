import classes from "./RecipeCard.module.css";
import Modal from "../Modal/Modal";
import ModalModify from "../ModalModify/ModalModify";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faHeart,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons"; // Ajout de faEdit

const RecipeCard = ({ title, img, id, className, imgClassName }) => {
  const [recipe, setRecipe] = useState([]);
  const [isShow, setIsShow] = useState(false);
  const [isModifyShow, setIsModifyShow] = useState(false); // Nouvel état pour la modal de modification
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const isInFavorites = favorites.some((fav) => fav.id === id);
    setIsFavorite(isInFavorites);
  }, [id]);

  const toggleFavorite = () => {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (isFavorite) {
      favorites = favorites.filter((fav) => fav.id !== id);
    } else {
      favorites.push({ id, title, img });
    }
    localStorage.setItem("favorites", JSON.stringify(favorites));
    setIsFavorite((prevState) => !prevState);
  };

  function clickHandler() {
    fetch("http://localhost:5001/recipe")
      .then((response) => response.json())
      .then((data) => {
        const recette = data.find((recipe) => recipe.id === id);
        setRecipe(recette);
        setIsShow(true);
      });
  }

  function modifyHandler() {
    fetch("http://localhost:5001/recipe")
      .then((response) => response.json())
      .then((data) => {
        const recette = data.find((recipe) => recipe.id === id);
        setRecipe(recette);
        setIsModifyShow(true); // Ouvrir la modal de modification
      });
  }

  function deleteHandler() {
    fetch(`http://localhost:5001/recipe/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setRecipe(null);
        alert("Recette supprimée avec succès");
      })
      .catch((error) => {
        console.error("Erreur lors de la suppression :", error);
      });
  }

  function updateStateModal(bool) {
    setIsShow(bool);
  }

  function updateStateModifyModal(bool) {
    setIsModifyShow(bool);
  }

  return (
    <div className={`${classes.recipeCard} ${className}`}>
      <img
        src={`${img}`}
        alt={title}
        className={`${classes.recipeImage} ${imgClassName}`}
      />
      <h3 className={classes.recipeTitle}>{title}</h3>

      <div className={classes.buttonRecipes}>
        <div
          className={`${classes.buttonHeart} ${
            isFavorite ? classes.favori : classes.nonFavori
          }`}
          onClick={toggleFavorite}
        >
          <FontAwesomeIcon icon={faHeart} />
        </div>
        <div className={classes.buttonArrow} onClick={clickHandler}>
          <FontAwesomeIcon icon={faArrowRight} />
        </div>
        <div className={classes.buttonEdit} onClick={modifyHandler}>
          <FontAwesomeIcon icon={faEdit} />
        </div>
        <div className={classes.buttonDelete} onClick={deleteHandler}>
          <FontAwesomeIcon icon={faTrash} />
        </div>
      </div>

      {isShow && recipe && (
        <Modal funcEvent={updateStateModal} recipeData={recipe} />
      )}
      {isModifyShow && recipe && (
        <ModalModify funcEvent={updateStateModifyModal} recipeData={recipe} />
      )}
    </div>
  );
};

export default RecipeCard;
