import classes from "./Modal.module.css";
import React from "react";

const ModalTip = ({ funcEvent, tipData }) => {
  function isHiddenHandler() {
    funcEvent(false);
  }

  // Selon la catégorie, on peut adapter l'affichage si besoin
  const { category_id, title, description, image_url } = tipData;

  // Vérification basique si les données sont présentes
  const isValidTip = title && description && image_url;

  return (
    <div className={classes.modalBackdrop} onClick={isHiddenHandler}>
      <div
        className={classes.modalContent}
        onClick={(e) => e.stopPropagation()}
      >
        <h1>{isValidTip ? title : "Titre non disponible"}</h1>

        <div className={classes.modalScrollable}>
          <div className={classes.modalHeader}>
            <div className={classes.tipContainer}>
              <img
                src={isValidTip ? image_url : ""}
                alt={isValidTip ? title : "Image non disponible"}
                className={classes.tipImage}
              />
            </div>
            <div className={classes.description}>
              <h2>Description :</h2>
              <p>
                {isValidTip
                  ? // description est une chaîne ou un tableau ? Ici on suppose un tableau de lignes comme avant
                    Array.isArray(description)
                    ? description.map((line, index) => (
                        <React.Fragment key={index}>
                          {line}
                          <br />
                        </React.Fragment>
                      ))
                    : description
                  : "Description non disponible"}
              </p>
            </div>
          </div>
        </div>

        <button className={classes.buttonClose} onClick={isHiddenHandler}>
          FERMER
        </button>
      </div>
    </div>
  );
};

export default ModalTip;
