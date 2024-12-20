import React from "react";
import classes from "./ModalAccount.module.css";

const ModalAccount = ({
  isOpen,
  onClose,
  onSubmit,
  subscribeToEmails,
  setSubscribeToEmails,
}) => {
  if (!isOpen) return null; // Si la modal n'est pas ouverte, on ne retourne rien.

  return (
    <div className={classes.modal}>
      <div className={classes.modalContent}>
        <h2>Mentions et choix</h2>
        <p>
          En cochant cette case, vous acceptez de recevoir par email les
          nouvelles recettes ajoutées.
        </p>
        <div>
          <input
            type="checkbox"
            id="subscribeEmails"
            checked={subscribeToEmails}
            onChange={() => setSubscribeToEmails(!subscribeToEmails)}
          />
          <label htmlFor="subscribeEmails">Recevoir des emails</label>
        </div>
        <div className={classes.actions}>
          <button onClick={onSubmit} className={classes.modalButton}>
            Créer un compte
          </button>
          <button onClick={onClose} className={classes.modalButton}>
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalAccount;
