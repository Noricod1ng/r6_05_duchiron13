# Résumé de l'Application

L'application est conçue pour gérer une bibliothèque de films et interagir avec les utilisateurs de
plusieurs manières, notamment par l'envoi de notifications par email. Voici ses fonctionnalités clés :

- **Envoi d'un Mail de Bienvenue** : À la création d'un compte utilisateur, un mail de bienvenue est
  envoyé à l'utilisateur via Nodemailer, en utilisant un service d'email fictif pour les tests (Ethereal).
- **Gestion d'une Bibliothèque de Films** : Les administrateurs peuvent ajouter, modifier et supprimer
  des films dans la bibliothèque. Chaque film contient un titre, une description, une date de sortie, et
  le nom du réalisateur.
- **Gestion des Films Favoris** : Les utilisateurs peuvent gérer une liste de leurs films favoris, en
  ajoutant ou supprimant des films de cette liste. Des validations sont mises en place pour éviter les
  doublons.
- **Notifications par Mail** : Les utilisateurs reçoivent des notifications par mail lorsqu'un nouveau film
  est ajouté à la bibliothèque ou lorsqu'un film dans leurs favoris est modifié.
- **Export CSV des Films** : Un administrateur peut demander un export CSV de tous les films de la
  bibliothèque, qui est traité de manière asynchrone et envoyé par mail via un message broker.