![logo](medias/banner.png)

# NetSwipe (Application)

![npm](https://img.shields.io/badge/Version-1.4-blue.svg)

## Pitch

 Escroc dans l’âme, vous avez l’habitude de mettre des alarmes pour envoyer des messages à des heures bien définies. L’objectif ? Piéger et frustrer votre entourage.
 Et si maintenant on vous disait qu’une application vous permettait de programmer ces messages ?

### Nom des co-équipiers

- [Léna Clavier](https://github.com/l-naC)
- [Nolwenn Poilleux](https://github.com/nute-25)
- [Olivier Chemla](https://github.com/olivech12)
- [Abraham Ibo](https://github.com/abrahamibo)
- [Jérémy Grosz](https://github.com/jeremygsz)

## How to install & run

Après avoir cloné le projet ouvrez votre terminal :

Placez vous dans le dossier répértoire `source` du projet.

```bash
cd ./sources/netswipe
```

Verifier que ionic et cordova soit installé

```bash
ionic -v
cordova -v
```

Si ce n'est pas le cas alors il le faut

```bash
npm install -g ionic
npm install -g cordova
```

Entrez la commande `npm install` afin d'installer les dépedances nécessaires.

```bash
npm install
```

La commande suivante permettra de tester le projet dans votre navigateur.

```bash
ionic serve
```

Ajouter la platforme android

```bash
ionic cordova platform add android
```

Ajouter la platforme ios

```bash
ionic cordova platform add ios
```

Afin de lancer le projet avec un device ou un emulator il suffit de faire la commande suivante dans le terminale en ramplacant 'platformes' par `android` ou `ios`

```bash
ionic cordova run 'platformes' -l
```