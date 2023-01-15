# Devoir - IHM

## Mise en place - Serveur

Pour mettre en place le server, il vous suffit d'importer les 2 fichiers présent dans le dossier **/BDD** dans votre serveur neo4j et de faire les 2 commandes suivantes :
- **sudo neo4j start** : Démarrer le service neo4j
- **npm run start** : Lancer le serveur

On suppose que dans cette situation vous avez déjà un serveur neo4j (donc pas besoin de **npm init** ou **npm install**)

## Mise en place - Application

Pour mettre en place l'application, un **npm install** devrait suffir, mais si jamais cela ne fonctionne pas, voici les différentes librairie à installer :

- npm install react-native-paper (librairie utilisé pour le design)

- npm install react-native-svg (librairie pour afficher les images au format svg)

- npx expo install react-native-svg@13.4.0 (librairie pour afficher les images au format svg avec expo)

- npm install @react-native-community/checkbox ((librairie pour utiliser des checkbox, étant donné que celle de react-native n'est plus maintenu)

- npm install react-native-awesome-alerts (librairie pour afficher des popup d'alert design)
 
Une fois tout cela effectué, il vous suffira d’exécuter à la commande **npm run start** à la racine du projet et de flacher le QR code avec votre mobile (de préference Android) avec l'application expoGo, en supposant qque vous avez déjà expo d'installer sur votre machine. (La dernière version de Expo Go est nécessaire pour utilisé notre appli)

Pour pouvoir vous connecter à l'API avec votre mobile, il faudra modifier l'adresse dans le fichier **API/todoAPI.js** par l'adresse du metro (afficher au sous le QR code au moment du démarrage de l'application)


!!! ATTENTION !!! : Notre application n'est pas adapté au format Web (d'un point de vue design mais également quelques erreurs ont lieu sur la version web  que n'ont pas la version mobile )

-----

Démonstration : https://youtu.be/qSMgp6u1U3A
Pour toute information : 21805239@unicaen.fr 
Réalisé par : Alexandre BELLEBON (21808613) - Léo VINCENT (21805239)