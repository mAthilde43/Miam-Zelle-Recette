import classes from './MyAccount.module.css';
import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import Title from '../../components/Title/Title';
import { useNavigate } from 'react-router-dom';

const MyAccount = () => {
    const [user, setUser] = useState(null); //etat user connecté
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
            }
        }
    }, []);

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
                        <p>Nom : {user.name}</p>
                        <p>Prénom : {user.firstName}</p>
                        <p>Nom d'utilisateur : {user.username}</p>
                        <p>Mot de passe : {user.password}</p>
                        <div className={classes.logoutSection}>
                            <button className={classes.logout} onClick={logoutHandler}>Se déconnecter</button>
                        </div>
                        <div className={classes.actions}>
                            <button className={classes.delete} onClick={deleteAccountHandler}>Supprimer mon compte</button>
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
