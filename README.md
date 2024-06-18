# Corrige moi ça !
![Icône de l'extension](images/icon128.png)

## Description
**Corrige moi ça !** est une extension Chrome qui corrige les fautes d'orthographe ou reformule les phrases pour les rendre plus claires. 

## Illustration
![Description de l'image](https://image.noelshack.com/fichiers/2024/25/2/1718717658-autocorrectscreen.png)

## Fonctionnalités
- Correction des fautes d'orthographe
- Reformulation des phrases pour plus de clarté
- Interface utilisateur simple et intuitive
- Sauvegarde de la clé API dans le stockage synchronisé de Chrome

## Installation
1. Clonez ou téléchargez ce dépôt sur votre ordinateur.
2. Ouvrez Chrome et allez dans `chrome://extensions/`.
3. Activez le **Mode développeur** en haut à droite de la page.
4. Cliquez sur **Charger l'extension non empaquetée** et sélectionnez le dossier du projet.

## Utilisation
1. Cliquez sur l'icône de l'extension dans la barre d'outils Chrome.
2. Entrez le texte que vous souhaitez corriger ou reformuler dans la zone de texte.
3. Cliquez sur le bouton **Corriger** pour corriger les fautes d'orthographe ou sur **Reformuler** pour reformuler les phrases.
4. Le texte corrigé ou reformulé apparaîtra dans la section en dessous.
5. Vous pouvez copier le texte corrigé en cliquant sur le bouton **Copier**.
6. Pour configurer votre clé API, cliquez sur l'icône d'engrenage et entrez votre clé API OpenAI.

## Fichiers du projet
- `manifest.json` : Fichier de configuration de l'extension.
- `popup.html` : Interface utilisateur de l'extension.
- `popup.js` : Logique de l'application côté client.
- `input.css` : Styles de base pour l'extension, incluant TailwindCSS.
- `output.css` : Fichier CSS généré par TailwindCSS.
- `tailwind.config.js` : Configuration de TailwindCSS.

## Technologies utilisées
- HTML
- CSS (TailwindCSS)
- JavaScript
- API OpenAI

## Configuration de la clé API
1. Cliquez sur l'icône d'engrenage dans l'extension.
2. Entrez votre clé API OpenAI dans le champ prévu à cet effet.
3. Cliquez sur **Sauvegarder**.

## Auteur
- **TP** - [GitHub](https://www.github.com/Anthony14FR)

## Licence
Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus d’informations.
