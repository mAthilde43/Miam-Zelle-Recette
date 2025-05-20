# Guide de déploiement

## 1. Introduction

### Présentation de l'application

L'application "Miam'Zelle Recette" est une plateforme web destinée aux passionnés de cuisine.

Elle permet aux utilisateurs de consulter, d'ajouter des recettes culinaires et d'ajouter en favoris des recettes.

Conçues en React.js pour le front-end, avec un backend en Node.js / Express et une base de données MySQL.

### Objectif du guide

Ce guide a pour objectif d'accompagner le déploiement complet de l'application Miam'Zelle Recette sur un serveur distant. Il couvre toutes les étapes nécessaires : de l’installation des dépendances à la configuration du serveur web (NGINX), en passant par la base de données, la sécurité, le backend API, le frontend et les tests finaux. À la fin de ce guide, vous aurez une application opérationnelle et sécurisée, accessible en ligne.

### Prérequis

Pour suivre ce guide, vous aurez besoin de :

- Matériel : Un serveur ou une machine virtuelle
- Logiciels :
  - Node.js et npm
  - MySQL Workbench
  - Un serveur web (NGINX)
  - Git pour le suivi de version
- Configuration minimale :
  Système d'exploitation Linux (ubuntu ou équivalent), accès root ou utilisateur avec privilèges.

## 2. Préparation du Serveur

### Installation des outils nécessaires

Node.js permet d'exécuter du JavaScript côté serveuret npm gère les dépendances du projet.

#### Node.js et npm :

Dans un terminal, exécuter la commande :

```bash
sudo apt install node.js npm
```

Vérifiez l'installation

```bash
npm init
npm install <nom_du_module>
```

#### Git :

1. Installation de Git
   Ouvrir un terminal et exécuter cette commande :

```bash
sudo apt install git
git --version
```

2. Générer une clé SSH

- Créer une nouvelle clé SSH :

```bash
ssh-keygen -t rsa -b 4096 -C "votre_email@example.com"
```

Si vous en souhaitez pas mettre de mot de passe, vous pouvez laisser la zone vide.

- Afficher la clé publique :

```bash
cat ~/.ssh/id_rsa.pub
```

- Ajouter la clé SSH sur GitHub ou GitLab :
  - GitHub : Allez dans Settings > SSH and GPG keys > New SSH Key et collez votre clé publique
  - GitLab : Allez dans User Settings > SSH Keys et collez votre clé publique

* Cloner un dépôt Git :
  Pour cloner un projet, utilisez la commande suivante :

```bash
git clone <url-du-projet>
cd votreprojet
```

#### MySQL Workbench :

1. Télécharger les outils nécessaires

- Rendez-vous sur le site : "https://dev.mysql.com/downloads/workbench/" et télecharger les différents outils.

2.  Lancer MySQL Workbench (pour MacOs)

- Ouvrez MySQL Workbench
- Connectez-vous à votre serveur MySQL local ou distant
- Utilisez l'interface graphique pour exécuter des scripts SQL, gérer les utilisateurs, exporter des bases, etc.
- Préparez le script de création de base de données et des tables

#### Serveur web (NGINX) :

1. Créer un fichier de configuration du Serveur \
   Créez un fichier de configuration pour votre domaine. Sous Debian/Ubuntu, les configurations Nginx se trouvent généralement dans `/etc/nginx/sites-available/`.

Exécutez cette commande pour créer le fichier de configuration du serveur : \
`sudo nano /etc/nginx/sites-available/scmat.dipsw-ccicampus.de`

2. Ajouter la configuration du Serveur \
   Ajoutez le contenu suivant dans le fichier :

```bash
server {
    listen 80;
    server_name scmat.dipsw-ccicampus.dev;

    root /var/www/html/scmat.dipsw-ccicampus.dev;
    index index.html index.htm index.nginx-debian.html;

    access_log /var/log/nginx/scmat.dipsw-ccicampus.dev.access.log;
    error_log /var/log/nginx/scmat.dipsw-ccicampus.dev.error.log;

    location / {
        try_files $uri $uri/ =404;
    }
}
```

Explication de la configuration :

- `listen 80`: Le serveur écoute sur le port 80.
- `server_name`: Le nom de domaine principal et les alias.
- `root`: Le répertoire racine où se trouvent les fichiers du site web.
- `index`: Les fichiers index par défaut.
- `access_log` et `error_log`: Les emplacements des fichiers de logs.
- `location/`: Bloc de configuration pour le chemin racine
  - `try_files`: Tente de servir le fichier demandé, sinon renvoie une erreur 404.

3. Créer le répertoire du site web \
   Créez le répertoire pour votre site web et ajoutez-y un fichier index pour tester.

```bash
sudo mkdir -p /var/www/html/scmat.dipsw-ccicampus.dev
sudo chown -R www-data:www-data /var/www/html/scmat.dipsw-ccicampus.dev
sudo chmod -R 755 /var/www/html/scmat.dipsw-ccicampus.dev

# Créer un fichier index.html pour tester
echo "<h1>Bienvenue sur scmat.dipsw-ccicampus.dev</h1>" | sudo tee /var/www/html/scmat.dipswccicampus.dev/index.html
```

4. Activer le site \
   Créez un lien symbolique pour activer le site.

`sudo ln -s /etc/nginx/sites-available/scmat.dipsw-ccicampus.dev /etc/nginx/sites-enabled/`

5. Vérifier la configuration de Nginx \
   Avant de rédemarrer Nginx, vérifiez que la configuration est correcte. \
   `sudo nginx -t`

- si la configuration est correcte, vous devriez voir : `syntax is ok` et `test is successful`.
- si des erreurs sont signalées, corrigez-les avant de continuer.

6. Redémarrer Nginx \
   Redémarrer le service Nginx pour appliquer les modifications. \
   `sudo nginx -t`

7. Virtualhost SSL

```bash
server {
    listen 443 ssl;
    server_name scmat.dipsw-ccicampus.dev;

    root /var/www/html/scmat.dipsw-ccicampus.dev;
    index index.html index.htm index.php;

    error_log /var/log/nginx/scmat.dipsw-ccicampus.dev.error.log;
    access_log /var/log/nginx/scmat.dipsw-ccicampus.dev.access.log combined;

    ssl_certificate /etc/letsencrypt/live/scmat.dipsw-ccicampus.dev/haproxy-wildcard.crt;
    ssl_certificate_key /etc/letsencrypt/live/scmat.dipsw-ccicampus.dev/haproxy-wildcard.key;

    # Désactive l'autoindex
    autoindex off;

    # Permet de suivre les liens symboliques (par défaut dans Nginx)
    location / {
        try_files $uri $uri/ =404;
    }
}
```

8. Vérification finale

- Tester l'accès au site : Après avoir configuré le virtualhost et redémarré le serveur web, essayez d'accéder à `scmat.dipsw-ccicampus.dev` depuis un navigateur web.
- Surveiller les logs : Si vous rencontrez des problèmes, consultez les fichiers de logs spécifiés dans la configuration pour obtenir des informations détaillées sur les erreurs éventuelles.

### Configuration du réseau

Pour que votre application soit accessible publiquement, vous devez configurer correctement le réseau de votre serveur.

Assurez-vous que les ports 80 (HTTP) et 443 (HTTPS) sont ouverts sur votre serveur :

- Ouverture des ports nécesaire
  COMMANDE

### Paramètre de sécurité de base

- Mise à jour du système :
  COMMANDE
- Configuration du pare-feu :
  COMMANDE

## 3. Configuration de la Base de Données MongoDB

1. Installation et initialisation de MongoDB :
   COMMANDE
2. Création de l'utilisateur et de la base de données :
   COMMANDE
3. Configuration des permissions pour l'application
   COMMANDE

## 4. Déploiement de l'Application React

### Compilation de l'application pour la production

1. Générer les fichiers de production :
   COMMANDE
2. Transférer les fichiers vers le serveur :
   COMMANDE

### Configuration d'un serveur web

1. Configurer NGINX pour servir les fichiers statiques :
   COMMANDE
2. Activer la configuration et redémarrer NGINX :
   COMMANDE

## 5. Backend et API

### Explication de la connexion entre l'application React et MongoDB

explication

### Configuration des variables d'environnement

Créer un fichier .env :
COMMANDE

### Mise en place et test de l'API

1. Installer les dépendances backend
   COMMANDE
2. Lancer l'API :
   COMMANDE

## 6. Mise en production

1. Déploiement d'un gestionnaire de processus :
   COMMANDE
2. Configuration du reverse proxy
   COMMANDE
3. Certificat SSL pour sécuriser l'application
   COMMANDE
4. Test de l'accès public à l'application
   COMMANDE

## 7. Sécurisation de l'Environnement

1. Protection des données sensibles :
   COMMANDE
2. Bonnes pratiques de sécurité pour MongoDB
   COMMANDE
3. Configuration HTTPS :
   Activer HTTPS pour toutes les connexion
   COMMANDE

## 8. Résolution des problèmes

### Problèmes courant lors du déploiement

(erreurs de connexion, dépendances manquantes)

### Solutions et ressources

blabla

## 9. Conclusion``

Il faut s'assurer de maintenir l'application à jour, de sauvegarder régulièrement la base de données et de surveiller les journaux pour prévenir les problèmes.
