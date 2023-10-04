---
title: "Fonctions logiques élémentaires, algèbre de Boole"
tags:
- info
- algèbre
- maths
- logique
---

# Variables et fonctions logiques
On parle de circuits **numériques** / **logiques** (en opposition avec les circuits **analogiques** qui sont convertis en grandeurs numériques) ⇒ **2 états** possibles, par exemple :
- contact ouvert ou fermé
- transistor bloqué ou saturé

Donc il y a un certain nombre de valeurs possibles ( $\neq \infty$ des circuits analogiques).

Ces circuits sont facilités par l'utilisation de l'**algèbre de Boole** ⇒ manipule des variables qui ne peuvent prendre que 2 états : **0 ou 1**

> [!info] Définitions
> Une **variable logique** est une grandeur qui ne peut prendre qu'un nombre fini d'états discrets
> 
> **L'algèbre de Boole** est l'étude du comportement :
> - des variables prenant leurs valeurs dans l'ensemble (0,1)
> - des **fonctions** de ces variables prenant leurs valeurs dans le même ensemble

Donc, pour $n$ variables binaires indépendantes $x_{1},x_{2},x_{n}$, une fonction logique $f(x_{1},x_{2},x_{n})$ est une fonction qui, pour chaque combinaison des variables binaires, prend un état 0 ou 1.

> [!example] Fonction à 3 variables
> Par exemple pour une fonction $f(x_{1},x_{2},x_{3})$, elle peut prendre la forme suivante :
> - $f(0,0,0)=1$
> - $f(0,0,1)=0$
> - $f(1,1,1)=0$
> - etc.
> 
> Il y a **$2^{3}$ combinaisons binaires** possibles pour les 3 variables donc **8 combinaisons**

# Portes `OU`, `ET`, `NON`

L'algèbre booléenne est plus facile à manimuler que l'algèbre ordinaire parce qu'il n'y a que **2 valeurs possibles** ⇒ pas de fraction, de partie décimale, de nombre négatif, de racine carrée...

> [!important] 3 opérations élémentaires
> - Addition logique : `OU` $+$
> - Multiplication logique : `ET` ‧
> - Inversion : `NON` $-$ *(barre de surlignement)*

## Fonction logique `OU`

Opération qui a au moins 2 entrées et sa sortie est 1 si au moins une des entrées est 1, avec une table de vérité :

| A   | B   | A+B |
| --- | --- | --- |
| 0   | 0   | 0   |
| 0   | 1   | 1   |
| 1   | 0   | 1   |
| 1   | 1   | 1   |

Deux symboles possibles pour `OU` :

![](images/Pasted%20image%2020230119144147.png)

> [!info] Propriétés
> - Associativité : $(A+B)+C=A+B+C$
> - Commutativité : $A+B=B+A$
> - Idempotence : $A+A=A$
> - L'élément neutre est le 0 : $A+0=A$
> - $A+\overline{A}=1$
> - $A+1=1$

### Exemple d'utilisation du `OU`
Dans certains systèmes de régulation industriels, on veut que la fonction de sortie se mette en marche quand une des valeurs entrées dépasse un seuil. Par exemple, dans un procédé chimique, l'alarme doit se déclencher **quand la température dépasse une valeur maximale OU quand la pression dépasse une certaine limite**.

On aura alors le montage suivant :

![](images/Pasted%20image%2020230119144752.png)

Dans ce système, la sortie des comparateurs passe à un niveau logique 1 quand la température atteint la température maximale (idem pour la pression P). 

Composants : les constructeurs de circuits intégrés proposent les boîtiers suivants : 
- 4 portes OU à 2 entrées : CI 7432
- 6 portes OU à 2 entrées : CI 74832

## Fonction logique `ET`

Opération avec au moins **2 entrées**, la sortie est dans l'état 1 si et seulement si **toutes les entrées sont à 1** (donc même règles que la multiplication classique)

Table de vérité :

| A   | B   | A‧B |
| --- | --- | --- |
| 0   | 0   | 0   |
| 0   | 1   | 0   |
| 1   | 0   | 0   |
| 1   | 1   | 1   |

2 symboles possibles :

![](images/Pasted%20image%2020230119145043.png)

> [!info] Propriétés
> - Associativité : $(A\cdot B)\cdot C=A\cdot B\cdot C$
> - Commutativité : $A\cdot B=B\cdot A$
> - Idempotence : $A\cdot A=A$
> - L'élément neutre est le 1 : $A\cdot 1=A$
> - La distributivité du `ET` par rapport au `OU` : $A\cdot (B+C)=AB+AC$
> - $A\cdot \overline{A}=0$
> - $A\cdot 0=0$

> [!tip] Remarque
> Le `OU` est également distributif par rapport au `ET` : $A+(B\cdot C)=(A+B)\cdot(A+C)$

### Exemple d'utilisation du `ET`

Déterminer la sortie $x$ de la porte `ET` suivante pour les formes d'ondes des entrées :
![](images/Pasted%20image%2020230119145525.png)

Donc $x$ égal à 1 seulement quand A et B sont égaux à 1 en même temps : intervalles $[t_{2};t_{3}]$ et $[t_{6};t_{7}]$

## Fonction logique `NON`

Opération avec **une seule entrée** et **une seule sortie**. Le `NON` prend l'état 1 si et seulement si son entrée est **à 0**.

> [!info] Vocabulaire
> On peut dire :
> - NON A
> - inverse de A
> - complément de A
> 
> Donc l'opération s'appelle aussi **l'inversion** ou la **complémentation**

Table de vérité

| $A$ | $\overline{A}$ |
| --- | -------------- |
| 0   | 1              |
| 1   | 0               |

Symboles possibles :

![](images/Pasted%20image%2020230119145915.png)


> [!info] Propriétés
> - $\overline{\overline{A}}=A$
> - $A+\overline{A}=1$
> - $A\cdot\overline{A}=0$
> - $A+\overline{A}\cdot B=A+B$ que l'on peut écrire aussi $\overline{A}+AB=\overline{A}+B$ ou encore $\overline{(B+C)}+(B+C)X=\overline{(B+C)}+X$

# Théorèmes de De Morgan
Deux théorèmes importants :

$$
\overline{A\cdot B\cdot C}=\overline{A}+\overline{B}+\overline{C}
$$
$$
\overline{A+ B+C}=\overline{A}\cdot\overline{B}\cdot\overline{C}
$$

Ces théorèmes permettent de simplifier des expressions :
1. une fonction `ET` peut être fabriquée à partir de `OU` et `NON`
2. une fonction `OU` peut être fabriquée à partir de `ET` et `NON`


1. On peut écrire avec la première forme : $A\cdot B=\overline{\overline{A\cdot B}}=\overline{\overline{A}+\overline{B}}$

![](images/Pasted%20image%2020230119150729.png)

2. On peut écrire avec la première forme : $A+ B=\overline{\overline{A+ B}}=\overline{\overline{A}\cdot\overline{B}}$

![](images/Pasted%20image%2020230119151028.png)

## Démonstration de $A+\overline{A}\cdot B=A+B$

$A+\overline{A}B = \overline{\overline{A+\overline{A}B}}$
En appliquant le théorème : $A+\overline{A}B=\overline{\overline{A}\cdot\overline{\overline{A}B}}=\overline{\overline{A}\cdot(A+\overline{B})}$ 
Et : $\overline{\overline{A}\cdot(A+\overline{B})}=\overline{\overline{A}A+\overline{A}\cdot\overline{B}}=\overline{\overline{A}\cdot\overline{B}}= A+B$

# Fonctions logiques `NON ET`, `NON OU`, `OU EXCLUSIF`

## Fonction logique `NON ET (NAND)`

Porte constituée par un inverseur à la sortie d'une porte `ET`. Portes très utilisés dans la réalisation des circuits logiques. **Toute expression logique est réalisable en n'utilisant que des portes NAND**

La table de vérité est l'inverse de la table de vérité du `ET`

| A   | B   | $\overline{A\cdot B}$ |
| --- | --- | -------------------- |
| 0   | 0   | 1                    |
| 0   | 1   | 1                    |
| 1   | 0   | 1                    |
| 1   | 1   | 0                    |

2 symboles possibles :
![](images/Pasted%20image%2020230119151733.png)

### Réalisation du `NON` avec des `NAND`

$F=\overline{A}$, on veut montrer qu'on peut arriver à $F$ avec des `NAND`

On peut réécrire $F=\overline{A\cdot A}$ donc :
![](images/Pasted%20image%2020230119152338.png)

### Réalisation du `ET` avec des `NAND`

$G=A\cdot B = \overline{\overline{A\cdot B}}$ ce qui correspond à la négation de `NAND`, donc :

![](images/Pasted%20image%2020230119152852.png)

### Réalisation du `OU` avec des `NAND`

$H = A+B =\overline{\overline{A+B}}=\overline{A}\cdot\overline{B}$, donc on voit apparaître une fonction `NAND` avec $\overline{A}$ et $\overline{B}$

![](images/Pasted%20image%2020230119153447.png)

### Exemple d'utilisation des portes `NAND` pour réaliser un circuit quelconque

Doit réaliser un circuit dont l'expression est $X=A\cdot B+C\cdot D$
**Contraintes :** il doit utiliser le moins de circuits intégrés (CI) possible

**Hypothèses :** CI disponibles suivants :
- 1 boîtier 7400 (4portes `NAND` 2 entrées)
- 1 boîtier 7408 (4portes `ET` 2 entrées)
- 1 boîtier 7432 (4portes `OU` 2 entrées)

#### Solution 1 : directe avec les portes `ET`, `OU`

![](images/Pasted%20image%2020230119153749.png)

#### Solution 2 : avec des portes `NAND` uniquement

![](images/Pasted%20image%2020230119153843.png)

## Fonction logique `NON OU (NOR)`

Une porte `NOR` a un fonctionnement analogue à une porte `OU` suivie d'un inverseur : expression de sortie $X = \overline{A+B}$

Table de vérité inverse du `OU` :

| A   | B   | $\overline{A+B}$ |
| --- | --- | ---------------- |
| 0   | 0   | 1                |
| 0   | 1   | 0                |
| 1   | 0   | 0                |
| 1   | 1   | 0                |

Symboles :

![](images/Pasted%20image%2020230119154118.png)

### Réalisation du `NON` avec des `NOR`

On a $\overline{A}=\overline{A+A}$ donc on peut utiliser 1 seul `NOR`

![](images/Pasted%20image%2020230119154931.png)

### Réalisation du `OU` avec des `NOR`

$A+B=\overline{\overline{A+B}}$ donc on a besoin d'inverser $A+B$ avec 1 `NOR`, puis de ré-inverser avec un autre `NOR`$

![](images/Pasted%20image%2020230119155009.png)

### Réalisation du `ET` avec des `NOR`

$A\cdot B=\overline{\overline{A\cdot B}}=\overline{\overline{A}+\overline{B}}$ donc on inverse $A$ et $B$ en utilisant 1 `NOR` pour chacun et on les additionne avec 1 `NOR`

![](images/Pasted%20image%2020230119154959.png)

### Exercice d'application de la fonction `NOR`

Forme d'onde de sortie de la porte `NOR` par rapport à celles de ses 3 entrées en fonction du temps :

![](images/Pasted%20image%2020230126140927.png)

## Fonction logique `OU EXCLUSIF (XOR)`

Fonction logique égale à 1 si on a un **nombre impair** de 1 à l'entrée
La sortie d'une fonction OU EXCLUSIF (XOR) à deux entrées est dans l'état 1 si une entrée et seulement une est dans l'état 1 ↔ niveau haut en sortie quand les signaux sur les deux entrées sont opposés

**Table de vérité :**

| A   | B   | $A\oplus B$ |
| --- | --- | ----------- |
| 0   | 0   | 0           |
| 0   | 1   | 1           |
| 1   | 0   | 1           |
| 1   | 1   | 0           |

> [!important] Egalité du `XOR`
> $A\oplus B =\overline{A}B+A\overline{B}$

**2 symboles différents :**

![](images/Pasted%20image%2020230126141258.png)

> [!info] Propriétés
> - Associativité
> - Commutativité
> - $A\oplus 0=A$
> - $A\oplus A=0$
> - $A\oplus\overline{A}=1$
> - $A\oplus 1=\overline{A}$

La fonction `XOR` existe en circuit intégré (7486)

### Fonction `NON OU EXCLUSIF`

Cette fonction s'appelle aussi fonction **coïncidence**, elle existe comme circuit intégré (CI 74LS266)
Elle peut s'écrire : $\overline{A\oplus B}=\overline{A}\times\overline{B}+A\times B$
Sa table de vérité est l'inverse du `XOR`

Ses symboles sont :

![](images/Pasted%20image%2020230126141756.png)

# Exercices d'applications
## Exercice 1

*Complétez les théorèmes de Boole suivants. X représente une variable binaire prenant soit la valeur 0, soit la valeur 1*

![](images/Pasted%20image%2020230126142126.png)

## Exercice 2

*a) En utilisant les propriétés vues pendant le cours, donner une autre expression de z, qui sera plus simple :*
$$z=(\overline{A}+B)(A+B)$$
*b) Même question pour x :*
$$x=ACD+\overline{A}BCD$$

a) $z=\overline{A}A+\overline{A}B+BA+BB = 0 +\overline{A}B+AB+B=B(\overline{A}+A)+B$ donc $z=B(1)+B=B$

b) $x=CD(A+\overline{A}B)$, et d'après les [Théorèmes de De Morgan](#Théorèmes%20de%20De%20Morgan), $A+\overline{A}B=A+B$ donc $x=CD(A+B)$

## Exercice 3

*Démontrez les théorèmes de De Morgan, en utilisant tous les cas possibles.*

| A   | B   | $\overline{A}$ | $\overline{B}$ | $\overline{AB}$ | $\overline{A}+\overline{B}$ |
| --- | --- | -------------- | -------------- | --------------- | --------------------------- |
| 0   | 0   | 1              | 1              | 1               | 1                           |
| 0   | 1   | 1              | 0              | 1               | 1                           |
| 1   | 0   | 0              | 1              | 1               | 1                           |
| 1   | 1   | 0              | 0              | 0               | 0                            |

## Exercice 4

*Tracer le schéma logique correspondant aux expressions suivantes, en utilisant les portes logiques OU, ET et NON :*
$$y = AC+B\overline{C}+\overline{A}BC$$
$$\overline{(A+B+\overline{C}D\overline{E})}+\overline{B}C\overline{D}$$
