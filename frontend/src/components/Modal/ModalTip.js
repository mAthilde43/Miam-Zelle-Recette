import classes from "./Modal.module.css";
import React from "react";

const ModalTip = ({ funcEvent, tipData, isWine }) => {
  function isHiddenHandler() {
    funcEvent(false);
  }

  // Déterminer si les données viennent du carrousel général ou des astuces de grand-mère
  const isWineTip = tipData.title && tipData.description && tipData.image;
  const isGmTip = tipData.titleGM && tipData.descriptionGM && tipData.imageGM;
  const isBreadTip =
    tipData.titleBread && tipData.descriptionBread && tipData.imageBread;
  const isBiereTip =
    tipData.titleBiere && tipData.descriptionBiere && tipData.imageBiere;

  return (
    <div className={classes.modalBackdrop} onClick={isHiddenHandler}>
      <div
        className={classes.modalContent}
        onClick={(e) => e.stopPropagation()}
      >
        <h1>
          {isWineTip
            ? tipData.title
            : isBreadTip
            ? tipData.titleBread
            : isBiereTip
            ? tipData.titleBiere
            : isGmTip
            ? tipData.titleGM
            : "Titre non disponible "}
        </h1>

        <div className={classes.modalScrollable}>
          <div className={classes.modalHeader}>
            <div className={classes.tipContainer}>
              <img
                src={
                  isWineTip
                    ? tipData.image
                    : isBreadTip
                    ? tipData.imageBread
                    : isBiereTip
                    ? tipData.imageBiere
                    : isGmTip
                    ? tipData.imageGM
                    : ""
                }
                alt={
                  isWineTip
                    ? tipData.title
                    : isBreadTip
                    ? tipData.titleBread
                    : isBiereTip
                    ? tipData.titleBiere
                    : isGmTip
                    ? tipData.titleGM
                    : "Image non disponible"
                }
                className={classes.tipImage}
              />
            </div>
            <div className={classes.description}>
              <h2>Description :</h2>
              <p>
                {(isWineTip
                  ? tipData.description
                  : isBreadTip
                  ? tipData.descriptionBread
                  : isBiereTip
                  ? tipData.descriptionBiere
                  : isGmTip
                  ? tipData.descriptionGM
                  : "Description non disponible"
                ).map((line, index) => (
                  <React.Fragment key={index}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
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
