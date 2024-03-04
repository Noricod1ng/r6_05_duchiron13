# r6_05_duchiron13

<h1>ATTENTION, l'application rencontre des difficultés avec le login et les jetons JWT</h1>

***

Créer la base de données avec docker :

```
docker run --name hapi-mysql -e MYSQL_USER=hapi -e MYSQL_PASSWORD=hapi -e MYSQL_ROOT_PASSWORD=hapi -e MYSQL_DATABASE=user -d -p 3308:3306 mysql:8 mysqld --default-authentication-plugin=mysql_native_password
```

# Bibliothèque de Films
Cette application permet de gérer une bibliothèque de films, offrant des fonctionnalités d'ajout,
modification, et suppression de films pour les administrateurs, ainsi que la possibilité pour les
utilisateurs de gérer une liste de films favoris.

## Fonctionnalités
- \[OK] Envoi de mails de bienvenue avec Nodemailer et Ethereal.
- \[OK] CRUD pour la gestion des films.
- \[ABSENT] Gestion des films favoris pour les utilisateurs.
- \[OK] Notifications par mail lors de l'ajout ou de la modification des films.
- \[ABSENT]Export CSV des films via un message broker.

## Configuration et Démarrage
1. Clonez le répertoire et installez les dépendances :
```
git clone https://github.com/Noricod1ng/r6_05_duchiron13.git
npm install
```
2. Configurez vos variables d'environnement dans un fichier `server/.env`.
3. Lancez l'application :
```
npm start
```
## Technologies Utilisées
- Node.js et Framework Hapi
- Nodemailer pour l'envoi d'emails
- Joi pour la validation des données

## Rapport
[rapport.md](rapport.md)