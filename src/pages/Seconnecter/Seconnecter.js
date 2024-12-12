import Header from "../../components/Header/Header";
import { useState } from "react";
import Title from "../../components/Title/Title";
import classes from "./Seconnecter.module.css";
import { useNavigate } from "react-router-dom";

const Seconnecter = () => {
  const [usernameLogin, setUsernameLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");
  const [name, setName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [usernameAccount, setUsernameAccount] = useState("");
  const [passwordAccount, setPasswordAccount] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  //recupere user depuis localStorage
  const getStoredUsers = () => {
    const users = localStorage.getItem("users");
    return users ? JSON.parse(users) : []; // retour vide si aucun user n'est stocke
  };

  //save user dans localStorage
  const saveUsersToStorage = (users) => {
    localStorage.setItem("users", JSON.stringify(users));
  };

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;

    if (name === "usernameLogin") setUsernameLogin(value);
    else if (name === "passwordLogin") setPasswordLogin(value);
    else if (name === "name") setName(value);
    else if (name === "firstName") setFirstName(value);
    else if (name === "usernameAccount") setUsernameAccount(value);
    else if (name === "passwordAccount") setPasswordAccount(value);
  };

  const submitLoginHandler = (e) => {
    e.preventDefault();
    const users = getStoredUsers();

    // Vérifier si l'utilisateur existe
    const user = users.find(
      (u) => u.username === usernameLogin && u.password === passwordLogin
    );

    if (user) {
      localStorage.setItem("loggedInUser", user.username); //stoke user connecté avec bonne clé
      navigate("/home"); //redirige page home
    } else {
      setErrorMessage(
        "Compte non trouvé. Veuillez vérifier vos informations ou créer un compte."
      );
    }
  };

  const submitAccountHandler = (e) => {
    e.preventDefault();
    const users = getStoredUsers();

    //verifie nom user si déjà utilisé
    const existingUser = users.find((u) => u.username === usernameAccount);
    if (existingUser) {
      alert("Ce nom d'utilisateur est déjà pris. Veuillez en choisir un autre.");
      return;
    }

    //add new user
    const newUser = {
      name,
      firstName,
      username: usernameAccount,
      password: passwordAccount,
    };

    users.push(newUser);
    saveUsersToStorage(users); //save dans localStorage
    alert("Compte créé avec succès !");
  };

  return (
    <>
      <Header />
      <div className={classes.seconnecter}>
        <div className={classes.login}>
          <Title type="h4">Se connecter</Title>
          {errorMessage && <p className={classes.error}>{errorMessage}</p>}
          <form onSubmit={submitLoginHandler}>
            <div>
              <label>Nom d'utilisateur :</label>
              <input
                type="text"
                name="usernameLogin"
                value={usernameLogin}
                placeholder="Nom d'utilisateur"
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
            <button className={classes.buttonForm} type="Submit">
              Créer un compte
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Seconnecter;
