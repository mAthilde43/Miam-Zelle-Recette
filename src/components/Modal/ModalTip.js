import classes from './Modal.module.css';

const ModalTip = ({ funcEvent, tipData }) => {
  function isHiddenHandler() {
    funcEvent(false);
  }

  // Déterminer si les données viennent du carrousel général ou des astuces de grand-mère
  const isWineTip = tipData.title && tipData.description && tipData.image;

  return (
    <div className={classes.modalBackdrop} onClick={isHiddenHandler}>
      <div className={classes.modalContent} onClick={(e) => e.stopPropagation()}>
        <h1>{isWineTip ? tipData.title : tipData.titleGM}</h1>

        <div className={classes.modalScrollable}>
          <div className={classes.modalHeader}>
            <div className={classes.tipContainer}>
              <img
                src={isWineTip ? tipData.image : tipData.imageGM}
                alt={isWineTip ? tipData.title : tipData.titleGM}
                className={classes.tipImage}
              />
            </div>
            <div className={classes.description}>
              <h2>Description :</h2>
              <p>{isWineTip ? tipData.description : tipData.descriptionGM}</p>
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