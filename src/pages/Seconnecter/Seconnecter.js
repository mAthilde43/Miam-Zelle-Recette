import Header from "../../components/Header/Header"
import { useState } from 'react';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEye } from "@fortawesome/free-regular-svg-icons";
import Title from "../../components/Title/Title";
import classes from './Seconnecter.module.css'

const Seconnecter = () => {

    const [usernameLogin, setUsernameLogin] = useState("");
    const [passwordLogin, setPasswordLogin] = useState("");
    const [name, setName ] = useState("");
    const [firstName, setFirstName ] = useState("");
    const [usernameAccount, setUsernameAccount] = useState("");
    const [passwordAccount, setPasswordAccount] = useState("");


    // const inputUserNameLoginHandler = (e) => {
    //     setUsernameLogin(e.target.value);
    // }

    // const inputPasswordLoginHandler = (e) => {
    //     setPasswordLogin(e.target.value);
    // }

    // const inputNameHandler = (e) => {
    //     setName(e.target.value);
    // }

    // const inputFirstNameHandler = (e) => {
    //     setFirstName(e.target.value);
    // }

    // const inputUserNameAccountHandler = (e) => {
    //     setUsernameAccount(e.target.value);
    // }

    // const inputPasswordAccountHandler = (e) => {
    //     setPasswordAccount(e.target.value);
    // }

    const inputChangeHandler = (e) => {
        const { name, value } = e.target;

        if (name === "usernameLogin") setUsernameLogin(value);
        else if (name === "passwordLogin") setPasswordLogin(value);
        else if (name === "name") setName(value);
        else if (name === "firstName") setFirstName(value);
        else if (name === "usernameAccount") setUsernameAccount(value);
        else if (name === "passwordAccount") setPasswordAccount(value);
    };


    const submitLoginHandler =(e) => {
        e.preventDefault();
        console.log("Nom d'utilisateur soumis :", usernameLogin);
        console.log("Mot de passe soumis :", passwordLogin);
    };

    const submitAccountHandler =(e) => {
        e.preventDefault(); 
        console.log("Nom soumis :", name);
        console.log("Prénom soumis :", firstName);
        console.log("Nom d'utilisateur soumis :", usernameAccount);
        console.log("Mot de passe soumis :", passwordAccount);
    }
    return (
        <> <Header/>
<div className={classes.seconnecter}>
        <div className={classes.login} >
        <Title type="h4">Se connecter</Title>
        
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
                    {/* <p>Nom d'utilisateur saisi : {usernameLogin}</p> */}
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
                    {/* <p>Mot de passe saisi : {passwordLogin}</p> */}
                 </div>
             <button className={classes.buttonForm} type='Submit'>Se connecter</button>
            </form>
        </div>

        <div  className={classes.account}>
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
                    {/* <p>Nom d'utilisateur saisi : {username}</p> */}
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
                    {/* <p>Nom d'utilisateur saisi : {username}</p> */}
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
                    {/* <p>Nom d'utilisateur saisi : {username}</p> */}
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
                    {/* <p>Mot de passe saisi : {password}</p> */}
                 </div>
             <button className={classes.buttonForm} type='Submit'>Créer un compte</button>
            </form>
        </div>
        </div>

   
        </>
        
    );
};

export default Seconnecter