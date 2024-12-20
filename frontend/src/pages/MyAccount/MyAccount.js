import classes from './MyAccount.module.css';
import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import Title from '../../components/Title/Title';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

const MyAccount = () => {
    const [user, setUser] = useState(null); //etat user connecté
    const [isEditing, setIsEditing] = useState({
        name: false,
        firstName: false,
        email: false,
        username: false,
        password: false,
    });
    const [showPassword, setShowPassword] = useState(false);
    const [editedUser, setEditedUser] = useState({});
    const navigate = useNavigate();

    //recuperer user connecté depuis LocalStorage
    useEffect(() => {
        const storedUsers = localStorage.getItem('users');
        const storedUser = localStorage.getItem('loggedInUser'); 

        if (storedUsers && storedUser) {
            const users = JSON.parse(storedUsers);
            const currentUser = users.find((u) => u.username === storedUser);
            if (currentUser) {
                setUser(currentUser);
                setEditedUser(currentUser); //initialise etat pour edit
            }
        }
    }, []);

    //gerer les changements d'entrée
    const inputChangeHandler = (e) => {
        const { name, value } = e.target;
        setEditedUser((prev) => ({ ...prev, [name]: value }));
    };

    //save les modifications
    const saveChangesHandler = (field) => {
        const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
        const updatedUsers = storedUsers.map((u) =>
        u.username === user.username ? { ...user, ...editedUser } : u
    );
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setUser(editedUser); //MAJ etat user
    setIsEditing((prev) => ({ ...prev, [field]: false })); //desactiver edition
    };

    //basculer la visibilité du password
    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    //se déconnecter
    const logoutHandler = () => {
        localStorage.removeItem('loggedInUser');
        navigate('/seconnecter'); //rediriger page connexion
    };

    //supprimer compte
    const deleteAccountHandler = () => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer votre compte ?')) {
            const storedUsers = localStorage.getItem('users');
            if (storedUsers) {
                const users = JSON.parse(storedUsers);
                const updatedUsers = users.filter((u) => u.username !== user.username);
                localStorage.setItem('users', JSON.stringify(updatedUsers));
            }
            localStorage.removeItem('loggedInUser');
            alert('Compte supprimé avec succès.');
            navigate('/seconnecter'); //redirection après suppression compte 
        }
    };

    return (
        <>
            <Header />
            <div className={classes.myAccount}>
                <Title type="h1">Mon compte</Title>
                {user ? (
                    <div className={classes.userInfo}>
                        {/* Nom */}
                        <p>
                            Nom : {''}
                            {isEditing.name ? (
                                <>
                                <input
                                    type="text"
                                    name="name"
                                    value={editedUser.name}
                                    onChange={inputChangeHandler}
                                />
                                <button onClick={() => saveChangesHandler('name')}><FontAwesomeIcon className={classes.iconStyle} icon={faCheck}/></button>
                                </>
                            ) : (
                                <>
                                {user.name}{''}
                                <button onClick={() => setIsEditing((prev) => ({ ...prev, name : true }))}>
                                    <FontAwesomeIcon className={classes.iconStyle} icon={faPen}/>
                                </button>
                                </>
                            )} </p>

                            {/* Prénom */}
                            <p>
                            Prénom : {''}
                            {isEditing.firstName ? (
                                <>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={editedUser.firstName}
                                    onChange={inputChangeHandler}
                                />
                                <button onClick={() => saveChangesHandler('firstName')}><FontAwesomeIcon className={classes.iconStyle} icon={faCheck}/></button>
                                </>
                            ) : (
                                <>
                                {user.firstName}{''}
                                <button onClick={() => setIsEditing((prev) => ({ ...prev, firstName : true }))}>
                                    <FontAwesomeIcon className={classes.iconStyle} icon={faPen}/>
                                </button>
                                </>
                            )} </p>

                            {/* Email */}
                            <p>
                            Email : {''}
                            {isEditing.email ? (
                                <>
                                <input
                                    type="text"
                                    name="email"
                                    value={editedUser.email}
                                    onChange={inputChangeHandler}
                                />
                                <button onClick={() => saveChangesHandler('email')}><FontAwesomeIcon className={classes.iconStyle} icon={faCheck}/></button>
                                </>
                            ) : (
                                <>
                                    {user.email}
                                    <button onClick={() => setIsEditing((prev) => ({ ...prev, email: true }))}>
                                        <FontAwesomeIcon className={classes.iconStyle} icon={faPen} />
                                    </button>
                                </>
                            )}
                        </p>


                            {/* Nom d'utilisateur */}
                            <p>
                            Nom d'utilisateur : {''}
                            {isEditing.username ? (
                                <>
                                <input
                                    type="text"
                                    name="username"
                                    value={editedUser.username}
                                    onChange={inputChangeHandler}
                                />
                                <button onClick={() => saveChangesHandler('username')}><FontAwesomeIcon className={classes.iconStyle} icon={faCheck}/></button>
                                </>
                            ) : (
                                <>
                                {user.username}{''}
                                <button onClick={() => setIsEditing((prev) => ({ ...prev, username : true }))}>
                                    <FontAwesomeIcon className={classes.iconStyle} icon={faPen}/>
                                </button>
                                </>
                            )} </p>

                            {/* Mot de passe */}
                            <p>
                            Mot de passe : {''}
                            {isEditing.password ? (
                                <>
                                <input
                                    type="text"
                                    name="password"
                                    value={editedUser.password}
                                    onChange={inputChangeHandler}
                                />
                                <button onClick={() => saveChangesHandler('password')}><FontAwesomeIcon className={classes.iconStyle} icon={faCheck}/></button>
                                </>
                            ) : (
                                <>
                                {showPassword ? user.password : '••••••••'}
                                <button className={classes.iconStyleButton} onClick={togglePasswordVisibility}>
                                    {showPassword ? <FontAwesomeIcon icon={faEyeSlash}/> : <FontAwesomeIcon icon={faEye}/>}
                                </button>
                                <button onClick={() => setIsEditing((prev) => ({ ...prev, password : true }))}>
                                <FontAwesomeIcon className={classes.iconStyle} icon={faPen}/>
                                </button>
                                </>
                            )} </p>

                        <div className={classes.buttonSection}>
                            <button className={classes.logoutButton} onClick={logoutHandler}>Se déconnecter</button>
                            <button className={classes.deleteButton} onClick={deleteAccountHandler}>Supprimer mon compte</button>
                        </div>
                        
                    </div>
                ) : (
                    <p>Aucun utilisateur connecté</p> //message si aucun user connecté
                )}
            </div>
        </>
    );
};

export default MyAccount;
