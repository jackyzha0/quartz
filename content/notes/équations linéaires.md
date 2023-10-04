---
title: "Equations linéaires"
tags:
- maths
- algèbre
---

# Introduction aux systèmes linéaires

![](images/Pasted%20image%2020230127075447.png)

Pour résoudre un système linéaire de ce type ⇒ utilisation d'un **algorithme**

Dans le cas d'une intersection de droites (2 inconnues), les solutions peuvent être :
- **infinies** : les droites sont confondues
- **uniques** : un point d'intersection
- **pas de solution** : les droites ne se croisent pas.

Dans le cas d'une intersection de plans (3 inconnues), les solutions peuvent être :
- **infinies** : 
	- une droite
	- un plan
- **uniques** : un point d'intersection
- **pas de solutions.**

> [!info] Opérations possibles sur un système
> - Échanger 2 lignes
> - Multiplier (ou diviser) par un réel **non nul**
> - Ajouter à une équation un multiple d'une autre équation ($L_{2}\leftarrow L_{2}-L_{1}$ qui correspond à soustraire la première ligne à la seconde)

# Matrices, vecteurs

Une matrice est un tableau :
$$
\begin{bmatrix}
3&21&-3&0 \\ -6&-2&-1&62 \\ 2&-3&8&32
\end{bmatrix}
$$

Il s'agit d'une matrice $3\times 4$ car elle a **3 lignes** et **4 colonnes**.

> [!info] Matrices
> On note une matrice $A$ de dimension $n\times m$ une matrice avec $n$ lignes et $m$ colonnes.
> - L'élement $a_{ij}$ de la matrice $A$ correspond à l'élément situé à la $i_{ème}$ ligne et la $j_{ème}$ colonne
> - Deux matrices $A = [a_{ij}]$ et $B = [b_{ij}]$ sont égales si elles ont la même taille et tous les coefficients sont égaux
> - Une matrice $A = [a_{ij}]$  de taille $n\times m$ est une matrice carrée si elle a autant de lignes que de colonnes. Les coefficients $a_{11}, a_{22},...,a_{nn}$ constituent la diagonale de A. 
> - Une matrice carrée de taille $n\times n$ est dite diagonale si les coefficients au-dessus et en dessous de la diagonale sont nuls, c’est-à-dire $a_{ij} = 0$ quand$i \neq j$ 
> - Une matrice carrée de taille $n\times n$ est dite triangulaire supérieure si les coefficients au-dessous de la diagonale sont nuls, c’est-à-dire  $a_{ij} = 0$ quand $i > j$.

## Matrice augmentée

La matrice augmentée d'un système permet de représenter le système dans une matrice.

Par exemple, pour passer du système :

$$
\begin{cases}
2x+8y+4z=2 \\ 2x+5y+z=5 \\ 4x+10y-z=1
\end{cases}
$$

On a la matrice augmentée suivante (on représente les coefficients des différentes variables dans la matrice augmentée) :

$$
\begin{bmatrix}
2&8&4&|&2 \\ 2&5&1&|&5 \\ 4&10&-1&|&1
\end{bmatrix}
$$

> [!warning] Matrice des coefficients
> On peut aussi représenter la matrice des coefficients du système :
> $$
> \begin{bmatrix}
> 2&8&4 \\ 2&5&1 \\ 4&10&-1
> \end{bmatrix}
> $$
> Mais elle ne permet pas de résoudre le système

Pour un système de $n$ équations avec $m$ inconnues, la matrice des coefficients est de taille $n\times m$, alors que la **matrice augmentée** est de taille $n\times m+1$

> [!tip] Opérations sur les matrices
> On peut faire les mêmes opérations sur les matrices que sur les **systèmes linéaires**

# Algorithme de Gauss-Jordan

Cet algorithme permet de résoudre les systèmes linéaires :

1. On place un "curseur" à l'indice en haut à gauche de la matrice. Si la valeur du curseur est nulle, on cherche une ligne (vers le bas) où le coefficient de la colonne du curseur est non nulle et on échange cette ligne avec la ligne du curseur. S'il n'y en a pas, on bouge le curseur vers la droite et on recommence. *Si ce n'est pas possible, on s'arrête*
2. On divise la ligne du curseur par la valeur du curseur
3. On éliminé tous les coefficients de la colonne du curseur qui ne sont pas sur la ligne du curseur en soustrayant à chaque ligne des multiples adaptés de la ligne du curseur
4. On bouge le curseur une ligne plus bas et une colonne vers la droite. *Si ce n'est pas possible, on s'arrête. Sinon on retourne à l'étape 1*

# Forme réduite échelonnée par ligne (Frel)

> [!info] Définition de la Frel
> Une matrice est une Frel si :
> - Si une ligne a un coefficient $\neq 0$, alors son premier coefficient $\neq 0$ (en partant de la gauche), appelé **pivot** est **égal à 1**
> - Dans la colonne d'un pivot, les **autres coefficients sont égaux à 0**
> - Si une ligne a un pivot, alors toutes les autres lignes au-dessus ont un pivot à **gauche** de celui-ci

L'algorithme de Gauss permet d'aboutir à une Frel, par exemple la matrice suivante :
$$
\begin{bmatrix}
\textcolor{red}{1}&2&0&3&0&|&2 \\ 0&0&\textcolor{red}{1}&-1&0&|&2 \\ 0&0&0&0&\textcolor{red}{1}&|&-2 \\ 0&0&0&0&0&|&0
\end{bmatrix}
$$
est une Frel, avec les <mark style="background: #FF5582A6;">pivots</mark> correspondants.

# Consistance d'un système

> [!info] Définition
> Un système est **consistant** si il a au moins **une solution**, **inconsistant** sinon.

> [!important] Nombre de solutions d'un système linéaire
> On note $A$ la matrice des coefficients du système et $B$ sa matrice augmentée
> - Un système est **inconsistant** $\Leftrightarrow Frel(B)$ contient la ligne $\begin{bmatrix}0&0&0&|&1\end{bmatrix}$, qui représente l'équation $0=1$
> - Si un système est **consistant**, alors il a soit :
> 	- exactement **une solution**, quand $Frel(A)$ a un pivot par colonne
> 	- une **infinité de solutions** quand une colonne de $Frel(A)$ ne contient pas de pivot. Les variables correspondant à une colonne sans pivots sont appelées **libres**

# Rang d'une matrice

> [!info] Définition du rang
> Le rang d'une matrice $M$ est le nombre de pivots dans $Frel(M)$

> [!important] Théorème sur le rang
> On note $A$ la matrice des coefficients d'un système, de taille $n\times m$
> 
 > 1. On a **toujours** $\text{Rang}(A)\leq n$ et $\text{Rang}(A)\leq m$
> 2. Si $\text{Rang}(A)=n$, alors le système est **consistant**.
> 3. Si $\text{Rang}(A)=m$, alors le système a **au plus une solution.**
> 4. Si $\text{Rang}(A) <m$ alors le système a soit une **infinité de solutions**, soit **aucune.**

La propriété **4** revient à dire que l'on a moins d'1 pivot par colonne. Donc il existera des variables libres, ce qui conduit à une infinité de solutions (qui dépendent d'un paramètre) ou pas de solutions (si l'on a par exemple une ligne telle que $\begin{bmatrix}0&0&0&|&1\end{bmatrix}$)

> [!important] Théorème avec un système ayant moins d'équations que d'inconnues
> Un tel système a soit :
> - pas de solutions
> - une infinité de solutions
>   
> Car on n'aura forcément pas assez de pivots pour chaque colonne donc des variables libres


Un système linéaire avec $n$ équations et $n$ lignes (donc avec une matrice des coefficients de taille $n\times n$) admet une unique solution si $\text{Rang}(M)=n$. La matrice des coefficients obtenue est la matrice **identité**, qui est une matrice diagonale avec uniquement des 1 comme coefficients :
$$
\begin{bmatrix}
1&0&0&...&0 \\ 0&1&0&...&0 \\ 0&0&1&...&0 \\ ...&...&...&...&... \\ 0&0&0&...&1
\end{bmatrix}
$$

# Système avec des paramètres

Avec un système qui comporte des paramètres, on a par exemple la matrice :

$$
\begin{bmatrix}
1&-1&1&|&m \\ 1&m&-1&|&1 \\ 1&-1&-1&|&1
\end{bmatrix}
$$

On cherche alors à exprimer les coefficients **sans paramètres** et sous forme de Frel.

Par exemple, on peut faire : 
$$
\begin{cases}
L_{2}\leftarrow L_{2}-L_1 \\ L_{3}\leftarrow L_{3}-L_{1}
\end{cases}
$$

Ce qui nous donne la matrice

$$
\begin{bmatrix}
1&-1&1&|&m \\ 0&m+1&-1&|&1-m \\ 0&0&-2&|&1-m
\end{bmatrix}
$$

On peut donc raisonner selon la valeur de $m$. Si $m+1\neq 0$, donc si $m\in \mathbb{R}\backslash\{-1\}$, alors on peut diviser les lignes du système par $m+1$ et donc pouvoir aboutir à une Frel.

On obtient finalement la matrice (après différentes étapes de division etc) :

$$
\begin{bmatrix}
1&-1&0&|&0 \\ 0&0&1&|&-1 \\ 0&0&0&|&0
\end{bmatrix}
$$

# Calcul matriciel

> [!info] Somme de matrices
> Soient $A$ et $B$ de taille $n\times m$. La matrice $A+B$ est la matrice de taille $n\times m$ dont le coefficient de la $i_{ème}$ ligne et de la $j_{ème}$ colonne est égal à $a_{ij}+b_{ij}$

> [!danger] Conditions pour la somme de matrices
> Les matrices dont on fait la somme doivent être de **même taille**. Sinon, on ne peut pas les additionner

> [!info] Produit d'une matrice par un scalaire
> Soit $A$ une matrice de taille $n\times m$ et $k\in \mathbb{R}$. La matrice $k\cdot A$ est une matrice dont le coefficient de la $i_{ème}$ ligne et de la $j_{ème}$ colonne est égal à $k\cdot a_{ij}$.

> [!info] Produit d'une matrice par un vecteur
> Soit $A$ une matrice de taille $n\times m$ dont les vecteurs colonnes sont les $m$ vecteurs de $\mathbb{R}^{n}$ notés $\overrightarrow{V_{1}},\overrightarrow{V_{2}},...,\overrightarrow{V_{m}}$, et soit $\overrightarrow{x}\in\mathbb{R}^{n}$ dont les composantes sont notées $x_{1},x_{2},...,x_{m}$. Alors le produit $A\cdot \overrightarrow{x}$ est noté :
> $$
> \begin{bmatrix}
> \overrightarrow{V_{1}}&\overrightarrow{V_{2}}&...&\overrightarrow{V_{m}}
> \end{bmatrix} \cdot 
> \begin{bmatrix}
> x_{1}  \\ x_{2} \\ . \\ . \\ x_{m}
> \end{bmatrix} =x_{1}\overrightarrow{V_{1}}+=x_{2}\overrightarrow{V_{2}}+...+=x_{m}\overrightarrow{V_{m}}
> $$

Le produit d'une matrice par un vecteur donne une **combinaison linéaire** : expression construite à partir d'un ensemble de termes en multipliant chaque terme par une constante et en ajoutant le résultat. Par exemple, une combinaison linéaire de _x_ et _y_ serait une expression de la forme _ax + by_, où _a_ et _b_ sont des constantes.

> [!important] Propriétés sur les opérations de matrices
> - Associativité : $(A+B)+C=A+(B+C)$ et $(\alpha\beta)A=\alpha(\beta A)$

# Relation entre vecteurs et systèmes

$$
\begin{cases} 3x_{1}+x_{2}=7 \\
x_{1}+2x_{2}=4
\end{cases} \rightarrow 
\begin{bmatrix} 3x_{1}+x_{2} \\ x_{1}+2x_{2}
\end{bmatrix} =
\begin{bmatrix} 7 \\ 4
\end{bmatrix}
$$

D'où l'écriture suivante, sous forme de produits de matrices et de vecteurs :
$$
\begin{bmatrix} 3x_{1} \\ x_{1}
\end{bmatrix} +
\begin{bmatrix} x_{2} \\ 2x_{2}
\end{bmatrix} =
\begin{bmatrix} 7 \\ 4
\end{bmatrix} \rightarrow
x_{1}\begin{bmatrix} 3 \\ \textcolor{red}{1}
\end{bmatrix} +
x_{2}\begin{bmatrix} \textcolor{blue}{1} \\ 2
\end{bmatrix} =
\begin{bmatrix} 7 \\ 4
\end{bmatrix} \rightarrow
\begin{bmatrix} 3&\textcolor{blue}{1} \\ \textcolor{red}{1}&2
\end{bmatrix}
\begin{bmatrix} x_{1} \\ x_{2}
\end{bmatrix} = \begin{bmatrix} 7 \\ 4 \end{bmatrix}
$$
Donc, à partir d'un système linéaire, on peut aboutir à une équation d'un produit de matrices.