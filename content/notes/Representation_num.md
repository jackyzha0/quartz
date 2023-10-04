---
title: "Numération : représentation des nombres"
tags :
 - info
 - codage
 - maths
---

## I Système de numération
### I.1 - Introduction

Un entier naturel N dans une base b, peut se décomposer tel que :
$$N_{b} = \alpha_{p}\alpha_{p-1}...\alpha_{1}\alpha_{0}$$  avec les symboles $\alpha_{i} \rightarrow 0 < \alpha_{i}<b-1$   (i position du symbole -1 car le premier i est 0)

> [!danger] Attention !
>
> $N_{b} = \alpha_{p}\alpha_{p-1}...\alpha_{1}\alpha_{0}$ ne signifie pas que N peut s'écrire sous la forme d'une multiplication, c'est bien la suite de symboles qu'on représente.
> Par exemple N = 12 avec $\alpha_{0} = 1$ et $\alpha_{1} = 2$

Donc $\alpha_{i}$ dépend de la base utilisée, par exemple en base 10 : $0 < \alpha_{i}<9$

Pour une base $b$ donnée, on peut la représenter dans une base 10 à chaque fois :
$$N_{(b)}\sum_{i=0}^{p} \alpha_{i}b^{i}$$ avec $b^{i}$ le poids associé au symbole $\alpha_{i}$

La signification du symbole dépend de son poids (donc de sa place dans la suite de symboles représentant le nombre) → **position du symbole très importante**

> [!example] Exemple
>
> 15 $\neq$ 51
> même symbole mais avec des positions différentes

Même chose pour la partie fractionnaire avec $b^{i} \rightarrow i<0$  donc $b^{i}<1$

### I.2 - nombres décimaux - base 10

Les symboles en base 10 : $0 < \alpha_{i}<9$
Les poids sont des puissances de 10 positives : $10^{i}$

> [!example] Décomposer 1987 en base 10
>
> $1987 = 7\times 10^{0} + 9\times 10^{1} + 9\times 10^{2} + 1\times 10^{3}$
>
> 7 est dit le **poids faible** (nombre tout à droite)


> [!danger] Attention dans la décomposition
>
> décalage d'indice entre la position et le poids (dans l'exemple précédent, 9 est à la troisième position mais avec un poids de 2)


#### Partie fractionnaire (après la virgule)
Donc $i<0$ et $n_{10} = \sum_{p}^{i-1}\alpha_{i}10^{i}$

Même chose que précédemment mais les puissances de 10 sont négatives (car $i<0$)

> [!example] Décomposer 25,308 en base 10
>
> $25,308 = 8\times 10^{-3} + 0\times 10^{-2} + 3\times 10^{-1} + 5\times 10^{0} + 2\times 10^{1}$

### I.3 - nombres binaires (base 2)
Base la + utlisée en informatique : a deux valeur (0 ou 1), que l'on peut aussi noter (Vrai/Faux)

Les symboles utilisés dans la base binaires = **bits** (binary digit)
**8 bits = 1 octect** => stockage des informations en octetcs

Donc, l'écriture d'un nombre en base 2 est tel que :
$$N_{(2)}=\sum_{i=0}^{p} \alpha_{i}2^{i} = \alpha_{0}2^{0} +...+ \alpha_{p}2^{p}$$ qui en écriture donne : $\alpha_{p}...\alpha_{0}$

> [!danger] Attention !
>
> Entre la représentation d'un nombre par sa somme de symboles et de poids et son écriture, on inverse le sens !
> La **première position** est celle toute à droite en écriture

- **Most Significant Bit (MSB)** :$\alpha_{p}$
- **Less Significant Bit (LSB)** : $\alpha_{0}$

> [!example] Décomposer 101 ("un zéro un" et non "cent-un")
>
> $101_{(2)} = 1\times 2^{0} + 0\times 2^{1} + 1\times 2^{2}$

On peut faire de même qu'en base 10 pour la partie fractionnaire.

#### Tableau des puissances de 2

| $2^{10}$ | $2^{9}$ | $2^{8}$         | $2^{7}$ | $2^{6}$ | $2^{5}$ | $2^{4}$ | $2^{3}$ | $2^{2}$ | $2^{1}$ |
| -------- | ------- | --------------- | ------- | ------- | ------- | ------- | ------- | ------- | ------- |
| **1024** | 512     | **256** (octet) | 128     | 64      | 32      | 16      | 8       | 4       |   3      |

| $2^{0}$ | $2^{-1}$ | $2^{-2}$ | $2^{-3}$ |
| ------- | -------- | -------- | -------- |
| 1       | 0.5      | 0.25     | 0.125    |

### I.4 - nombres hexadécimaux (base 16)

Très utilisée en informatique pour l'affichage des nombres binaires car **1 hexadécimal correspond à 4 bits**

$$N_{(2)}\sum_{i=0}^{p} \alpha_{i}16^{i} = \alpha_{0}16^{0} +...+ \alpha_{p}16^{p}$$ avec $0 < \alpha_{i}<15$$

- **Symboles :** {0, 1, ..., 9, **A, B, C, D, E, F**}
- **Poids** : puissances positives de 16

#### Tableau de correspondance

| A   | B   | C   | D   | E   | F   |
| --- | --- | --- | --- | --- | --- |
| 10  | 11  | 12  | 13  | 14  | 15  |

> [!example] Décomposer AF,D8<sub>(16)</sub> en base 16
>
> $AF,D8_{(16)}=8\times 16^{-2} + D\times 16^{-1} + F\times 16^{0} +A\times 16^{1}$

## II Conversions (transcodage)
On cherche les opérations pour changer de base. Plus la base est petite, plus le nombre de symboles équivalent en sortie de conversion est grand.

### II.1 - Conversion d'un nombre en base b (2 ou 16) à un nombre en base 10

Conversion la plus simple, toujours la même méthode utilisée --> **écriture polynomiale** :
$$N_{b}=\sum_{i=0}^{p} \alpha_{i}b^{i} = N_{10}$$

> [!example] Convertir 10011<sub>(2)</sub> en base 10
>
> $10011_{(2)}= 1\times 2^{0} + 2\times 2^{1} + 0\times 2^{2} + 0\times 2^{3} + 1\times 2^{4}$
> $10011_{(2)}= 1 + 2 + 0 + 0 + 16 = 19_{(10)}$

De même avec la base 16 :

> [!example] Convertir 5EA<sub>(16)</sub> en base 10
>
> $5EA_{16}=A\times16^{0} + E\times16^{1} + 5\times16^{2} = 10 + 14\times 16 +5\times256 = 1514_{(10)}$
> *A vaut 10, E vaut 14 en base 16*

### II.2 - Conversion d'un nombre en base 10 à un nombre en base b (2 ou 16)

Méthode un peu plus complexe que dans l'autre sens. Il existe 2 méthodes :
- par soustraction
- par division

#### Méthode par soustraction

1. Recherche du poids le plus proche inférieur de N dans la base b : $b^{k-1}$
2. Soustraction de N<sub>(10)</sub> du nombre qui multiplie cette puissance
3. Retour à l'étape 2 avec le nombre obtenu
4. Fin quand on arrive à $b^{0}$ pour la partie entière (donc $k=1$)

> [!danger] Partie fractionnaire
>
> Même méthode, poids fort à droite de la virgule (contrairement au nombre entier où le poids fort est à gauche de la virgule)
> Mais **attention**, le procédé peut devenir infini

**Nombre de bits nécessaires :**
$$k = \lfloor log_{2}(N_{(10)}) \rfloor +1$$
$$\text{ou}$$
$$2^{k-1}<N_{(10)}<2^{k}$$

> [!example] Convertir 95<sub>(10)</sub> en base 2
>
> 1. Puissance de 2 la plus proche de 95 : 64
> 2. On soustrait à 95 une fois 64 (car on a 1 fois 64 max dans 95) : $95 - 64 = 41$
> 3. On répète l'opération : puissance de 2 la plus proche --> 32 donc $31 - 0\times32 = 31$
>
> On a donc :
>
> - $95 - 1\times64 = 31$
> - $31 - 0\times32 = 31$
> - $31 - 1\times 16 = 15$
> - $15 - 1\times 8 = 7$
> - $7 - 1\times 4 = 3$
> - $3 - 1\times 2 = 1$
> - $1 - 1 = 0$
>
> Donc on a $95_{(10)}=1011111_{(2)}$


> [!example] Convertir 95<sub>(10)</sub> en base 16
>
> - $95 - 5\times16 = 15$
> - $15 - 15\times 16^{0} = 0$
>
> Donc $95_{(10)}=5F_{(16)}$


#### Méthode par divisions euclidiennes successives par b
##### Partie entière


> [!danger] Attention
>
> Lecture de bas en haut pour cette méthode contrairement à la méthode précédente qui se fait de haut en bas


> [!example] Convertir 95<sub>(10)</sub> en base 2
>
> $$
> \begin{aligned}
> \begin{array}{rl}
> 95 & |\underline{2} \\
> 94 &  47 \\
> 1
> \end{array}
> \end{aligned}
> $$
>
> Puis, on prend le quotient de la division et on répète l'opération :
>
> $$
> \begin{aligned}
> \begin{array}{rl}
> 47 & |\underline{2} \\
> 46 &  23 \\
> 1
> \end{array}
> \end{aligned}
> $$
> $$
> \begin{aligned}
> \begin{array}{rl}
> 23 & |\underline{2} \\
> 22 &  11 \\
> 1
> \end{array}
> \end{aligned}
> $$
> $$
> \begin{aligned}
> \begin{array}{rl}
> 11 & |\underline{2} \\
> 10 &  5 \\
> 1
> \end{array}
> \end{aligned}
> $$
> $$
> \begin{aligned}
> \begin{array}{rl}
> 5 & |\underline{2} \\
> 4 &  2 \\
> 1
> \end{array}
> \end{aligned}
> $$
> $$
> \begin{aligned}
> \begin{array}{rl}
> 2 & |\underline{2} \\
> 2 &  1 \\
> 0
> \end{array}
> \end{aligned}
> $$
> $$
> \begin{aligned}
> \begin{array}{rl}
> 1 & |\underline{2} \\
> 0 &  0 \\
> 1
> \end{array}
> \end{aligned}
> $$
> Le quotient est égal à 0 donc on s'arrêt à cette étape
>
> Donc on obtient le nombre (**lecture de bas en haut des restes**) : $1011111_{(2)}$


> [!example] Convertir 95<sub>(10)</sub> en base 2
>
> $$
> \begin{aligned}
> \begin{array}{rl}
> 95&|\underline{16} \\
> 80 &  5 \\
> 15
> \end{array}
> \end{aligned}
> $$
> $$
> \begin{aligned}
> \begin{array}{rl}
> 5 &|\underline{16} \\
> 0 &  0 \\
> 5
> \end{array}
> \end{aligned}
> $$
>
> Donc les restes sont $5$ et $15$ donc le nombre est $5F_{(16)}$



> [!hint] Petites astuces
>
> - Les multiples de b se terminent par 0 :
  $2\times 7=14_{(10)} = 1110_{(2)}$
> - Les multiples de b<sup>2</sup> se terminent par 00 :
>   $2^{2}\times 3=12_{(10)} = 1100_{(2)}$
> - Les multiples de b<sup>3</sup> se terminent par 000 :
>   $2^{3}\times 4=24_{(10)} = 11000_{(2)}$
>
> (fonctionne en base 10 : 100 = 10<sup>2</sup>)
>
> **Pour la conversion en base binaire** :
> Avec n bits $\rightarrow$ 2<sup>n</sup> (valeurs de 0 à 2<sup>n-1</sup>)
>
> | Nombre de bits   | 4      | 8       | 16         | 32                |
> | ---------------- | ------ | ------- | ---------- | ----------------- |
> | Plage de valeurs | 0 à 15 | 0 à 255 | 0 à 65 535 | 0 à 4 294 672 296 |


##### Partie fractionnaire
On peut utiliser la [Méthode par soustraction](#Méthode%20par%20soustraction) pour la partie fractionnaire

La méthode de division successive ne fonctionne pas donc on utilise la méthode de **multiplication successives par b**
	=> Le calcul peut être infini pour la partie fractionnaire


> [!example] Convertir 0,375<sub>(10)</sub> en base 2
>
> $$
> \begin{aligned}
> 0,375 \times 2 = 0,75 \\
> 0,75 \times 2 = 1,5 \\
> 0,5 \times 2 = 1,0
> \end{aligned}
> $$
> On s'arrête lorsque l'on atteint x **,0**
>
> On lit les chiffres entiers pour la partie décimale : donc $0,375_{(10)}=0,011_{(2)}$
>
> ***Convertir 0,375<sub>(10)</sub> en base 16***
> $$
> \begin{aligned}
> 0,375 \times 16 = 6,0
> \end{aligned}
> $$
>
> Donc : $0,375_{(10)}=0,6_{(16)}$

### II.3 - Conversion d'un nombre entre les bases 2 et 16

Base binaire = 2<sup>2</sup>
Base hexadécimale = 2<sup>4</sup>
Donc la conversion est assez rapide car on peut faire des paquets de bits


> [!info] **Hexadécimal vers binaire**
>
> Chaque symbole est remplacé par 4 bits

> [!info] **Binaire vers hexadécimal**
> - 1 paquet de 4 bits = 1 symbole
> - Séparation de la partie entière et de la partie fractionnaire
> 	- **Partie entière** : de la droite vers la gauche
> 	- **Partie fractionnaire** : de la gauche vers la droite
> - **Rajouter des 0 si besoin**


> [!example] Convertir FA,8<sub>(16)</sub> en base 2
> - F en binaire : 1111<sub>(2)</sub> (on peut passer par l'intermédiaire de la base 10, où F vaut 15 si besoin)
> - A en binaire : 1010<sub>(2)</sub>
> - 8 en binaire : 1000 (car $8=2^{3}$)
>
> Donc : $F1,8_{(16)}=1111\ 1010, 1000_{(2)}$


> [!example] Convertir 10111,01<sub>(2)</sub> en base 16
>
> On ajoute des 0 à gauche de la virgule et à droite de la virgule pour avoir des paquets de 4 bits
   <mark style="background: #FFF3A3A6;">001</mark> 0111, 01<mark style="background: #FFF3A3A6;">00</mark>
>
> Donc :
> - 0001<sub>(2)</sub> = 1<sub>(16)</sub>
> - 0111<sub>(2)</sub> = 7<sub>(16)</sub>
> - 0100<sub>(2)</sub> = 4<sub>(16)</sub>
>
> Soit :  0001 0111,0100<sub>(2)</sub> = 17,4<sub>(16)</sub>


## III Opérations
### Additions
Comme en décimal (indiquer les retenues)


> [!info] Règles en base 2
> - 1<sub>(2)</sub> + 1<sub>(2)</sub> = 10<sub>(2)</sub>
> - 1<sub>(2)</sub> + 0<sub>(2)</sub> = 1<sub>(2)</sub>
> - 1<sub>(2)</sub> + 1<sub>(2)</sub> + 1<sub>(2)</sub> = 11<sub>(2)</sub>


> [!example] 111<sub>(2)</sub> + 011<sub>(2)</sub>
>
> $$
> \begin{aligned}
> \begin{array}{rl}
> &①& ① & ① & \\
> && 1 & 1 & 1 \\
> \text{+} && 0 & 1 & 1 \\
> && - & - & - \\
> &1& 0 & 1 &  0
> \end{array}
> \end{aligned}
> $$


> [!tip] Astuce pour la base 16
>
> On complète pour arriver à 10<sub>(16)</sub>
>
> *Exemples*
> - A<sub>(16)</sub> + <mark style="background: #FF5582A6;">8<sub>(16)</sub></mark>
>   = A<sub>(16)</sub> + <mark style="background: #FF5582A6;">6<sub>(16)</sub> +2<sub>(16)</sub></mark> car A+6 = 16
>
> Donc A<sub>(16)</sub> + 8<sub>(16)</sub> = 10<sub>(16)</sub> + 2<sub>(16)</sub> = 12<sub>(16)</sub>
>
> - C<sub>(16)</sub> + <mark style="background: #FFB86CA6;">8<sub>(16)</sub></mark> = C<sub>(16)</sub> + <mark style="background: #FFB86CA6;">4<sub>(16)</sub> + 4<sub>(16)</sub></mark> = 14<sub>(16)</sub>


> [!example] 68<sub>(16)</sub> + 3A<sub>(16)</sub>
>
> $$
> \begin{aligned}
> \begin{array}{rl}
>   & ① & \\
>  & 6 & 8 \\
> \text{+}   & 3 & A \\
>  & - & - \\
>  & A &  2
> \end{array}
> \end{aligned}
> $$

### Soustractions


> [!info] Règles pour la base 2
>
> 1<sub>(2)</sub> - 1<sub>(2)</sub> = 0
>
> 10<sub>(2)</sub> - 1<sub>(2)</sub> = 1



> [!example] Exemples en base 2
>
> 111<sub>(2)</sub> - 011<sub>(2)</sub>
>
> $$
> \begin{aligned}
> \begin{array}{rl}
> & 1 & 1 & 1 \\
> \text{-} & 0 & 1 & 1 \\
> & - & - & - \\
> & 1 & 0 &  0
> \end{array}
> \end{aligned}
> $$
>
> 100<sub>(2)</sub> - 011<sub>(2)</sub>
>
> $$
> \begin{aligned}
> \begin{array}{rl}
> & 1 & _{①}0 & _{①}0 \\
> \text{-} &  _{+①}0 & _{+①}1 & 1 \\
> & - & - & - \\
> & 0 & 0 &  1
> \end{array}
> \end{aligned}
> $$
>
> Car 0 - (1 + 1) = 0 - 10 --> on doit rajouter une unité



> [!example] Exemple en base 16
>
> 68<sub>(16)</sub> - 3A<sub>(16)</sub>
>
> $$
> \begin{aligned}
> \begin{array}{rl}
>  & 6 & _{①}8 \\
>  \text{-} & _{+①}3 & A \\
>  & - & - \\
>  & 2 &  E
> \end{array}
> \end{aligned}
> $$

> [!tip] Astuces en base 16
>
> Pour faire 18 - A, de la même manière que pour l'[addition](#Additions) on complète à 10<sub>(16)</sub>. Comme A = 8+2, on a :
> 18<sub>(16)</sub> - A<sub>(16)</sub> = 18<sub>(16)</sub> - 8<sub>(16)</sub> - 2<sub>(16)</sub> = 10<sub>(16)</sub> - 2<sub>(16)</sub> = E<sub>(16)</sub>
>
> Autre exemple :
> 15<sub>(16)</sub> - <mark style="background: #BBFABBA6;">8<sub>(16)</sub></mark>
> Pour aller à 10<sub>(16)</sub>, on a : 15<sub>(16)</sub> - 5<sub>(16)</sub>
> Donc en décomposant 8<sub>(16)</sub> :
> 15<sub>(16)</sub> <mark style="background: #BBFABBA6;">- 5<sub>(16)</sub> - 3<sub>(16)</sub></mark> = <mark style="background: #FFF3A3A6;">10<sub>(16)</sub></mark> - 3<sub>(16)</sub> = <mark style="background: #FF5582A6;">D<sub>(16)</sub></mark>
>
> (car on a en base 16 : 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, A, B, C, <mark style="background: #FF5582A6;">D</mark>, E, F, <mark style="background: #FFF3A3A6;">10</mark>, 11, 12 ... 1A, 1B ... etc.)

# Conclusion
On a vu les différentes manières de coder un nombre dans différentes bases. Les nombres ne sont pas directement codés en binaire, ou en hexadécimal, il existe des **formats** pour les  [coder en machine](Systemes_num.md).
