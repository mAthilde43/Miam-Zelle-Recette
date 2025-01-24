import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Title from "../../components/Title/Title";
import classes from "../PasswordForgotten/PasswordForgotten.module.css";

const PasswordForgotten = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5001/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setMessage("Un e-mail de réinitialisation a été envoyé.");
        setTimeout(() => navigate("/seconnecter"), 3000); // Redirection après 3 secondes
      } else {
        throw new Error("E-mail non trouvé.");
      }
    } catch (error) {
      setMessage(error.message || "Une erreur est survenue.");
    }
  };

  return (
    <>
      <div className={classes.password}>
        <Title type="h1">Mot de passe oublié</Title>
        <p>
          Renseignez votre adresse e-mail et nous vous enverrons un lien pour
          réinitialiser votre mot de passe
        </p>
        <form onSubmit={handleSubmit}>
          <div className={classes.email}>
            <label>E-mail </label> <br />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@gmail.com"
              required
            />
          </div>
          <button className={classes.reinitialize} type="submit">
            Réinitialiser le mot de passe
          </button>
        </form>
        <div className={classes.returnconnexion}>
          <a href="/seconnecter">Retour à la connexion</a>
        </div>
        {message && <p>{message}</p>}
      </div>
    </>
  );
};

export default PasswordForgotten;
