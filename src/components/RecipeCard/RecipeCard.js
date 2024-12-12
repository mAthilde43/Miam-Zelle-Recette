import classes from './RecipeCard.module.css'
import Modal from '../Modal/Modal';
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const RecipeCard = ({ title, img, id, className, imgClassName }) => {

    const [recipe, setRecipe] = useState([]) ;
    const [isShow, setIsShow] = useState(false) ;
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        const isInFavorites = favorites.some((fav) => fav.id === id);
        setIsFavorite(isInFavorites); //mettre a jour l'état si recette est dans fav
    }, [id]);

    //fct pour gerer clic sur coeur
    const toggleFavorite = () => {
        let favorites = JSON.parse(localStorage.getItem('favorites')) || []; //gérer fav dans localStorage
        if (isFavorite) {
            //retirer liste des fav
            favorites = favorites.filter((fav) => fav.id !== id);
        } else {
            //ajouter liste des fav
            favorites.push({id, title, img});
        }
        localStorage.setItem('favorites', JSON.stringify(favorites)); //sauvegarder dans localStorage
        setIsFavorite((prevState) => !prevState); //mettre a jour etat local de isFavorite
    }


    function clickHandler(){
        fetch("http://localhost:5001/recipe")
            .then(
                function(response){
                    return response.json()
                }
            )
            // .then((response) => response.json())
            .then(
                function(data){
                    // console.log(data) 
                    const recette = data.find(recipe => recipe.id === id)
                    console.log(recette)
                    setRecipe(recette)
                    setIsShow(true)
                }
            )
    }

    function updateStateModal(bool){
        setIsShow(bool)
    }


  return (
    <div className={`${classes.recipeCard} ${className}`}>
      {/* <img src={`../../images/recipe/${img}`} alt={title} className={classes.recipeImage} /> lien pour fichier */}
      <img 
        src={`${img}`} 
        alt={title} 
        className={`${classes.recipeImage} ${imgClassName}`} />
      {/* lien pour url */}

      <h3 className={classes.recipeTitle}>{title}</h3>
      
        <div className={classes.buttonRecipes}>
            <div 
            // ajout classes en fct favoris
                className={`${classes.buttonHeart} ${isFavorite ? classes.favori : classes.nonFavori}`} 
                onClick={toggleFavorite}
            >
                    <FontAwesomeIcon icon={faHeart}/>
            </div>
            <div className={classes.buttonArrow} onClick={clickHandler}>
                <FontAwesomeIcon icon={faArrowRight}/>
            </div>
            {/* {isShow && <Modal funcEvent={updateStateModal}/>} */}
       
            {isShow && recipe && (
        <Modal funcEvent={updateStateModal} recipeData={recipe} />
      )}
        </div>
    </div>
  );
};

export default RecipeCard