import classes from './RecipeCard.module.css'
import Modal from '../Modal/Modal';
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const RecipeCard = ({ title, img, id }) => {

    const [recipe, setRecipe] = useState([]) ;
    const [isShow, setIsShow] = useState(false) ;

    function clickHandler(){
        fetch("http://localhost:5001/recipe")
            .then(
                function(response){
                    return response.json()
                }
            )
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

    // const modal = (
    //     <h1>{recipe.title}</h1>
    // )


  return (
    <div className={classes.recipeCard}>
      {/* <img src={`../../images/recipe/${img}`} alt={title} className={classes.recipeImage} /> lien pour fichier */}
      <img src={`${img}`} alt={title} className={classes.recipeImage} />
      {/* lien pour url */}

      <h3 className={classes.recipeTitle}>{title}</h3>
      
        <div className={classes.buttonRecipes}>
            <div className={classes.buttonHeart}>
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