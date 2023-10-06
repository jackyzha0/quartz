---
title: "Complexité d'un algorithme"
tags:
- info
- complexité
---

## Algorithme et problème
**Problème =** question à laquelle un ordinateur devrait être en mesure de donner une réponse
**Algrorithme =** processus systématique pour résoudre un problème

> [!info] Problèmes
> 
> Il existe des problèmes indécidables : sans solution algorithmique
> > [!example] Problème de l'arrêt
> > 
> > étant donnés un programme P et une donnée d’entrée d, est-ce que l’exécution de P s’arrête pour l’entrée d ?

### Critères de comparaison des algorithmes
1. simplicité, compréhensibilité
2. nombre de lignes de l'algo
3. temps de calcul : **complexité en temps** (privilégié dans cette UE)
4. occupation de la mémoire : **complexité en espace**

### Estimer la complexité en temps d'un algorithme
- pour choisir parmi plusieurs algos
- pour estimer le temps de calcul d'un programme [(Worst Case Execution Time](https://www.wikiwand.com/fr/Worst_Case_Execution_Time))
- prédire la consommation énergétique d'un programme

> [!info] Comment calculer la complexité en temps d'un algorithme
> 
> N = taille de la donnée manipulée par l'algo
> Montrer que le nombre d'opérations effectuées par l'algo est proportionnel à l'une des fonctions : $1, N^{2,}\log_{2(N),}N, N^{3},N\times \log_{2(N)},N^{k}, 2^{N}$


![](images/Pasted%20image%2020221024163519.png)

- Estimer le nombre d'opérations effectuées par l'algo avec une fonction $f(N)$
- estimer la puissance de clacul P de la machine utilisée (en FLOPS)

>[!info] FLOPS : Floating Point Operation per Second
>
> - Ordinateur portable : 70 Giga FLOPS = 7 · $10^{10}$ opérations par seconde Consommation : 200 Watts
> - Record 2016 : Wuxi (Chine), 90 Peta FLOPS = 9 · $10^{16}$ op. par sec. Consommation : 15 MWatts (une ville de 18.000 habitants)


- Pour un N donné, le temps de calcul est $f(N)/P$

> [!example] exemple de temps de calcul en fonction de la taille des données
> 
> ![](images/Pasted%20image%2020221024163840.png)

## Dérouler l'exécution d'un algorithme
> [!info] Principe des déroulages concrets
> 
> 1. Quand on rentre dans une fonction, on trace une ligne verticale parallèle au code de la fonction
> 2. Si une instruction donne la valeur `v` à une variable `x` on écrit `x=v` en face de cette instruction
> 3. Si une condition est vraie (ou fausse) on écrit `cond: true` en face de l'instruction testant la condition
> 4. Si on rentre ou si on itère sur une boucle, on trace une nouvelle ligne verticale parallèle à la précédente

Par exemple : 
![](images/Pasted%20image%2020221024164523.png)

## Problème de la recherche
>[!bug] Problème de la recherche
> 
> Etant donné un tableau d'entiers `t` et une valeur entière `v`, déterminer l'indice `i` de `t` tel que `t[i}=v`

**Algorithme simple :**
```java
int recherche(int cherche, int[]t){
	for (int i =0;i<t.length;i++){
		if(t[i]==cherche){
		return i;
		}
	}
	return -1;
}
```

> [!warning] Temps de calcul
> 
> Proportionnel à $f(N)=N+1$ avec N la taille du tableau

> [!bug] Possibilités d'améliorations dans un **tableau trié**
> 
> - Si la valeur dans `t[i]` est plus grande que cherche, on retourne -1
> => n'améliore pas sensiblement les temps de calculs : toujours proportionnel à N, car dans le **pire des cas on reste proportionnel à N**
> - Au lieu de partir du début du tableau, on part du milieu :
> 
> ```java
> int rechercheDecoupe(int cherche, int[] t){ 
> 	if (t.length==0) return -1;
> 	int milieu= t.length/2; 
> 	if (t[milieu]>=cherche) 
> 		for (int i=0; i<milieu;i++) //0 à milieu-1
> 			if(t[i]==cherche) return i;
> 	else
> 		for(int i=milieu;i<t.length;i++) //milieu à length-1
> 			if(t[i]==cherche) return i;
> 	return-1
> }
> ```
> On gagne en temps de calcul (pire des cas : N/2) mais ne passe toujours pas sous la courbe refLogarithmique


> [!check]  Algorithme de recherche dichtomique dans un tableau trié
> 
> ```java
> 
> int rechercheDicho(int cherche, int[] t){
> 	int debut=0;
> 	int fin=t.length-1;
> 	boolean trouve=false;
> 	int milieu= (debut+fin)/2;
> 	while(!trouve && debut<=fin){
> 		if (t[milieu]==cherche)
> 			trouve=true;
> 		else if (t[milieu]>cherche)
> 				fin=milieu-1;
> 			else debut=milieu+1;
> 		milieu= (debut+fin)/2;
> 	}
> 	if (trouve) return milieu;
> 	else return -1;
> }
> ```
> - Améliore la complexité expérimentale : temps de calcul proportionnel à $log_{2}(N)$
> - Améliore aussi le nombre d'opérations dans le pire des cas (proportionnel à $log_{2}(N)$

## Complexité expérimentale

> [!warning]  Etudier la complexité d'algorithmes incorrects est inutile
> **Détecter un algorithme incorrect :**
> 1. Dérouler son exécution à la main sur de petites valeurs d'entrées
> 2. Le programmer et tester le programme de façon intensive (JUnit)


> [!question]  Comment tester intensivement un programme ?
> 1. Déterminer des **petites valeurs pertinentes** pour les tests
>    *Par exemple pour l'ago de recherche : des tableaus de taille 0, puis 1, etc. tester quand l'élément est dans le tableau (début, milieu, fin) et quand il n'y est pas*
>  2. Programmer les tests dans JUnit
> 	   - Utiliser les assertions `assertEquals`, `assertArrayEquals`
> 	   - Ne **jamais** effacer/commenter un test même s'il est réussi


**Deux types d'étude de la complexité en temps**

Le temps de calcul dépend de nombreux facteurs
- la complexité intrinsèque de l'algo
- l'efficacité du langage de programmation et du compilateur
- la réactvité de l'OS
- la vitesse de traitement du processeur

Donc, il y a 2 voies pour estimer les temps de calcul :
- prendre tous les facteurs en compte : **étude expérimentale**
	- permet d'avoir une estimation précise 
	- mais résultat non transposable pour un autre langage/système/machine
- ne s'intéresser qu'à la complexité de l'algo : **étude théorique**
	- ne donne qu'un ordre de grandeur de la complexité
	- mais indépendant du langage/etc.


### Etude expérimentale

> [!info] Principe de l'étude expérimentale de la complexité d'un algorithme
> 
> 1. on implante l'algorithme dans un langage particulier
> 2. on l'exécute sur des données de + en + grosses
> 3. mesure du temps d'éxécution
> 4. construction de la courbe d'évolution du temps de calcul en fonction de la taille des données
> 5. on peut prédire le temps de calcul pour une donnée de taille N

> [!example] Exemple sur la fonction `tracerRecherche`
> 
> - Teste les fonctions de recherche sur 20 valeurs de N =taille du tableau
> - N compris entre 0 et $10^6$
> - Mesure le temps pour 1000 recherches pour chaque valeur de N
> - Bonus : vérifie la correction des r´esultats obtenus !
> - Trace les courbes correspondantes

> [!check] Avantages de la complexité expérimentale
> 
> - simple à réaliser
> - permet de prédire le temps, sur la même machine, pour d’autres N

> [!bug] Inconvénients de la complexité expérimentale
> 
> - inutilisable si les temps de calcul deviennent trop longs
> - le résultat dépend de l’ordinateur, du langage utilisé, etc.
> - le résultat d´epend du choix des donn´ees... comment les choisir ?
> 	- données réelles ? prédiction valable sur d’autres données ?
> 	- données aléatoires ? mais les données futures le seront-elles ?
> 	- pire cas ? comment obtenir ces données ?

### Etude théorique

> [!info] Pour prendre en compte les données du programme
> 
> - on estime la complexité en fonction de la taille N des données
> - on ne considère que le **pire des cas**
> 
> Utilisation du pire cas : si mauvaise complexité, l'algorithme peut être performant dans les cas + favorables

> [!info] O(f(N)) : pour s'abstraire du processeur, de l'OS et du langage utilisé (compilateur)
>
> Utilisation de la notation [Grand O (O(N))](grandO.md) :
> - on considère que toutes les opérations **élémentaires** (affectation, test d'une condition...) ont le même coût en temps
> - on ne s'intéresse qu'au **nombre** d'opérations élémentaires effectuées


> [!info] Principe utilisé ici
> 
> 1. Sélection des données pour une exécution dans le pire des cas
> 2. Déroulage à la main de l'algo sur une donnée de taille N, N+1, ... (ou N x 2 si la complexité attendue est logarithmique)
> 3. Généralisation en une fonction f(N) dominant la complexité de l'algo dans le pire des cas


> [!check] Avantages de la complexité théorique
> 
> - indépendant du langage/système/machine
> - permet d'estimer la complexité quand la méthode expérimentale échoue (temps d'exécution trop longs)

> [!bug] Inconvénients de la complexité théorique
> 
> Donne une information partielle :
> 	- pire cas uniquement
> 	- abstraction des constantes qui peuvent être **énormes**


> [!info] Estimer la complexité d'un algorithme (ici une fonction g)
> 1. On choisit des valeurs de paramètres de g pour une exécution pire cas
> 2. on sélectionne 2 valeurs dont les tailles sont proches mais différentes (par exemple N et N+1 ou N et 2 x N)
> 3. déroulages concrets de g pour ces 2 valeurs
> 4. à l'aide des déroulages concrets : déroulages abstraits
> 	   le long de chaque ligne verticale, on remplace toutes les instructions par un unique symbole ♦️
> 5. sur chaque déroulage abstrait on compte le nombre de symboles ♦️
> 6. on infère une fonction mathématiques f(N) qui pour N (=taille des paramètres) donne le nombre de ♦️ obtenus
> 7. La complexité de g est donc : O(f(N))


<!--
## Exemples de déroulage pour trouver la complexité

![](images/Pasted%20image%2020221107085700.png)

![](images/Pasted%20image%2020221107085711.png)

![](images/Pasted%20image%2020221107085844.png)

![](images/Pasted%20image%2020221107085853.png)

!-->

## Choix des tests

> [!question] Quels tests choisir ?
> 
> - Utiliser son **intuition** : déterminer des petites valeurs pertinents pour les tests
> - Utiliser une méthode systématique pour choisir les tests : outil [Pitest](https://youtu.be/x9V8LY_XS1I)

> Les tests logiciel sont utilisés pour montrer la présence de bugs, mais jamais pour prouver leur absence

\- Dijkstra

> [!warning] Objectif des test
> 
> - trouver des **erreurs dans le programme**
> - **pas** de vérifier qu'il **fonctionne** bien


---
Issu du cours de [Thomas Genet](http://people.irisa.fr/Thomas.Genet/)