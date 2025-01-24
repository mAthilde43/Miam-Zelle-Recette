import React from "react";
import classes from "./Mentions.module.css";
import Title from "../../components/Title/Title";

const Mentions = () => {
  return (
    <div className={classes.mention}>
      <h1>Mentions Légales</h1>

      <section>
        <h2>Identité du propriétaire du site</h2>
        <p>
          <strong>Nom :</strong> [Votre nom ou celui de votre entreprise]
        </p>
        <p>
          <strong>Adresse :</strong> [Votre adresse postale]
        </p>
        <p>
          <strong>Contact :</strong> [Votre email de contact]
        </p>
      </section>

      <section>
        <h2>Numéro d'identification</h2>
        <p>
          <strong>SIRET :</strong> [Votre numéro SIRET, si applicable]
        </p>
      </section>

      <section>
        <h2>Directeur de la publication</h2>
        <p>[Votre nom ou celui du responsable légal du site]</p>
      </section>

      <section>
        <h2>Coordonnées de l'hébergeur du site</h2>
        <p>
          <strong>Hébergeur :</strong> [Nom de l’hébergeur]
        </p>
        <p>
          <strong>Adresse :</strong> [Adresse complète de l’hébergeur]
        </p>
        <p>
          <strong>Contact :</strong> [Téléphone ou email de l’hébergeur]
        </p>
      </section>

      <section>
        <h2>Informations sur la propriété intellectuelle</h2>
        <p>
          Le contenu du site <strong>Miam’Zelle Recettes</strong> (textes,
          recettes, images, logos, vidéos, etc.) est protégé par les lois en
          vigueur sur la propriété intellectuelle. Toute reproduction,
          modification, ou diffusion des éléments du site sans autorisation
          préalable est interdite.
        </p>
      </section>

      <section>
        <h2>Politique de confidentialité</h2>
        <h3>Type de données collectées</h3>
        <p>- Données personnelles : nom d'utilisateur, adresse email.</p>
        <p>
          - Données de navigation : historique des recettes consultées et
          favorites.
        </p>

        <h3>Finalité de la collecte des données</h3>
        <p>
          - Amélioration des services proposés (connexion, ajout de recettes,
          gestion des favoris).
        </p>

        <h3>Durée de conservation des données</h3>
        <p>
          Les données personnelles sont conservées pendant 5 ans après la
          dernière activité de l’utilisateur sur le site.
        </p>

        <h3>Droits des utilisateurs</h3>
        <p>
          Conformément au RGPD, les utilisateurs disposent des droits suivants :
          <ul>
            <li>
              <strong>Accès :</strong> obtenir une copie des données les
              concernant.
            </li>
            <li>
              <strong>Rectification :</strong> corriger les données erronées ou
              incomplètes.
            </li>
            <li>
              <strong>Suppression :</strong> demander la suppression de leurs
              données personnelles.
            </li>
          </ul>
        </p>
        <p>
          <strong>Contact pour exercer ces droits :</strong> [Votre email dédié
          à la confidentialité]
        </p>
      </section>

      <section>
        <h2>Conditions Générales d'Utilisation (CGU)</h2>
        <h3>Règles d'utilisation du site</h3>
        <p>
          Les utilisateurs doivent respecter les règles de bienséance et éviter
          tout contenu illicite lors de l’ajout de recettes.
        </p>

        <h3>Responsabilités</h3>
        <p>
          <strong>Utilisateur :</strong> responsable des recettes ajoutées et
          des commentaires.
        </p>
        <p>
          <strong>Propriétaire :</strong> décline toute responsabilité en cas
          d’utilisation incorrecte ou illégale des contenus du site.
        </p>
      </section>

      <section>
        <h2>Limitation de responsabilité</h2>
        <p>
          Le propriétaire ne peut être tenu responsable des erreurs ou omissions
          présentes sur le site ou des conséquences liées à l’utilisation des
          recettes proposées.
        </p>
      </section>

      <section>
        <h2>Loi applicable et juridiction compétente</h2>
        <p>
          Les présentes mentions sont régies par la loi française. En cas de
          litige, les tribunaux compétents sont ceux de [votre région].
        </p>
      </section>

      <section>
        <h2>Politique de Cookies</h2>
        <h3>Consentement des utilisateurs</h3>
        <p>
          En naviguant sur <strong>Miam'Zelle Recettes</strong>, vous acceptez
          l’utilisation de cookies pour :
          <ul>
            <li>Faciliter votre navigation.</li>
            <li>Analyser les performances du site.</li>
          </ul>
        </p>

        <h3>Gestion des cookies</h3>
        <p>
          Vous pouvez configurer votre navigateur pour refuser ou supprimer les
          cookies à tout moment via les paramètres de votre navigateur.
        </p>
      </section>

      <div className={classes.returnhome}>
        <a href="/home">Retour à la page d'accueil</a>
      </div>
    </div>
  );
};

export default Mentions;
