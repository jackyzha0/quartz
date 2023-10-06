---
title: "Numération : formats utilisés en machine"
tags:
- info
- codage
---

# Introduction
Dans [Numération : représentation des nombres](Representation_num.md), on a vu la représentation générale des nombres dans toutes les bases

On va voir ici comment les nombres sont codés dans un ordinateur : le **format** $\neq$ **nombres**.
- Limitations physiques (tailles des "mots" limités : 16, 32 ou 64 bits donc nombre d'octects fixes)
- Traiter les nombres négatifs (nombres signés) --> entiers **signés** (int) (les entiers non signés sont **uint**)
- Traiter les nombres réels (**float** ou **double**)

==Le **format** donne le type des nombres==

# Représentation DCB - Décimal Codé Binaire
## Définition
S'utilise principalement pour les systèmes d'affichages des valeurs numériques et dans les machines à calculer.

Chaque **chiffre** décimal (de 0 à 9) est codé sur 4 bits (voir [pour le passage en binaire](Representation_num.md))

| Poids | $2^3$ | $2^2$ | $2^1$ | $2^0$ |
| ----- | ----- | ----- | ----- | ----- |
| N     | $a_3$ | $a_2$ | $a_1$ | $a_0$ |
| 0     | 0     | 0     | 0     | 0     |
| 1     | 0     | 0     | 0     | 1     |
| 2     | 0     | 0     | 1     | 0     |
| 3     | 0     | 0     | 1     | 1     |
| 4     | 0     | 1     | 0     | 0     |
| 5     | 0     | 1     | 0     | 1     |
| 6     | 0     | 1     | 1     | 0     |
| 7     | 0     | 1     | 1     | 1     |
| 8     | 1     | 0     | 0     | 0     |
| 9     | 1     | 0     | 0     | 1     |

> [!danger] Etats invalides
>
> Comme on ne veut coder que des chiffres, il existe des états interdits (qui correspondraient aux valeurs de 10 à 15)
>
> Les états interdits en DCB : **1010, 1011, 1100, 1101, 1110, 1111**

>[!example] Passer du décimal en DCB
>
> <mark style="background: #FFF3A3A6;">5</mark><mark style="background: #FF5582A6;">1</mark><mark style="background: #BBFABBA6;">8</mark> en DCB : <mark style="background: #FFF3A3A6;">0101</mark> <mark style="background: #FF5582A6;">0000</mark> <mark style="background: #BBFABBA6;">1000</mark>
> 
> <mark style="background: #FFF3A3A6;">1</mark><mark style="background: #FF5582A6;">3</mark><mark style="background: #BBFABBA6;">9</mark> en DCB : <mark style="background: #FFF3A3A6;">0001</mark> <mark style="background: #FF5582A6;">0011</mark> <mark style="background: #BBFABBA6;">1001</mark>

**Toujours un multiple de 4 bits en DCB**

Conversion et lecture **très facile** mais **très gourmand en espace mémoire** (car consomme énormément de bits)

> [!hint] Consommation en mémoire
>
> Pour 1024 états : **16 bits en DCB** alors que $1024=2^{10}$ donc seulement **10 bits en binaire**

## Opérations
### 1er cas : la somme est < 9
On ne se trouve pas sur un état interdit

> [!example] Exemple de calcul : opération facile
>
> - 35 + 24 en DCB
>  - 35 = 0011 0101
> - 24 = 0010 0100
> - La somme est = 0101 1001 (DCB)
> - On peut vérifier car 0101 = 5 et 1001 = 9 donc on a bien 59

> [!attention] Ne pas confondre le format et la numération
>
> Format = DCB
>
> Numération = décimal
>
> Les règles ne sont pas les mêmes !

### 2ème cas : la somme est > 9
**On passe par les états interdits**
- Le résultat est un état invalide ↪ passer les 6 états invalides (donc ajouter 6)
- Retenu sur le paquet de 4 bits suivants (+6) mais le résultat n'est **pas invalide**

> [!example] Premier cas : état invalide
>
> - 6+7 en DCB
> - 0110 + 0111 = **1101** = état invalide donc **faux**
> - On ajoute 6 pour passer les états interdits (pour passer de 9 à 10 = 1 et 0 = 0001 0000 (DCB))
> - 1101 + 0110 = 10011 donc le résultat est : 0001 0011 donc 13

> [!example] Deuxième cas : pas invalide
>
> - 8+ 9 en DCB
> - 1000 + 1001 = <mark style="background: #FFF3A3A6;">1</mark>0001 = pas un état invalide --> <mark style="background: #FFF3A3A6;">retenue</mark>
> - Donc tous les états interdits ont été comptés : il faut donc rajouter 6 pour passer les états interdits
> - 10001 + 0110 = 10111 donc le résultat est 0001 0111 donc 17

# Représentation des nombres entiers signés ↪ complément à 2
Nombres entiers signés = nombres positifs et négatifs
## Compléments à 2
### Définition
==**Format** pour représenter les nombres entiers==

Ce format (cpt2) est à **nombre de bits fixé** (16, 32 ou 64 bits)

Méthodes différentes pour passer de la base 10 au cpt2 pour les nombres **positifs** et **négatifs** :

- **Nombres positifs** : pareil que le binaire pour passer de base 10 à 2 (cf [page sur la représentation des nombres dans différentes bases](Representation_num.md)
- **Nombres négatifs** : utilisation du complément à 2

> [!hint] Rappel : complément
>
> Le complément à N d'un nombre est le nombre qui permet d'atteindre N.
>
> *Par exemple : cpt10(3) = 10 - 3 = 7*

> [!info] Définition plus formelle
>
> **Complément à 2 sur k (16, 32, 64) bits** mais en réalité on calcule le **complément à $2^{k}$**
>
> Complement à 2 en base 10 de N ↪ cpt2(N) = $2^{k}- N$
>
> $N_{10}=-\alpha_{k-1}2^{k-1}+ \sum\limits_{i=0}^{k-2}\alpha_{i}2^{i}$
>
> *Exemple :* cpt2(3) sur 4 bits ↪ cpt2(3) = $2^{4}-3$ = 16 - 3 = 13
>
> *Donc en base 2 : $\text{cpt2(3)}=1101_{\text{(cpt2)}}$*

> [!warning] Utilisation du complément à 2
>
> Un nombre **négatif** est le **complément 2** du même nombre positif, donc on utilise le complément à 2 **<mark style="background: #FFF3A3A6;">uniquement pour les nombres négatifs</mark>**
>
> Donc si on a -3 en base 10 ↪ on cherche le complément à 2 de 3
>
> cpt2(3) = 1101 donc $-3_{(10)}= 1101_{(cpt2)}$
>
> Alors que $3_{(10)} = 0011_{(cpt2)}$

> [!summary] Récapitulatif complément à 2
>
> Représentation utilisée pour les entiers par les ordinateurs
>
> bit de signe, S=poids fort (situé à gauche) = MSB
> - S=0 : signe **positif**
> - S=1 : signe **négatif**
>   
>  Nombre de **bits fixé** (bits restants servent à la valeur de l'entier)

### Conversion Décimal vers Complément à 2

> [!info] Méthode 0 : calcul de $2^{k}-N$
>
> Calcul de $2^{k}-N$ en décimal et conversion en binaire ↪ donne la valeur du nombre négatif en complément à 2

> [!example] Exemple méthode 0
>
> $N_{10} = -11 = 1111 0101_{cpt2}$
> - Calcul de $2^{k}-N$ : $2^{8}-11 = 256 - 11 = 245$
> - Conversion en binaire : $24_{10}=1111 0101_{cpt2}$

> [!warning] Ne pas confondre format et calcul
>
> Format cpt à 2 : binaire naturel pour les entiers positifs et **caclul** du complément à 2 pour les négatifs

> [!info] Méthode 1 (calculatoire)
>
> - Pour les entiers positifs ↪ binaire naturel (et S=0)
> - Pour les entiers négatifs ↪ compléments à 2 (et S=1)
>  
>  Dans les 2 cas : **cpt2 = cpt1 + 1**
>  
>  *cpt1 = complète à 1 (1 ↪ 0 et 0 ↪ 1)*

> [!example] Exemple méthode 1
>
> $N_{10}=11$ donc $N_{10}=0000 1011_{cpt2}$ (codé sur 1 octect donc 8 bits)
>
> $N_{10} = -11 = 1111 0101_{cpt2}$
> - On part du nombre binaire de 10 : 0000 1011
> - Complément à 1 de ce nombre : 1111 0100
> - Ajout de 1 : 1111 0101

> [!info] Méthode 2 (manuelle)
>
> Bits inchangés de droite à gauche (du LSB ↪ MSB) jusqu'au 1er "1" inclus puis **tous** les bits suivants sont inversés

> [!example] Exemple méthode 2
>
> $N_{10}=-11$
> - Lecture de droite à gauche de <mark style="background: #FF5582A6;">0000101</mark><mark style="background: #BBFABBA6;">1</mark> $= 11_{2}$
> - Le LSB dans ce cas est déjà un 1, donc on le conserve et on inverse tous les autres : <mark style="background: #FF5582A6;">1111010</mark><mark style="background: #BBFABBA6;">1</mark> $= -11_{cpt2}$

Donc, **sur k bits**, on peut représenter les **entiers de $\bf{-2^{k-1}}$ à $\bf{2^{k-1}-1}$** avec le complément à 2

> [!question] Pourquoi $2^{k-1}-1$ ?
>
> Car il y a 1 bit de réservé pour le bit de signe ! (S=0 si positif, 1 sinon)

Par exemple sur 3 bits, on va de $-2^{2} \text{ à }  2^2-1$ donc de $-4  \text{ à }  3$:

| -4  | -3  | -2  | -1  | 0   | 1   | 2   | 3   |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 100 | 101 | 110 | 111 | 000 | 001 | 010 | 011 |

> [!hint] Différence entre les positifs et négatifs en binaire
>
> Contrairement aux positifs, plus les entiers négatifs sont grands, plus leur correspondance en binaire sera petite en complément à 2

### Conversion Complément à 2 vers Décimal

**Pour les entiers positifs (S=0)** : binaire naturel

> [!example] Exemple pour un nombre positif
>
> $N_{cpt2}=\textcolor{red}{0}100\ 0111$ à convertir en décimal
>
> - Le <mark style="background: #FF5582A6;">bit de signe</mark> est égal à 0 donc nombre positif
> - On convertit en décimal : $1 \times 2^{0}+ 1 \times 2^{1} + 1\times 2^{2} + 1 \times 2^{6} = 1+2+4+64 = 71_{10}$

**Pour les entiers négatifs (S=1)** : on reprend le complément à 2

> [!example] Exemple pour un nombre négatif
>
> $N_{cpt2}= \textcolor{red}{1}100 \ 0111$ à convertir en décimal
> - Le <mark style="background: #FF5582A6;">bit de signe</mark> est égal à **1** donc nombre **négatif**
> - On a donc : cpt(N) + 1 = 1100 0111
> - On inverse tous les bits : 0011 1000
> - On rajoute 1 : **0011 1001**
> - On convertit en décimal : $1 \times 2^{0}+ 1 \times 2^{3}+1\times 2^{4}+1\times 2^{5} = 1+8+16+32 =\bf{\textcolor{yellow}{-}}57_{10}$
>
><mark style="background: #FFF3A3A6;"> Ne pas oublier le signe car le nombre est négatif !</mark>

> [!warning] Attention à respecter le format de cpt2 sur $k$ bits
>
> Lors d'une conversion à partir d'un format cpt2, le **nombre de bits doit être défini**, et il faut **absolument** respecter le nombre de bits lors de la conversion
>
> **Le format complément à 2 n'est pas le même selon le nombre de bits utilisés**
>
> *Par exemple : (<mark style="background: #BBFABBA6;">4 bits</mark>, <mark style="background: #FF5582A6;">8 bits</mark>, <mark style="background: #ADCCFFA6;">16 bits</mark>)*
>
> 3<sub>10</sub> = <mark style="background: #BBFABBA6;">0011<sub>cpt2</sub></mark> = <mark style="background: #FF5582A6;">**0000** 0011<sub>cpt2</sub></mark> =<mark style="background: #ADCCFFA6;"> **0000 0000 0000** 0011<sub>cpt2</sub></mark>
>
>  -3<sub>10</sub> = <mark style="background: #BBFABBA6;">1101<sub>cpt2</sub></mark> = <mark style="background: #FF5582A6;">**1111** 1101<sub>cpt2</sub></mark> =<mark style="background: #ADCCFFA6;"> **1111 1111 1111** 1101<sub>cpt2</sub></mark>
>  
>  On recopie le **bit de signe** devant pour respecter le format (donc 0 si positif et 1 si négatif)

Evidemment, **plus $k$ est grand, plus on pourra représenter un nombre d'entiers importants**. Donc, il est forcément possible de passer d'une représentation sur $k$ bits à une représentation sur $k'$ bits ($k' >k$) mais il n'est pas forcément possible de faire l'inverse.

## Opérations sur les entiers en machine avec les Compléments à 2

### Nombres de signes opposés
Si les 2 nombres sont de signes opposés ↪ résultat représentable (car on peut représenter de  $\bf{-2^{k-1}}$ à $\bf{2^{k-1}-1}$ )

> [!example] Exemple de calcul
>
> 63 - 63 = 63 + (-63) à convertir en complément à 2
>
> ![calcul posé de 63 - 63 en binaire| 200](../images/Pasted%20image%2020221101125420.png)
>
> On ne s'occupe pas de la retenue car on représente sur 8 bits donc le résultat est bien 0000 0000
>
> 63 - 18
>
> ![calcul posé de 63-18 en binaire|200](../images/Pasted%20image%2020221101125849.png)
>
> Le résultat est donc (en ignorant la retenue) : 0010 1101
>
> On ignore la retenue car on effectue en fait le calcul $63 - \textcolor{blue}{2^{8}-18} -\textcolor{red}{2^{8}} = 63 - 18$ avec le <mark style="background: #ADCCFFA6;">complément à 2</mark> et la <mark style="background: #FF5582A6;">retenue ignorée</mark>

> [!warning] Retenue
>
> La retenue est **toujours ignorée,** on n'en tient pas compte dans le résultat
>
> Elle peut néanmoins être stockée pour effectuer des vérifications si besoin

###  Nombres de même signe

Si les 2 nombres ont le même signe, on risque de dépasser l'intervalle de nombres que l'on peut représenter : on doit donc **vérifier le dépassement = overflow**

Sur 3 bits par exemple, on ne peut pas représenter 3+3 car le nombre maximal représenté est **3** < **6**

> [!example] Exemples de calculs
>
> Pour chaque calcul, on représente la <mark style="background: #FF5582A6;">retenue (carry = C)</mark> et le <mark style="background: #ADCCFFA6;">bit de signe S</mark>
>
> On se trouve sur 8 bits dans ces exemples donc on peut représenter de **-128 à 127**
>
> ![calcul de 18+65 |200](../images/Pasted%20image%2020221101130425.png)
>
> Résultat : <mark style="background: #FF5582A6;">0</mark><mark style="background: #ADCCFFA6;">0</mark>1010011 donc C = S
>
> On a un résultat de 83 donc le résultat est **représentable** : pas d'overflow
>
> ![calcul de -18 - 65 |200](../images/Pasted%20image%2020221101130432.png)
>
> Résultat : <mark style="background: #FF5582A6;">1</mark><mark style="background: #ADCCFFA6;">1</mark>0101101 donc C =S
>
> On a un résultat de -83 donc le résultat est **représentable** : pas d'overflow
>
> 101+65
>  ![calcul de 101 + 65 |200](../images/Pasted%20image%2020221101130445.png)
>  
>  Résultat : <mark style="background: #FF5582A6;">0</mark><mark style="background: #ADCCFFA6;">1</mark>0100110, donc C $\neq$ S
>  
>  Le résultat est de 166 > 127 donc **overflow**
>  
>  -101-65
>  ![calcul de -101-65 |200](../images/Pasted%20image%2020221101130546.png)
>  
>  Résultat : <mark style="background: #FF5582A6;">1</mark><mark style="background: #ADCCFFA6;">0</mark>1011010, donc C $\neq$ S
>  
>  Le résultat est de -166 > -128 donc **overflow**

Il est donc bien nécessaire d'<mark style="background: #FF5582A6;">afficher la retenue C</mark> pour pouvoir savoir si le résultat est représentable et donc s'il y a dépassement.

# Représentation des nombres réels ↪ nombres flottants
## Représentation en virgule flottante
Nombre réel = abus de langage sur un ordinateur ↪ plutôt un **rationel avec un nombre fini de chiffres**

Représentation en virgule fixe (nb de chiffres constants après la virgule) : pose des problèmes avec les petits et grands nombres donc **pas utilisable**

> [!example] Représentation virgule fixe
>
> - masse du soleil : 19891 0...0 g (... = 24 zéros)
> - masse d'un électron : 0,0...09109 g (...= 25 zéros)
>   
>   Stockage énorme en nombre de bits nécessaires

On utilise donc la **représentation en virgule flottante**

> [!info] Réprésentation en virgule flottante
>
> - basée sur la notation scientifique avec exposant (la virgule flotte)
> - nombre représenté de manière compacte
>   
>   Avec les exemples précédents :
> - masse du soleil : 1,9891$\cdot 10^{30}$ kg
> - masse d'un électron : 9,109 $\cdot 10^{-29}$ g
>
> Ecriture des nombres réels sous forme flottante : $n=(-1)^{s}\times m\times b^{e}$ avec :
> - s ↪ signe (=0 ou 1)
> - b ↪ base (en écriture scientifique : base 10)
> - e ↪ exposant (ordre de grandeur) qui peut être négatif ou positif
> - m ↪ mantisse (chiffres significatifs de $n$) > 0

> [!example] Application de la représentation
>
> Masse du soleil : 1,9891$\cdot 10^{30}$ kg
> - s ↪ 0
> - b ↪10
> - e ↪ 30
> - m ↪ 1,9891

## Représentation en norme IEEE[^1]754
[^1]: Institute of Electrical and Electronics Engineers

Nombres à virgules flottantes en **binaire** ↪ représentation par le standard IEEE754 pour ecrire le nombre n réel sous la forme :  $n=(-1)^{s}\times m\times \bf{2}^{e}$

Le format IEEE754 est une norme définie par :
$$
(-1)^{s}\times m\times 2^{e}=(-1)^{s}\times 1,M\times 2^{(E-d)}
$$
avec donc :
- s ↪ signe = 0 ou 1
- b ↪base = 2
- e= E-d ↪ exposant $\ge$ 0 (car pas possible de mettre un format si négatif)
	  d est un décalage connu constant
- m=1,M ↪ mantisse

La représentation par le standard IEEE754 s'écrit tel que : **SEM**<sub>(2)</sub> avec :

| le signe S (1 bit) | l'exposant E (k bits)   | la mantisse M (n-k-1) bits |
| ------------------ | ----------------------- | -------------------------- |
| 0 ou 1             | e transformé en binaire | chiffres signficatifs      |


> [!info] Calculer E = exposant
>
> - E = e+d = exposant biaisé/décale qui est codé sur k bits
> - $e_{min}=-2^{k-1}+2$ et $e_{max}=2^{k-1}-1$
> - Donc, pour connaître E, on doit connaître **d** = biais/décalage (dépend du format) = $2^{k-1}-1$ (k est connu = nombre de bits)
> - D'où : <mark style="background: #FFF3A3A6;">$E_{min}=1$ et $E_{max}=2^{k}-2$ </mark>(les valeurs de 0 ($E_{min}-1$) et de $2^{k}-1$ ($E_{max}+1$) sont des **cas particuliers**)

> [!info] Calculer M = mantisse
>
> Pour un nombre en base 10 tel que : $m=\textcolor{red}{1\times 2^{0}}+a_{-1}\times 2^{-1} \text{...}$ (<mark style="background: #FF5582A6;">bit caché</mark> qu'on ne représente pas due à la normalisation de la mantisse)
>
> On a $M_{2}=a_{1}a_{2}\text{...}$

> [!example] Exemple avec 1ère méthode
>
> Avec k = 3, donc E codé sur 3 bits :
>
> - valeurs de 000 à 111 (de 0 à 7)
> - Les valeurs 0 et 7 sont des cas particuliers donc E peut prendre comme valeurs de 1 à 6 (001 à 110 en binaire)
> - e (exposant "normal") va de -2 à 3 (le décalage d est $d=2^{k-1}-1= 2^{2}-1= 3$)
>
> Mantisse : sur 3 bits M va de 000 à 111 donc m de 1 à 1,111
>
> *Exemple pour convertir $6_{10}$ dans ce format flottant*
>
> $6_{10}=1\times 2^{2}+1\times 2^{1}+0\times 2^{0} = 110_{2}$
>
> On divise tout la puissance maximale : $6_{10}=\frac{1\times 2^{2}}{2^{2}} + \frac{1\times 2^{1}}{2^{2}}+\frac{0\times 2^{0}}{2^{2}} \times 2^{2}$, ce qui revient à $[1\times 2^{0}+1\times 2^{-1}+1\times 2^{-2}]\times 2^{2}$ (ressemble bien à quelque chose de la forme : $(-1)^{s}\times 1,M\times 2^{(E-d)}$)
>
> Donc, on a finalement : $6_{10}=[1\times 2^{0}+1\times 2^{-1}+1\times 2^{-2}]\times 2^{\textcolor{red}{2}}=1,10_{2}$
>
> Donc M = 10<mark style="background: #FFF3A3A6;">0</mark> (car on est sur 3 bits) et E = <mark style="background: #FF5582A6;">e</mark>+d = 2 + 3 = 5 = $101_{2}$
>
> D'où finalement : $6_{10}$ 0 101 100 (format IEEE 7 bits)

> [!example] Exemple avec 2ème méthode
>
> Méthode moins rigoureuse car on **mélange des bases** pour représenter le format IEEE754
>
> 1. 6 en binaire : 110
> 2. On décale la virgule pour avoir un nombre de la forme "1,...." donc : **1,10**
> 3. Comme on a décalé de 2 rangs, on multiplie par $2^{2}$ donc $1,10_{(2)} \times 2^{2}_{(10)}$ (donc on mélange les bases)
>
> On a donc directement :
> - M = 10 en décimal donc 100 en binaire
> - e = 2 donc comme E = e + d = 2+3 = 5 en décimal donc 101 en binaire
>
> Ce qui nous donne $6_{(10)} =$ 0 101 100 en format IEEE754

> [!example] Exemple avec une troisième méthode
>
> Calcul qui devient vite fastidieux pour de grands nombres
>
> 1. Trouver la puissance de 2 la plus proche de 6
> 2. Diviser par cette puissance de 2 : $\frac{6}{4}=1,5$ donc $6_{10}= 1,5 \times 2^{2}$ donc on est déjà sous la forme d'un flottant en puissance de 2
>
> - m en base 10 = 1,5 donc m en binaire = 1,100
> - e =2 donc E = 5 en base 10 donc 101 en binaire
>
> On retrouve bien le résultat : $6_{(10)} =$ 0 101 100 en format IEEE754

### Format *réellement* utilisés dans l'ordinateur
Couramment ↪ 32 et 64 bits

| Format                    | Nb de bits | bits dans S | bits dans E | Décalage d        | bits de M |
| ------------------------- | ---------- | ----------- | ----------- | ----------------- | --------- |
| Simple precision (float)  | 32         | 1           | 8           | 127 = $2^{7}-1$   | 23        |
| Double precision (double) | 64         | 1           | 11          | 1023 = $2^{10}-1$ | 52        |

Avec la double precision : on peut représenter un plus grand nombre de nombre (+ petits et + grands)

**Limites de la représentation (32 bits)**
![figure avec underflow et overflow pour illustrer les limites de la représentation en 32 bits](../images/Pasted%20image%2020221107161804.png)
Donc :
- **Underflow** : on ne peut pas représenter des valeurs plus petites que l'ordre de $10^{-38}$
- **Overflow** : on ne peut pas représenter des valeurs plus grandes que l'ordre $10^{38}$

(On peut utiliser des supercalculateurs pour effectuer les calculs sur des nombres très grands/très petits)

> [!example] Convertir 25,5 en IEEE sur 32 bits
>
> **1ère méthode** :
> - Décomposition en puissance de 2 : 25,5 = 16 + 8 + 1 + 0,5 = $1 \times 2^{4} + 1 \times 2^{3} + 0 \times 2^{2} + 0 \times 2^{1} + 1 \times 2^{0} + 1 \times 2^{-1}$
> - Division par $2^{4}$ : $[1 \times 2^{0}+ 1 \times 2^{-1} + 0 \times 2^{-2} + 0 \times 2^{-3} + 1 \times 2^{-4} +1\times 2^{-5}] \times 2^{\bf{4}}$
> - Donc e = 4 en décimal donc **E = 4 +127 = 131** = $10000011_{(2)}$
> - Pour la mantisse : m = 1,110011 donc M = 10011(0) où (0) représente 18 0 pour arriver à 23 bits au total
> - Le nombre est donc : 0 10000011 10011(0)
>   
> **2ème méthode** :
> - Passage de 25,5 en binaire : 11001,1
> - Sous la forme "1,..." : $(-1)^{0}\times 1,10011 \times 2^{4}$ (décalage de 4 rangs de la virgule)
> - Donc e = 4 donc E = 131 =  $10000011_{(2)}$
> - M = 10011(0)
>  
> **3ème méthode** :
>  - Division du nombre décimal par la puissance de 2 la plus proche ($2^{4}$) donc : $\frac{25,5}{16} = 1,59375$
>  - Ecriture sous le bon format : $(-1)^{0}\times 1,59375 \times 2^{4}$
>  - On a bien e=4 donc E = 131
>  - m=1,59375 en décimal donc on retrouve bien la mantisse en repassant en binaire

> [!warning] Ne pas oublier le **bit caché**
>
> m = 1,M, et on ne représente que M en écrivant le nombre sous format IEEE754
>
> Mais la mantisse commence bien par un bit = 1 qui est donc le + significatif mais qui est **implicite**


> [!bug] Cas particuliers
>
> *Quand E = 0 ou E = $2^{k}-1$*
>
>| Cas                   | Mantisse       | Exposant                         | Signe                        |
>| --------------------- | -------------- | -------------------------------- | ---------------------------- |
>| Codage du 0           | M = 0...0      | E = 0                            | S = 0 ou 1                   |
>| Codage du $\pm\infty$ | M = 0...0      | E = Emax + 1 (tous les bits à 1) | S = 0 ou 1 (dépend du signe) |
>| Codage du NaN[^2]     | M $\neq$ 0...0 | E = Emax + 1 (tous les bits à 1) | S = 0 ou 1 (dépend du signe) |

[^2]: Not a Number

> [!tip] Puissance d'une unité de calcul
>
> Pour calculer la complexité d'un programme : on regarde le nombre d'opérations par seconde sur les flottantes (**Floops** = Floating poiint Operations Per Second)
>
> Les flottants peuvent mener à des erreurs (cf sur [python](https://docs.python.org/3/tutorial/floatingpoint.html)) dans les calculs scientifiques

## Opérations sur les flottants

- Additions et soustraction ↪ avoir les mêmes exposants (le plus élevé pour conserver l'ordre de grandeur) ↪ peut impliquer une perte de précision
- Multiplication ↪ perte d'information (arrondi au plus près)

> [!tip] Affichage des nombres au format IEEE754
>
> On affiche généralement les nombres au format **hexadécimal** ce qui permet un affichage plus compact (32 bits devient 8 symboles)

### Additions et soustractions
> [!tldr] Méthode d'addition avec des flottants
> 1. Convertir les nombres au format IEEE754
> 2. Mettre au même exposant (le plus grand) ↪ passer l'étape si même exposant. Décalage de la mantisse associé à l'exposant le plus petit
> 3. Faire le calcul sur les mantisses **sans oublier le bit caché**
> 	- Si les nombres de même signe alors addition binaire
> 	- sinon alors cpt2 du négatif
> 4. Remettre sous format flottant en décalant si besoin la valeur de l'exposant

#### Flottants de même signe

> [!example] Exemple d'opération
>
> Calculer 3 + 15
>
> 1. Convertir les nombres en format IEEE754 sur 32 bits
>    - 3<sub>10</sub> =  0 10000000 100(0)<sub>2</sub> (avec (0) = 20 zéros) = 4040 $0000_{16}$
>    - 15<sub>10</sub> =  0 10000010 111(0)<sub>2</sub> (avec (0) = 20 zéros) = 4170 $0000_{16}$
>
> 2. Ici l'exposant le plus grand est $E_{2}$ = 1000 0010
>    -  $E_{1} = 1000 0000$ donc on doit ajouter <mark style="background: #FFF3A3A6;">+2</mark> à $E_{1}$ pour avoir le même exposant
>    - Donc décalage à gauche de <mark style="background: #FFF3A3A6;">2 rangs</mark> de la mantisse ↪ $m_{2}=0,011$ (**ne pas oublier le bit caché**)
> 3.  Calcul sur les mantisses = 10,0100000 :
>    ![calcul posé de l'addition des 2 mantisses|200](../images/Pasted%20image%2020221108122639.png)
> 4. Remettre sous forme de flottant pour avoir "1,..." : on décale d'un rang vers la droite ce qui ajoute **+1** à l'exposant : $10,0100000\times 2^{E_{2}} \Rightarrow 1,00100000 \times 2^{E_{2}+1}$
> 5. Finalement, on a : <mark style="background: #BBFABBA6;">0</mark> <mark style="background: #ADCCFFA6;">10000011</mark> <mark style="background: #FF5582A6;">001(0)<sub>2</sub></mark> = 4190 0000<sub>16</sub> avec <mark style="background: #BBFABBA6;">le signe</mark>, <mark style="background: #ADCCFFA6;">l'exposant</mark> et la <mark style="background: #FF5582A6;">mantisse</mark>

> [!tip] Opérations avec le même signe
>
> Le résultat est le même, seul le signe change. Par exemple, les calculs $3+15$ et $-3-15$ auront le même exposant et la même mantisse mais un signe différent (respectivement 0 et 1)

#### Flottants de signes différents

La seule différence est pour l'étape 3 (addition des mantisses), **on utilise donc le cpt2 du négatif**

> [!example] Exemple d'opération : 3-15
>
> - mantisse de 3 modifiée : $m_{1}=0,011(0)$
> - mantisse de 15 : $m_{2}=1,111(0)$
>   
>   Donc on effectue en fait : $m_{1}-m_{2}=m_{1}+(-m_{2})$, d'où la nécessité de calculer le complément à 2 de $m_{2}$
>   
>  Donc : $-m_{2}=\textcolor{red}{1}0,0010...0$, <mark style="background: #FF5582A6;">1</mark> correspond au signe négatif de $-m_{2}$
>  
>  3. Calcul : ![calcul posé de m1 + (-m2)|200](../images/Pasted%20image%2020221108152948.png)
>  
>  Le résultat est <mark style="background: #FF5582A6;">1</mark>0,10...0 qui est toujours <mark style="background: #FF5582A6;">négatif</mark> (donc S=1)donc à repasser en complément à 2
>  
>  La mantisse finale est donc : **01,10...0** = m
>  
>  4. Dernière étape : remettre sous format flottant
>  - E = $E_{2} = 1000 0010$
>  - M = 10...0
>  - S =1
>
>Donc **3-$15_{10}$ =  1 10000010 100$(0)_{2}$** = C140 $0000_{16}$


> [!tip] Pour calculer quand signes opposés
>
> Le résultat de $3-15$ et $15 -3$ est le même, seuls S change.
>
> En général, ou soustrait toujours la mantisse la plus petite donc effectue $15-3$

# Les formats dans différents langages
## Python 3
- int (pas de format long contrairement au C)
- float

> [!tip] Formats dans Python
>
> - Possible de forcer le typage sous python, avec `a=float(3)` (car sinon int)
> - `type()` permet de connaître le type
> - Booléens = `bool` sous python

Utiliser [numpy](https://www.numpy.org/) pour le calcul scientifique

## En C
Typage **obligatoire**

- Float/double
- Simple précision
- Double précision
- Signed short int
- Unsigned short int
- Signed long int
- Unsigned long int
