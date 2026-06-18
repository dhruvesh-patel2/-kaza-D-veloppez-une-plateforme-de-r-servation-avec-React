# Kaza Frontend

Frontend Next.js du projet Kaza.

L'application permet de :
- consulter la liste des logements
- afficher la page detail d'un logement
- ajouter et retirer des favoris
- se connecter et s'inscrire
- acceder a une messagerie
- ajouter un logement avec upload d'images

## Stack technique

- Next.js
- React
- Jest
- React Testing Library
- ESLint

## Prerequis

Avant de lancer le projet, il faut avoir installe :

- Node.js 18 ou plus recent
- npm
- le backend Kaza lance localement

## Installation

1. Cloner le projet puis entrer dans le dossier :

```bash
cd kaza-frontend
```

2. Installer les dependances :

```bash
npm install
```

## Dependances installees

Les dependances principales sont installees via `npm install` a partir du `package.json`.

Dependances runtime :
- `next`
- `react`
- `react-dom`

Dependances de developpement :
- `jest`
- `jest-environment-jsdom`
- `babel-jest`
- `@testing-library/react`
- `@testing-library/jest-dom`
- `@testing-library/user-event`
- `eslint`
- `eslint-config-next`

## Backend / API

Ce frontend depend d'un backend local.

Le code appelle actuellement :
- `http://localhost:3000/api`
- `http://localhost:3000/auth`
- `http://localhost:3000/uploads`

Le backend doit donc etre demarre avant d'utiliser completement l'application.

Sans backend actif, les fonctionnalites suivantes ne fonctionneront pas correctement :
- chargement des logements
- page detail logement
- connexion
- inscription
- creation de logement
- upload des images

## Demarrage du projet

### Cas 1 : si le backend utilise deja le port 3000

Dans ce projet, c'est le cas le plus probable.

Lancer le frontend sur un autre port, par exemple `3001` :

```bash
npm run dev -- --port 3001
```

Puis ouvrir :

```text
http://localhost:3001
```

### Cas 2 : si le port 3000 est libre

Tu peux lancer simplement :

```bash
npm run dev
```

Puis ouvrir :

```text
http://localhost:3000
```

## Scripts disponibles

### Lancer le serveur de developpement

```bash
npm run dev
```

### Lancer les tests unitaires

```bash
npm test
```

### Lancer le lint

```bash
npm run lint
```

### Generer le build de production

```bash
npm run build
```

### Lancer l'application en production apres build

```bash
npm run start
```

## Structure simplifiee du projet

```text
app/                pages Next.js App Router
components/         composants reutilisables
lib/                logique metier, auth, favoris, appels API
public/             images et assets statiques
styles/             feuilles CSS
test unitaire/      tests Jest et React Testing Library
```

## Fonctionnalites principales

### Accueil

Affiche la liste des logements recuperes depuis l'API.

### Detail logement

Affiche :
- carousel d'images
- description
- equipements
- categories
- informations hote

### Favoris

Les favoris sont geres via `localStorage` et un contexte React.

### Authentification

La connexion et l'inscription passent par des routes API Next.js qui servent de proxy vers le backend.

### Ajout de logement

Le formulaire permet :
- d'ajouter les informations du bien
- d'uploader une image de couverture
- d'uploader des images supplementaires
- d'uploader une photo d'hote

## Tests

Le projet contient deja des tests unitaires, notamment pour :
- le carousel
- les favoris
- le formulaire de connexion
- le formulaire d'inscription

Pour les lancer :

```bash
npm test
```

## Qualite du code

Pour verifier la qualite du code :

```bash
npm run lint
```

Pour verifier que l'application compile correctement :

```bash
npm run build
```

## Points d'attention

- Le frontend depend actuellement d'URLs locales en dur (`localhost:3000`).
- Le backend doit etre demarre pour tester toutes les fonctionnalites.
- Si le backend utilise deja le port `3000`, il faut lancer le frontend sur `3001` ou un autre port libre.

## Auteur

Projet realise dans le cadre du parcours OpenClassrooms Kaza.
