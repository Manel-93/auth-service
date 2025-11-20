AUTH-SERVICE (Microservice 1 d'Authentification)

Ce microservice gère l'authentification et l'autorisation au sein de l'application. 
Il utilise Node.js, sécurise les mots de passe via bcrypt et gère les sessions utilisateur à l'aide de JSON Web Tokens (JWT).
Le service prend en charge trois niveaux de rôles : USER, EXPERT et ADMIN. 
L'architecture est structurée autour des modèles de données, des contrôleurs contenant la logique métier (auth et admin), des middlewares pour la sécurité (vérification JWT et rôles), et des routes.
Le point d'entrée du serveur est server.js, utilisant des configurations basées sur le fichier .env pour la base de données et les secrets JWT.

Les fichiers à la racine du projet sont les package.json (nodes_modules et ses dépeandances) et les variables d'environnement nécessaire à la connexion à la bdd et au déploiement du projet. 
Ensuite nous avons le server.js qui est la porte d'entrée du projet (import de toutes les routes et framework).
Le fichier database.js est le point fondamental pour établir la connexion à la bdd (mongoDBAtlas et son ORM Mongoose). 
On a les fihciers Routes, le auth pour gérer le register/login/auth, le admin pour gérer tous les fonctions d'administrateur.
Nous avons ensuite crée le model qui sert de schéma de données dans la base de données. Le middleware qui va servir d'intermédiaire entre les routes et les controlleurs.
Et enfin les controlleurs pour recevoir et gérer la logique métier des requêtes.

API Endpoints 
Les fonctionnalités minimales exposées par l'API sont les suivantes :
POST/auth/register : Créer un nouvel utilisateur.
POST/auth/loginAucun : Authentifier l'utilisateur et retourner un JWT.
GET/auth/me : Récupérer les informations de l'utilisateur.
GET/admin/users : Lister tous les utilisateurs du système.
PATCH/users/:id/role : Modifier le rôle d'un utilisateur spécifié par son identifiant.
