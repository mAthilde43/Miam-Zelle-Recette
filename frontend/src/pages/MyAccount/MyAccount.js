import classes from "./MyAccount.module.css";
import { Document, Packer, Paragraph, TextRun, AlignmentType } from "docx";
import React, { useState, useEffect, useContext } from "react";
import Header from "../../components/Header/Header";
import Title from "../../components/Title/Title";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faPen,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../../contexts/AuthContext";

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
  const { token } = useContext(AuthContext);

  //recuperer user connecté depuis LocalStorage
  useEffect(() => {
    (async function () {
      try {
        console.log(token);
        const informations = await fetch("http://localhost:4008/auth/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        });
        const userData = await informations.json();

        console.log(userData);

        setUser(userData);
      } catch (error) {
        alert(error.message);
      }
    })();

    // };

    // const storedUsers = localStorage.getItem("users");
    // const storedUser = localStorage.getItem("loggedInUser");

    // if (storedUsers && storedUser) {
    //   const users = JSON.parse(storedUsers);
    //   const currentUser = users.find((u) => u.username === storedUser);
    //   if (currentUser) {
    //     setUser(currentUser);
    //     setEditedUser(currentUser); //initialise etat pour edit
    //   }
    // }
  }, []);

  //gerer les changements d'entrée
  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({ ...prev, [name]: value }));
  };

  //save les modifications
  const saveChangesHandler = (field) => {
    const updatedData = { ...user, [field]: editedUser[field] };
    setIsEditing((prev) => ({ ...prev, [field]: false }));
    updateAccountHandler(user.id, updatedData);
  };
  // const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
  // const updatedUsers = storedUsers.map((u) =>
  //   u.username === user.username ? { ...user, ...editedUser } : u
  // );
  // localStorage.setItem("users", JSON.stringify(updatedUsers));
  // setUser(editedUser); //MAJ etat user
  // setIsEditing((prev) => ({ ...prev, [field]: false })); //desactiver edition

  //basculer la visibilité du password
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  //se déconnecter
  const logoutHandler = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/seconnecter"); //rediriger page connexion
  };

  //mettre a jour les informations
  const updateAccountHandler = async (userId, updatedData) => {
    try {
      const response = await fetch(`http://localhost:4008/auth/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        console.log(updatedData);
        // alert("Compte mis à jour avec succès");
        setUser(updatedUser);
        setEditedUser(updatedUser);
      } else {
        const errorData = await response.json();
        alert(errorData.message);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  //supprimer compte
  const deleteAccountHandler = async (userId) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer votre compte ?")) {
      try {
        console.log(userId);
        const response = await fetch(`http://localhost:4008/auth/${userId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        });

        if (response.ok) {
          alert("Compte supprimé avec succès.");
          navigate("/seconnecter");
        } else {
          const errorData = await response.json();
          alert(errorData.message || "Une erreur est survenue.");
        }
      } catch (error) {
        alert(error.message);
      }
    }
  };

  // if (window.confirm("Êtes-vous sûr de vouloir supprimer votre compte ?")) {
  //   const storedUsers = localStorage.getItem("users");
  //   if (storedUsers) {
  //     const users = JSON.parse(storedUsers);
  //     const updatedUsers = users.filter((u) => u.username !== user.username);
  //     localStorage.setItem("users", JSON.stringify(updatedUsers));
  //   }
  //   localStorage.removeItem("loggedInUser");
  //   alert("Compte supprimé avec succès.");
  //       navigate("/seconnecter"); //redirection après suppression compte
  //     }
  // }

  //fonction pour générer le fichier Word
  const generateWordFile = () => {
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({
                  text: "Mes Données Utilisateur",
                  bold: true,
                  size: 32,
                }),
              ],
            }),
            new Paragraph({
              children: [new TextRun(`Nom : ${user.name}`)],
            }),
            new Paragraph({
              children: [new TextRun(`Prénom : ${user.firstName}`)],
            }),
            new Paragraph({
              children: [new TextRun(`Email : ${user.email}`)],
            }),
            new Paragraph({
              children: [new TextRun(`Nom d'utilisateur : ${user.username}`)],
            }),
          ],
        },
      ],
    });

    Packer.toBlob(doc).then((blob) => {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "user_data.docx"; // Nom du fichier téléchargé
      link.click();
    });
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
              Nom :
              {isEditing.name ? (
                <>
                  <input
                    type="text"
                    name="name"
                    value={editedUser.name}
                    onChange={inputChangeHandler}
                  />
                  <button onClick={() => saveChangesHandler("name")}>
                    <FontAwesomeIcon
                      className={classes.iconStyle}
                      icon={faCheck}
                    />
                  </button>
                </>
              ) : (
                <>
                  {user.name}

                  <button
                    onClick={() =>
                      setIsEditing((prev) => ({ ...prev, name: true }))
                    }
                  >
                    <FontAwesomeIcon
                      className={classes.iconStyle}
                      icon={faPen}
                    />
                  </button>
                </>
              )}
            </p>

            {/* Prénom */}
            <p>
              Prénom :
              {isEditing.firstName ? (
                <>
                  <input
                    type="text"
                    name="firstName"
                    value={editedUser.firstName}
                    onChange={inputChangeHandler}
                  />
                  <button onClick={() => saveChangesHandler("firstName")}>
                    <FontAwesomeIcon
                      className={classes.iconStyle}
                      icon={faCheck}
                    />
                  </button>
                </>
              ) : (
                <>
                  {user.firstName}

                  <button
                    onClick={() =>
                      setIsEditing((prev) => ({ ...prev, firstName: true }))
                    }
                  >
                    <FontAwesomeIcon
                      className={classes.iconStyle}
                      icon={faPen}
                    />
                  </button>
                </>
              )}
            </p>

            {/* Email */}
            <p>
              Email :
              {isEditing.email ? (
                <>
                  <input
                    type="text"
                    name="email"
                    value={editedUser.email}
                    onChange={inputChangeHandler}
                  />
                  <button onClick={() => saveChangesHandler("email")}>
                    <FontAwesomeIcon
                      className={classes.iconStyle}
                      icon={faCheck}
                    />
                  </button>
                </>
              ) : (
                <>
                  {user.email}
                  <button
                    onClick={() =>
                      setIsEditing((prev) => ({ ...prev, email: true }))
                    }
                  >
                    <FontAwesomeIcon
                      className={classes.iconStyle}
                      icon={faPen}
                    />
                  </button>
                </>
              )}
            </p>

            {/* Nom d'utilisateur */}
            <p>
              Nom d'utilisateur :
              {isEditing.username ? (
                <>
                  <input
                    type="text"
                    name="username"
                    value={editedUser.username}
                    onChange={inputChangeHandler}
                  />
                  <button onClick={() => saveChangesHandler("username")}>
                    <FontAwesomeIcon
                      className={classes.iconStyle}
                      icon={faCheck}
                    />
                  </button>
                </>
              ) : (
                <>
                  {user.username}

                  <button
                    onClick={() =>
                      setIsEditing((prev) => ({ ...prev, username: true }))
                    }
                  >
                    <FontAwesomeIcon
                      className={classes.iconStyle}
                      icon={faPen}
                    />
                  </button>
                </>
              )}
            </p>

            {/* Mot de passe */}
            <p>
              Mot de passe :
              {isEditing.password ? (
                <>
                  <input
                    type="text"
                    name="password"
                    value={editedUser.password}
                    onChange={inputChangeHandler}
                  />
                  <button onClick={() => saveChangesHandler("password")}>
                    <FontAwesomeIcon
                      className={classes.iconStyle}
                      icon={faCheck}
                    />
                  </button>
                </>
              ) : (
                <>
                  {showPassword ? user.password : "••••••••"}
                  <button
                    className={classes.iconStyleButton}
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <FontAwesomeIcon icon={faEyeSlash} />
                    ) : (
                      <FontAwesomeIcon icon={faEye} />
                    )}
                  </button>
                  <button
                    onClick={() =>
                      setIsEditing((prev) => ({ ...prev, password: true }))
                    }
                  >
                    <FontAwesomeIcon
                      className={classes.iconStyle}
                      icon={faPen}
                    />
                  </button>
                </>
              )}
            </p>

            <div className={classes.buttonSection}>
              <div className={classes.buttonGroup}>
                <button
                  className={classes.logoutButton}
                  onClick={logoutHandler}
                >
                  Se déconnecter
                </button>
                <button
                  className={classes.deleteButton}
                  onClick={() => deleteAccountHandler(user.id)}
                >
                  Supprimer mon compte
                </button>
              </div>
              <button
                className={classes.dowloadButton}
                onClick={generateWordFile}
              >
                Extraire mes données
              </button>
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
