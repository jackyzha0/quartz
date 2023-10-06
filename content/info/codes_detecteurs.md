---
title: "Codes détecteurs et correcteurs d'erreurs"
tags:
- info
- codage
---
# Principe et définitions
## Principe

Il y a des **altérations du message** dues au canal de transmission (câble, transmission sans fil...). Par exemple, pour un taux d'erreur de $10^{6}$ = 1 bit erroné sur $10^{6}$, donc pour une connexion à 1 Mo/s ↪ 8 bits erronés /seconde 

⇒ Altération des données stockées due à la durée de vie du matériel (DVD, disque-dur, mémoire flash)

Le **taux d'erreur** varie énormément → compris entre $10^{-9}$ et $10^{-4}$

Le **principe général** de détection et de correction des erreurs est donc :
- **d'ajouter de la redondance** au message à transmettre → différentes manières de le faire
- et à la réception d'effectuer l'opération inverse → les bits ajoutés sont contrôlés pour éviter les erreurs

> [!example] Transmettre un numéro de téléphone avec une erreur
> 
> 
> | Message transmis | Message reçu |
> | ---------------- | ------------ |
> | 0654122235       | 065412223<mark style="background: #FF5582A6;">6</mark>             |
> 
> **Solution** → redondance (un chiffre est remplacé par plusieurs lettres) :
> 
> ⇒ zero six cinquante-quatre douze deux deux trente-cilq (cilq $\approx$ cinq)

Donc : une information **concise** est **difficile à corriger** alors que dans une information **redondante**, on peut détecter et corriger les erreurs

> [!info] Différents codes
> 
> 1. **Code détecteur d'erreur** → Détecte un certains nombre d'erreurs mais ne les corrige pas
> 2. **Code détecteur et correcteur d'erreur** → Détecte et corrige un certain nombre d'erreurs.

## Définitions

**Taux d'erreur :** $T = \frac{\text{nombre de bits reçus erronés}}{\text{nombre des bits total émis}}$

**Débits :**
- Débit **binaire** (Db) = nombre de bits transmis/s
- Débit **symbole** (Ds) = nombre de symboles transmis/s *(en Baud)*

**code C(n,k)** :
- Nombre de bits du **message** : k bits
- Nombre de bits du **contrôle** : r bits (= redondance)
- Nombre de bits **transmis** : n = k+r bits

**Rendement d'un code C(n,k)** : $R=\frac{k}{N}=\frac{k}{k+r}<1$

> [!tip] Choix d'un code
> 
> Pour une bonne détection/correction d'erreurs → redondance importante donc **r grand**
> 
> Pour un code économique, avec une transmission rapide (débit élevé) → **r petit**
> 
> ⇒ Il existe donc un compromis entre l'efficacité de la détection/correction et l'efficacité de la transmission

### Codage en bloc C(n,k)

Dans la pratique des codes correcteurs → codages par blocs

![illustration](../images/Pasted%20image%2020221214160841.png)

### Codage systématique

**Le mot à coder se trouve au début du mot codé**

Il est nécessaire de rajouter $r = n-k$  bits de contrôle à la fin du mot à coder

- k premiers symboles du mot codé → **information**
- r derniers symboles du mot codé → **redondance**

Permet un **décodage immédiat**

![codage systématique](../images/Pasted%20image%2020221214161417.png)

### Poids et distance de Hamming

**Poids de Hamming :** $p_H$ est le nombre de bits à 1

**Distance de Hamming :** nombre de positions où les bits sont différents entre 2 mots

> [! check] Détection et correction d'erreurs avec la distance de Hamming
> 
> En connaissant la distance de Hamming minimale d’un code $d_{Hmin}$, il est alors possible de :
> - Détecter  $d_{Hmin}$ erreurs au maximum
> - Corriger $[\frac{d_{Hmin}-1}{2}]$ erreurs au maximum (avec $[x]$ = partie entière de $x$) 

# Codes simples et usuels
## Code de parité
### Emission

> [!info] Principe
> 
> C'est un codage par bit de parité, qui est **détecteur d'erreur**, très simple et très utilisé
> 
> ⇒ ajout d'un **bit de parité** (bit de contrôle) qui correspond au nombre pair de "1"
> - nombre **pair** de 1 ⇒ bit de parité = 0
> - nombre **impair** de 1 ⇒ bit de parité = 1

![format du code de parité](../images/Pasted%20image%2020221217153915.png)

### Réception

Par exemple, pour le message reçu suivant :

![](../images/Pasted%20image%2020221217154518.png)

Il y a 1 ou 3 erreurs commises car le nombre de bits est **impair**

Mais dans cet exemple :

![](../images/Pasted%20image%2020221217154600.png)
 Il peut y avoir 0, 2 ou 4 erreurs commises car le nombre de bits est **pair**

> [!check] Performances du code de parité
> 
> Le code de parité ne détecte qu'un nombre **impair** d'erreur et la correction est **impossible**
> 
> - Longueur des mots d'information : **k**
> - Redondance : **r=1**
> - Longueur des messages émis : **n=k+1**
> 
> Donc le rendement est tel que $R=\frac{k}{k+1}$ (assez fort)

## Code de répétition
### Emission

> [!info] Principe du codage par répétition
> 
> - Codage par répétition du bit à transmettre
> - Code **détecteur et correcteur** d'erreur, très simple et très utilisé
> - Code **systématique**
>   
> Ajout de **r bits** de contrôles → pour obtenir un nombre de bits impair
> 
> Noté tel que C(n,1) avec n = k+r (et n impair)

![schéma du codage par répétition](../images/Pasted%20image%2020221217155059.png)

### Réception

Par exemple :

![](../images/Pasted%20image%2020221217155234.png)

La correction se fait par la **distance de Hamming** minimale avec les mots possibles (il n'y a que 2 mots possibles), donc le mot décodé est `1`.

Dans cet exemple, si il y a 2 ou 3 erreurs ⇒ mauvaise correction

> [!check] Performances
> 
> Détection des erreurs (*sauf si tous les bits sont **faux***), et correction de $\frac{r}{2}$ bits erronés au maximum
> 
> Rendement de $R=\frac{1}{1+r}$ donc rendement assez **élevé**

## Code double parité
### Emission

> [!info] Principe du code double parité
> 
> Permet un double contrôle par rapport au codage par rapport au [Code de parité](#Code%20de%20parité), c'est un code **détecteur** et **correcteur** d'erreur
> 
> Par rapport à la simple parité, on va **assembler plusieurs blocs de k bits** pour effectuer le double contrôle

![schéma du découpage en blocs de taille k](../images/Pasted%20image%2020221217160118.png)

Par exemple :

![](../images/Pasted%20image%2020221217160323.png)

### Réception

A la réception, on peut donc comparer les bits de parités pour chaque ligne et pour chaque colonne. Le croisement des informations permet de repérer l'erreur :

![illustration d'un tableau présentant une erreur au croisement de la deuxième ligne et troisième colonne](../images/Pasted%20image%2020221217160614.png)


> [!check] Performances
> 
> Détection de **beaucoup d'erreur**, mais correction **d'une seule erreur**
> 
> - Redondance : 1+k+M (k correspond aux bits de VRC et M aux bits de LRC + le bit au croisement des 2)
> - Longueur des blocs émis : $n= (M+1)\times (k+1)$
> - Rendement $R=\frac{}{}=\frac{Mk}{k+Mk+M+1}$
>   
>  Donc **meilleur rendement** que le [Code de répétition](#Code%20de%20répétition)

# Code de Hamming
## Principe

> [!info] Code de Hamming
> 
> Le **code de Hamming** est un codage par bit de **parité**.
> 
> C'est un code **correcteur** d'erreur grâce à l'utilisation de **plusieurs** bits de parité. Il permet de **détecter la position d'une erreur** et est donc **auto-correcteur**
> 
> ⇒ pour un mot de **k bits** → ajout de **r bits de contrôle**, donc la longueur totale du message est $2^{r}-1$ (car le bit de parité se trouve sur les positions des puissances de 2)


![](../images/Pasted%20image%2020221229140825.png)

On observe que le rendement augmente avec le nombre de bits de contrôle (de $\frac{1}{3}$ à $\frac{11}{15}$ par exemple pour 2 et 4), donc on a intérêt à augmenter le nombre de bits de contrôle.

## Codage

Les bits de contrôle se trouvent sur les positions des **puissances de 2**. Par exemple, avec un mot à transmettre tel que :

![](../images/Pasted%20image%2020221229141001.png)

Le mot codé sera :

![](../images/Pasted%20image%2020221229141027.png)

> [!tip] Utilisation des bits de contrôle
> 
> Dans cet exemple :
> - <mark style="background: #ADCCFFA6;">$p_0$</mark> vérifie tous les bits avec bit de position <mark style="background: #ADCCFFA6;">$b_{0}=1$</mark>
> - <mark style="background: #BBFABBA6;">$p_1$</mark> vérifie tous les bits avec bit de position <mark style="background: #BBFABBA6;">$b_{1}=1$</mark>
> - <mark style="background: #FF5582A6;">$p_2$</mark> vérifie tous les bits avec bit de position <mark style="background: #FF5582A6;">$b_{2}=1$</mark>
> 
> On a donc :
> 
> | Bit de parité | Rangs des bits vérifiés |
> | ------------- | ----------------------- |
> |<mark style="background: #ADCCFFA6;"> $p_{0}$</mark>       | 1,3,5,7                 |
> | <mark style="background: #BBFABBA6;">$p_{1}$</mark>       | 2,3,6,7                 |
> | <mark style="background: #FF5582A6;">$p_{2}$ </mark>      | 4,5,6,7                 | 

## Décodage

Pour décoder, il suffit de re-calculer les bits de parité $p_{0}'$, $p_{1}'$ et $p_{2}'$. On les compare avec  $p_{0}$, $p_{1}$ et $p_{2}$ et on attribue à  $C_{0}$, $C_{1}$ et $C_{2}$ les valeurs :
- si égaux → 0
- sinon → 1

La lecture de $C_{2}C_{1}C_{0}$ permet de connaître la **position de l'erreur**

| $C_{2}C_{1}C_{0}$ | Erreur        |
| ----------------- | ------------- |
| 000               | Aucune erreur |
| 001               | Position 1    |
| 010               | Position 2    |
| 011               | Position 3    |
| 100               | Position 4    |
| 101               | Position 5    |
| 110               | Position 6    |
| 111               | Position 7    |

avec les positions telles que : 

![](../images/Pasted%20image%2020221229141027.png)

> [!tip] Remarque sur la position des erreurs
> 
> On remarque que la valeur de $C_{2}C_{1}C_{0}$ donne la valeur en **binaire** de la position où se trouve l'erreur

> [!check] Performances du code de Hamming
> 
> - Longueur des mots d'information : $k$
> - Redondance : $r$
> - Longueur des messages émis : $n=2^{r}-1$
> - **Rendement :** $R = \frac{2^{r}-1-r}{2^{r}-1}$ (rendement assez fort)
>   
>  Code qui permet de **détecter** et de **corriger** une erreur

# Code cyclique de redondance (CRC)
## Principe

Les codes **cycliques** sont des codes utilisés dans certains cas qui ne **corrigent pas les erreurs** mais les détectent **rapidement et efficacement**

Les **CRC**[^1] sont utilisés dans les **réseaux informatiques** afin de détecter les **erreurs groupées**

[^1]: Cyclic Redundancy Check

## Codage

Schéma général du principe du  CRC :

![schéma du principe du CRC](../images/Pasted%20image%2020221230223041.png)

### 1. Représentation du mot par un polynôme

Le mot binaire de **k bits** est représenté par un polynôme de degré **k-1**
Par exemple :
- mot = $[b_{k-1}b_{k-2}...b_{0}]$
- polynôme associé : $P(x)=b_{k-1}\times x^{k-1}+b_{k-2}\times x^{k-2}...b_{0}\times x^{0}$

Afin de coder le mot (donc en ajoutant des bits de contrôles), on effectue **des opérations sur les polynômes** en utilisant un **polynôme générateur**

### 2. Utilisation du polynôme générateur

Le polynôme générateur $G(x)$ est de degré $r$ et est connu par **l'émetteur et le récepteur**

Calcul de $P(x)\times x^{r} \Leftrightarrow$ <mark style="background: #FF5582A6;">ajouter $r$ fois $0$ au mot binaire</mark>

> [!example] Exemple avec $k=5$
> 
> Le polynôme est de degré $k-1$ donc de degré 4
> 
> Soit le mot binaire : [1 0 1 1 1] → $P(x)=x^{4}+x^{2}+x+1$
> 
> Soit $G(x)=x^{2}+1$ → degré $r=2$
> 
> Donc, $P(x)\times x^{2}=x^{6}+x^{4}+x^{3}+x^{2}$ → 10111<mark style="background: #FF5582A6;">00</mark>

### 3. Calcul de $\frac{P(x)\times x^{r}}{G(x)}$ (pas de signe < 0)

> [!example] Exemple avec $k=5$
> 
> On calcule donc $\frac{x^{6}+x^{4}+x^{3}+x^{2}}{x^{2}+1}$
> 
> ![](../images/Pasted%20image%2020221230230516.png)
> 
> Mais **sans aucun signe négatif**, donc on a :
> 
> ![](../images/Pasted%20image%2020221230231004.png)
> 

> [!tip] Autre méthode
> 
> On peut aussi effectuer directement la division en utilisant les polynômes sous forme binaire et en divisant avec un ou exclusif $\oplus$ :
> 
> ![[Pasted image 20230102152008.png]]

### 4. Utilisation du reste pour construire $T(x)$

Le reste de la division de $\frac{P(x)\times x^{r}}{G(x)}$ est représenté par un mot binaire de $r$ bits et ajouté **à la fin du mot à transmettre** ce qui correspond au polynôme cyclique $T(x)$

> [!example] Exemple avec $k=5$
> 
> D'après l'étape précédente, le reste est $x+1$ → $\textcolor{red}{11}$
> 
> Comme le mot initial est $10111$, on y ajoute $\textcolor{red}{11}$, donc le mot à transmettre est $t = 10111\textcolor{red}{11}$

## Décodage

1. Réception du message $t'$ → représenté par un polynôme $T(x)$
2. Opération $\frac{T(x)}{G(x)}$ où $G(x)$ est le polynôme générateur utilisé à l'émission
3. Reste de la division :
	- 0 ⇒ pas d'erreur
	- $\neq$ 0 ⇒ erreur(s) ⇒ retransmettre le message

> [!example] Exemple de décodage
> 
> - Mot reçu : $t'=1011111$ donc $T(x)=x^{6}+0+x^{4}+x^{3}+x^{2}+x+1$
> - $G(x)=x^{2}+1$ → degré $r=2$
>   
>   On effectue l'opération $\frac{T(x)}{G(x)}=\frac{x^{6}+0+x^{4}+x^{3}+x^{2}+x+1}{x^{2}+1}$
>   
>   ![](../images/Pasted%20image%2020221230233546.png)
>   
>   Le reste de la division est **0** donc **pas d'erreur**

# Conclusion

| Code détecteur d'erreur | Code correcteur d'erreurs (et détecteur) |
| ----------------------- | ---------------------------------------- |
| Code de parité          | Code de répétition                       |
| Code CRC                | Code de double parité                    |
|                         | Code de Hamming                          |

