---
title: "Recommendations"
date: 2024-04-17
tags:
- tips
- article
---

Petit article que je vais essayer de mettre à jour avec des recommendations d'outils que j'utilise souvent et que je trouve intéressants et/ou utiles.

Il y a pas mal de petits outils à utiliser dans un terminal, mais pas que !

# Bat

[Bat](https://github.com/sharkdp/bat) est décrit comme "a cat clone with wings". Pour les utilisateur.ices du terminal, vous savez ce qu'est `cat`. Pour les autres, c'est un utilitaire qui permet au départ de concaténer le contenu de fichiers ensemble. Mais en général, il est utilisé pour afficher le contenu d'un fichier. Par exemple `cat hello.md` affiche le contenu du fichier `hello.md` sur le terminal.

Et bien avec `bat`, c'est exactement le même principe, mais avec des fonctionnalités en plus. Les plus intéressantes sont :
- la coloration syntaxique (*syntax highlighting*) du code
- l'intégration de `git`

C'est possible de remplacer totalement `cat` par `bat`, si vous avez -comme moi- pas l'énergie mentale de se défaire d'une habitude en créant un alias, par exemple en ajoutant cette ligne dans `.bashrc` (si vous utilisez `bash`) :

```bash
alias cat='bat --paging=never'
```

L'option `--paging=never` permet de reproduire le comportement de `cat`, donc de ne pas passer par un pager comme `less`. C'est facultatif bien sûr.

Il y a pas mal de possibilités de configurations, je vous laisse aller voir par vous-même sur le repo de [`bat`](https://github.com/sharkdp/bat)

# Micro

[Micro](https://github.com/zyedidia/micro) c'est un éditeur de texte intégré au terminal. C'est un outil semblable à `nano` ou `vim`, mais plus facile d'utilisation.

Je sais qu'il y a des fervant.es utilisateur.ices de `vim` et ses dérivés, mais personnellement à chaque fois que j'ai essayé de m'y mettre, j'ai trouvé que la courbe d'apprentissage était trop lente... Me tapez pas svp. Du coup, j'utilisais `nano` pour modifier un fichier rapidement dans le terminal, mais bon le copier coller marche jamais, je me souviens jamais des raccourcis... bref, je cherchais quelque chose de simple.

Et micro est parfait pour ça ! Je vous laisse aller voir la doc, mais les raccourcis claviers sont les raccourcis usuels <kbd>Ctrl</kbd>+<kbd>s</kbd> pour sauvegarder, <kbd>Ctrl</kbd>+<kbd>q</kbd> pour quitter... Et y'a la coloration syntaxique aussi !

# Taskwarrior

[Taskwarrior](https://taskwarrior.org) c'est, comme son nom l'indique, un outil pour faire des todo lists. Que dire de plus... Pareil, c'est dans le terminal, c'est simple d'utilisation, c'est pratique, et super personnalisable.

On peut par exemple ajouter des labels (tags) aux tâches et attribuer une couleur particulière pour chaque tag pour mettre en valeur des tâches, il y a un système de priorité en fonction de la date de création de la tâche, de la priorité attribué et de la date due... Bref c'est vraiment un bon outil, je vous conseille de le tester.

# Quartz

Bon, là je triche un peu. [Quartz](https://quartz.jzhao.xyz/) c'est ce avec quoi ce site est construit, donc si vous avez été sur ma page d'acceuil, vous devez l'avoir vu. 

C'est pensé pour publier une vault Obsidian (que je recommende également, mais comme c'est assez connu, je vais pas m'étendre sur le sujet) mais ça peut s'utiliser hors Obsidian avec des fichiers markdown.

# Slidev

Si vous êtes des fans de mon site, vous avez sans doute vu que j'ai fait un petit article sur comment faire des présentations avec [reveal-js](https://vrak.konor.fr/article/reveal-js_presentations). Et bien je devrai mettre à jour cet article pour faire un workflow avec [slidev](https://sli.dev) parce que c'est ce que j'utilise depuis quelques mois maintenant et je peux plus m'en passer.

C'est donc un outil pour faire des présentations basé sur Vue, que je trouve beaucoup plus puissant que [reveal-js](https://revealjs.com). Ce que j'aime comme fonctionnalités de slidev, c'est déjà la personnalisation possible (comme c'est basé sur Vue, on peut rajouter des composants Vue pour à peu près ce qu'on veut), le design de la présentation (il y a possibilité de prendre des notes, de passer en mode présentateur.ice, d'écrire sur les slides...) et un truc tout con mais qui est une galère avec reveal-js, c'est la gestion des clics. Par exemple, faire apparaître une bullet list point par point avec slidev c'est super simple. Il suffit de faire :

```md
<v-clicks>

- Point 1
- Point 2
- T'as compris le concept arrivé là normalement

</v-clicks>
```

Et les points seront affichés au fur et à mesure !

Il y a aussi possibilité d'exporter en PDF, d'avoir un thème clair/sombre, d'écrire des expressions LaTeX, d'écrire du code (il y a même possibilité d'avoir un éditeur intégré avec [Monaco](https://sli.dev/guide/syntax#monaco-editor))... Bref, beaucoup de choses !
Encore une fois, n'hésitez pas à aller voir la doc et à tester par vous-mêmes, c'est vraiment un de mes outils préférés en ce moment.

# Typst

Comment recommender des outils sans parler de [Typst](https://typst.app) ? Si vous ne connaissez pas, je vais essayer de vous convaincre de l'utiliser, parce que c'est pour moi un projet super abouti que j'ai trop hâte de voir évoluer.

Typst c'est pour moi le remplaçant de LaTeX. Pour celleux qui ne connaîtrait pas, LaTeX est *un langage et un système de composition de documents* ([source](https://fr.wikipedia.org/wiki/LaTeX)), donc ça sert à la même chose que Word par exemple, mais sous un principe de WYSIWYM (*What You See Is What You Mean*) alors que Word est un WYSIWYG (*What You See Is What You **Get***). Pour celleux qui connaissent LaTeX, vous savez donc à quel point ce truc est un **enfer** à utiliser : c'est lent, il y a toujours des problèmes de compilations avec les packages, c'est pas du tout logique, ça créé beaucoup trop de fichiers qui servent à rien à la compilation... Bref, je conçois que ça a été utile, mais maintenant, faudrait passer à autre chose (coucou mes profs de fac, si vous passez par là).

Et Typst c'est un super remplaçant. Contrairement à des approches que j'avais pu voir avant de passer par des fichiers markdown, mais qui sont plutôt prévu pour le web, donc qui ne prennent pas en compte les contraintes de mise en page de la même manière que pour un document à imprimer par exemple, Typst a été pensé pour faire des rapports, des mémoires et compagnie. Donc la mise en page est très paramétrable.

Il y a aussi possibilité de créer des fonctions, des tableaux, des jeux mêmes, donc c'est vraiment un langage complet. Depuis quelque temps, il y a des [packages](https://typst.app/universe), ce qui permet d'étendre encore les possibilités avec cet outil (petit instant promo, j'ai fait une [template](https://typst.app/universe/package/bubble) héhé). C'est possible d'éditer dans l'application web (où on peut collaborer comme sur Google Doc ou Overleaf d'ailleurs) ou bien en local en installant le compiler.

Au moment où j'écris cet article, la v1 n'est pas encore sortie (on est à la v0.11) mais c'est déjà largement utilisable et j'attends avec impatience la sortie de la v1.

Enfin bref, j'espère qu'avec ça je vous ai convaincu, allez écrire votre prochain rapport/CV/lettre de motivation/n'importe quoi avec Typst et vous verrez à quel point c'est puissant.

---

Bon voilà, c'est la fin de mes recommendations, si jamais tu veux me partager un truc, hésite pas à me contacter (y'a de quoi sur ce site normalement)
