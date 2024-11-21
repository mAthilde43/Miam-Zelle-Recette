import classes from './Modal.module.css';

const Modal = ({ funcEvent, recipeData }) => {
  function isHiddenHandler() {
    funcEvent(false);
  }

  return (
    <div className={classes.modalBackdrop} onClick={isHiddenHandler}>
      <div className={classes.modalContent} onClick={(e) => e.stopPropagation()}>
        <h1>{recipeData.title}</h1>

        <div className={classes.modalScrollable}>
        <div className={classes.modalHeader}>
      <img src={recipeData.img} alt={recipeData.title} className={classes.recipeImage} />
      <div className={classes.ingredients}>
        <h2>Ingrédients :</h2>
        <ul>
          {recipeData.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </div>
    </div>

    <div className={classes.etapes}>
      <h2>Étapes de préparation :</h2>
      <ol>
        {recipeData.etapes.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>
    </div>
    </div>

        <button className={classes.buttonClose} onClick={isHiddenHandler}>FERMER</button>
      </div>
    </div>
    
  );
};

export default Modal;
