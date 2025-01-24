import Header from "../../components/Header/Header";
import { useState, useContext } from "react";
import Title from "../../components/Title/Title";
import ModalAccount from "../../components/ModalAccount/ModalAccount";
import classes from "./Seconnecter.module.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

const Seconnecter = () => {
  const [usernameLogin, setUsernameLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");
  const [name, setName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [emailAccount, setEmailAccount] = useState("");
  const [usernameAccount, setUsernameAccount] = useState("");
  const [passwordAccount, setPasswordAccount] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [subscribeToEmails, setSubscribeToEmails] = useState(false);

  const { signIn } = useContext(AuthContext);

  const navigate = useNavigate();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  //recupere user depuis localStorage
  // const getStoredUsers = () => {
  //   const users = localStorage.getItem("users");
  //   return users ? JSON.parse(users) : []; // retour vide si aucun user n'est stocke
  // };

  //save user dans localStorage
  // const saveUsersToStorage = (users) => {
  //   localStorage.setItem("users", JSON.stringify(users));
  // };

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;

    if (name === "usernameLogin") setUsernameLogin(value);
    else if (name === "passwordLogin") setPasswordLogin(value);
    else if (name === "name") setName(value);
    else if (name === "firstName") setFirstName(value);
    else if (name === "emailAccount") setEmailAccount(value);
    else if (name === "usernameAccount") setUsernameAccount(value);
    else if (name === "passwordAccount") setPasswordAccount(value);
  };

  const submitLoginHandler = async (e) => {
    e.preventDefault();
    try {
      signIn(usernameLogin, passwordLogin);
      navigate("/home");
      closeModal();
    } catch (error) {
      alert(error.message || "Une erreur est survenue");
    }
  };

  //   const users = getStoredUsers();

  // Vérifier si l'utilisateur existe
  //   const user = users.find(
  //     (u) => u.username === usernameLogin && u.password === passwordLogin
  //   );

  //   if (user) {
  //     localStorage.setItem("loggedInUser", user.username); //stoke user connecté avec bonne clé
  //     navigate("/home"); //redirige page home
  //   } else {
  //     setErrorMessage(
  //       "Compte non trouvé. Veuillez vérifier vos informations ou créer un compte."
  //     );
  //   }
  // };

  const submitAccountHandler = async (e) => {
    e.preventDefault();
    try {
      const register = await fetch("http://localhost:4008/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          name,
          firstName,
          email: emailAccount,
          username: usernameAccount,
          password: passwordAccount,
          subscribeToEmails,
        }),
      });

      if (!register.ok) {
        const error = await register.json();
        throw new Error(
          error.message || "Erreur lors de la création de compte"
        );
      }

      const data = await register.json();
      alert(data.message || "Compte créé avec succès");
      closeModal();
    } catch (error) {
      alert(error.message);
    }
  };
  //   const users = getStoredUsers();

  //   //verifie nom user si déjà utilisé
  //   const existingUser = users.find((u) => u.username === usernameAccount);
  //   if (existingUser) {
  //     alert(
  //       "Ce nom d'utilisateur est déjà pris. Veuillez en choisir un autre."
  //     );
  //     return;
  //   }

  //   //verifie email si déjà utilisé
  //   const existingEmail = users.find((u) => u.email === emailAccount);
  //   if (existingEmail) {
  //     alert(
  //       "Cette adresse mail est déjà utiliée. Veuillez en choisir une autre."
  //     );
  //     return;
  //   }

  //add new user
  // const newUser = {
  //   name,
  //   firstName,
  //   email: emailAccount,
  //   username: usernameAccount,
  //   password: passwordAccount,
  //   subscribeToEmails,
  // };

  //   users.push(newUser);
  //   saveUsersToStorage(users); //save dans localStorage
  //   alert("Compte créé avec succès !");
  //   closeModal();
  // };

  return (
    <>
      <Header />
      <div className={classes.seconnecter}>
        <div className={classes.login}>
          <Title type="h4">Se connecter</Title>
          {errorMessage && <p className={classes.error}>{errorMessage}</p>}
          <form onSubmit={submitLoginHandler}>
            <div>
              <label>Adresse mail :</label>
              <input
                type="text"
                name="usernameLogin"
                value={usernameLogin}
                placeholder="Adresse mail"
                onChange={inputChangeHandler}
              />
            </div>
            <div>
              <label>Mot de passe :</label>
              <input
                type="password"
                name="passwordLogin"
                value={passwordLogin}
                placeholder="Mot de passe"
                onChange={inputChangeHandler}
              />
            </div>
            <div className={classes.forgotPassword}>
              <a href="/passwordforgotten">Mot de passe oublié ?</a>
            </div>
            <button className={classes.buttonForm} type="Submit">
              Se connecter
            </button>
          </form>
        </div>

        <div className={classes.account}>
          <Title type="h4">Créer un compte</Title>
          <form onSubmit={submitAccountHandler}>
            <div>
              <label>Nom :</label>
              <input
                type="text"
                name="name"
                value={name}
                placeholder="Nom"
                onChange={inputChangeHandler}
              />
            </div>
            <div>
              <label>Prénom :</label>
              <input
                type="text"
                name="firstName"
                value={firstName}
                placeholder="Prénom"
                onChange={inputChangeHandler}
              />
            </div>
            <div>
              <label>Adresse mail :</label>
              <input
                type="text"
                name="emailAccount"
                value={emailAccount}
                placeholder="Adresse mail"
                onChange={inputChangeHandler}
              />
            </div>
            <div>
              <label>Nom d'utilisateur :</label>
              <input
                type="text"
                name="usernameAccount"
                value={usernameAccount}
                placeholder="Nom d'utilisateur"
                onChange={inputChangeHandler}
              />
            </div>
            <div>
              <label>Mot de passe :</label>
              <input
                type="password"
                name="passwordAccount"
                value={passwordAccount}
                placeholder="Mot de passe"
                onChange={inputChangeHandler}
              />
            </div>
            <button
              className={classes.buttonForm}
              type="button"
              onClick={openModal}
            >
              Créer un compte
            </button>
          </form>
        </div>
      </div>

      <ModalAccount
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={submitAccountHandler}
        subscribeToEmails={subscribeToEmails}
        setSubscribeToEmails={setSubscribeToEmails}
      />
    </>
  );
};

export default Seconnecter;
