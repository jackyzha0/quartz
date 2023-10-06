---
title: "Présentations avec reveal-js"
tags:
- info
- tips
- article
---

Un petit article où je détaille mon utilisation de [reveal.js](https://revealjs.com), qui framework de présentations (type Powerpoint), et ce que j'ai utilisé pour pouvoir facilement héberger mes présentations et pouvoir y accéder partout.

# `reveal.js` : outil de présentations
## On my way to `reveal.js`
Je suis tombé sur cet outil en utilisant [HedgeDoc](https://hedgedoc.org) (un outil collaboratif uniquement en markdown), qui intègre ce framework pour faire des *slides*, qui sont ensuite facilement diffusables, en partageant un lien de présentation du type `https://[instance hedgedoc]/p/[identifiant de la présentation]/`.

Mais le petit problème que j'ai trouvé en utilisant `reveal.js` par le biais de Hedgedoc, c'est que le paramétrage d'options un peu plus poussées est vite compliqué et encombrant, donc pas très simple d'utilisation. Il semble aussi que toutes les fonctionnalités de `reveal.js` ne soient pas implémentées.

Donc, je me suis dit qu'il serait plus pratique d'utiliser directement `reveal.js`.

## Fonctionnalités de `reveal.js`

Je vous invite à aller voir la [documentation](https://revealjs.com/) qui est très fournie et permet de facilement prendre en main l'outil. 

Un petit exemple simpliste de présentation :

<p align="center"><iframe src="https://me.konor.fr/presentationtest/" width=600 height=400></iframe></p>

Mais rapidement, ce framework permet :
- de faire des présentations type Powerpoint, uniquement avec du HTML (ou markdown)
- donc bénéficier de tous les avantages du HTML comme par exemple la possibilité de mettre des `iframe`
- d'avoir différents thèmes
- d'avoir la coloration syntaxique automatique
- d'avoir des slides verticales
- d'avoir des animations assez sympas
- d'avoir une vue "présentateur‧ice"
- d'être responsive et donc accessible sur de nombreux appareils
- etc.

Personnellement, j'aime bien les trucs avec des animations, j'aime bien markdown, et j'aime bien les présentations donc je me suis dit que c'était fait pour moi !

Le seul truc qui me manquait par rapport à Hedgedoc, c'était la possibilité de pouvoir facilement partager sa présentation une fois faite. On en arrive donc à la partie suivante...

# Outils pour héberger ses présentations

D'abord, je me suis demandé si quelqu'un avait déjà pensé à la même chose que moi. Je suis tombé sur [cet article](https://marcus-baw.medium.com/using-reveal-js-a74b30e4065b), et je m'en suis un peu inspiré. Je vais donc expliquer comment j'ai procédé.

> [!tip] Outils nécessaires
> 
> - Un compte GitHub/GitLab/Bitbucket
> - Un compte Vercel connecté au compte GitHub/GitLab/Bitbucket
> - Un nom de domaine (optionnel)

Mon objectif de départ était de pouvoir héberger mes présentations sur un nom de domaine que je possède, par exemple `domaine.com`, et qu'elles soient toutes disponibles en connaissant leur nom. Par exemple si une présentation a pour titre `mon-amour-pour-les-pates`, elle se trouverait sur `domaine.com/mon-amour-pour-les-pates/`. Aussi, je ne voulais de préférence pas que mes présentations et leur contenu soit visible de manière publique (j'ai pas forcément envie que tout le monde soit au courant de mon amour pour les pâtes).

## Etape 1 : Créer une template de `reveal.js`

Pour pouvoir facilement créer de nouvelles présentations, il faut d'abord commencer par avoir une template de `reveal.js`. La personne de l'article précédent a élaboré une [template](https://github.com/pacharanero/create-new-revealjs-template), et il y en a d'autres sur GitHub. Donc, on peut faire un `fork` d'une de ces templates.

Dans l'exemple que je vais utiliser ici (que je vous ai présenté plus haut), j'ai simplement modifié/ajouté les fichiers suivants dans mon fork que j'ai nommé `presentationtest` :

```html {title="presentationtest/index.html"}
<div class="slides">
<!-- Pour utiliser un fichier "markdown.md" afin de définir le contenu de notre présentation !-->
	<section data-markdown="markdown.md" data-separator="---"></section>
 </div>
```

Ici j'ai écrit le contenu de la présentation dans un fichier markdown externe, mais bien sûr c'est possible de l'écrire directement en HTML, dans la `<div class="slides>"` .

```markdown {title="presentationtest/markdown.md"}
# Slide 1
## Titre 2

---

# Slide 2

## Titre 2
*italique*
Test avec une image
![capture d'écran](assets/proxy-image.jpg)

---

[lien](https://github.com/hzkonor)

---

![External Image](https://s3.amazonaws.com/static.slid.es/logo/v2/slides-symbol-512x512.png)
```

## Etape 2 : Publier avec Vercel

Dans [l'article](https://github.com/pacharanero/create-new-revealjs-template) mentionné précédemment, l'auteur indique utiliser GitHub Pages. Sauf que, cela signifie que *toutes* ses publications sont dans des repos publics sur son compte GitHub. Ce n'est pas quelque chose que je voulais.

Donc, je me suis dit qu'il y avait moyen de faire la même chose avec [Vercel](https://vercel.com/) (il y a sûrement d'autres possibilités, mais j'utilisais déjà Vercel pour d'autres choses, donc ça me paraissait pratique).

Depuis votre tableau de bord Vercel, créez un nouveau projet en important le repo que vous avez utilisé à l'étape 1 (pour moi : `presentationtest`) :

![captude d'écran du tableau de bord vercel où l'on importe le repo](images/Pasted%20image%2020230208154450.png)

Donnez ensuite un nom à votre projet, et j'ai personnellement ajouté ces paramètres car j'avais une erreur sinon :

![capture d'écran du menu "Build and Output Settings" avec '.' comme Output directory](images/Pasted%20image%2020230208154556.png)

Cliquez sur `Deploy`, et normalement c'est tout bon, votre présentation disponible sur votre repo (même s'il est privé) est en ligne !

## Etape 3 : Changer le lien d'accès pour qu'il soit sur votre domaine

Sauf que bon, là vous vous retrouvez avec une présentation accessible sur `[nom du projet vercel].vercel.app`, dans mon cas `presentationtest.vercel.app`. Et c'est super, mais c'est pas exactement ce que je voulais.

Donc, pour pouvoir avoir ma présentation sur mon `domaine.com` et toutes les suivantes également, j'ai fait quelques manips supplémentaires.

D'abord j'ai créé un nouveau repo privé, que j'ai appelé `config-vercel`, où j'ai simplement un fichier `vercel.json` comme indiqué dans la [doc](https://vercel.com/guides/how-can-i-serve-multiple-projects-under-a-single-domain).

```json {title="config-vercel/vercel.json"}
{
  "rewrites": [
    {"source": "/presentationtest/", "destination": "https://presentationtest.vercel.app/"},
    {"source": "/presentationtest/:match*", "destination": "https://presentationtest.vercel.app/:match*"}
  ]
}
```

Cela nous permettra de bien avoir : `domaine.com/presentationtest`

Pour que cela soit possible, il faut importer le repo `config-vercel` dans Vercel, le déployer, et lui ajouter notre domaine : 

![capture d'écran montrant qu'il faut cliquer sur "view domains" dans le projet "config-vercel"](images/Pasted%20image%2020230208155356.png)

![capture d'écran montrant comment ajouter "domaine.com"](images/Pasted%20image%2020230208155414.png)

Et voilà, normalement c'est tout bon, notre présentation est accessible depuis `domaine.com/presentationtest`(bon en vrai, elle est [ici](https://me.konor.fr/presentationtest/))

Maintenant, il suffit de `push` les modifications sur notre repo `presentationtest` et toutes les modifications apparaîtront bien.
