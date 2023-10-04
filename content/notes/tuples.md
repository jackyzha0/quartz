---
title: "Tuples et types algébriques"
tags:
- info
- scala
---

## Tuples

```scala
val stuff = (1,"Hello", true) //un exemple de tuple
```

- une structure de données **très simple** 
- paquet d’un nombre fixe de données manipulées comme un tout 
- **l’ordre** dans lequel on place les données **est important** 

> [!bug] Différences avec les tableaux
> - ils peuvent contenir des données de types différents 
> - ils sont immutables

La **syntaxe** est de séparer les types par des virgules, le tout dans une parenthèse.

```scala
(Typ1, Typ2, Typ3, ... TypN)
```

> [!warning] La taille d'un tuple est contrainte par son type
> ```scala
> var doublet : (Int, Int) = (1, 3) 
> doublet = (4, 5, 6) // <-- interdit: types incompatibles
> ```

Il est possible de déclarer des `val/var` contenant des tuples

```scala
val foo: (String, Int, Char) = ("Wow", 1, 'z') 
var zo: (Char, (Int, Double)) = ('a', (42, 3.2))
```

### Accéder aux composantes

On utilise la syntaxe `._i`
```scala
val foo: (String, Int, Int) = ("Wow", 1, 2) 
println(foo._1) // affiche "Wow" en console 
val sum: Int = foo._2 + foo._3 // sum vaut 1 + 2 = 3 
val zo: (Char, (Int, Double)) = ('a', (42, 3.2)) 
println(zo._2._1) // affiche 42 en console
```

> [!warning] Notation des indices
> Les indices démarrent à **1** et non **0**. Donc le premier élément est à l'indice 1.

### Pattern-matching

Syntaxe :

```scala
expr match { 
	case (... , ... , ...) => ... 
	case (... , ... , ...) => ... 
	... 
	case (... , ... , ...) => ... 
}
```

> [!check] Motif valide de tuple
> - La bonne taille : autant de composantes que le tuple `expr` sinon, erreur de compilation! 
> - motifs des composantes : doivent représenter des valeurs du bon type

### Immutabilité des tuples

On ne peut **pas modifier les composantes d'un tuple**

```scala
val foo : (String, Int, Char) = ("Wow", 1, 'z') 
// foo._1 = "Hey" <-- interdit, ne compile pas (immutabilité)
```

On peut insérer un tuple dans une `var` (mais pas dans une `val` car immutable)

```scala
var blob: (String, Int) = ("Yo", 5) blob = ("Hey", 3) 
// autorisé: blob est var, et types compatibles
```

> [!warning] Même dans une `var`, un tuple reste immutable
> ```scala
> var blob: (String, Int) = ("Yo", 5) blob = ("Hey", 3) 
> // blob._1 = "Hey" <-- ne compile toujours pas ! (immutabilité)
> ```

## Nouveaux motifs pour le pattern-matching

Le pattern-matching inspecte la valeur d'une expression mais surtout sa **structure**, sa "forme".

De nouveaux motifs peuvent être utilisés pour le patter-matching :
- tuples
- imbriqués
- variables
- pour les types algébriques

### Motif variable

Motif **universel** ⇒ il correspond à n'importe quoi du bon type, comme `_`, mais il permet de **nommer** ce n'importe quoi (→ plus joli que `._1` par exemple)

Syntaxe : identifiant quelconque, commençant par une minuscule
```scala
val truc : (Int, String) = ... 
truc match { 
	case (_, nom) => println(nom) //présence d'un motif universel `_`et d'un motif variable `nom` 
}
```

L'identifiant choisi (`nom` dans l'exemple) devient une `val` :
- qui n'est utilisable que dans la branche du motif
- et dont la valeur n'est déterminée qu'à l'exécution.

> [!bug] Le motif variable peut masquer une `val` déclarée plus haut
> ```scala
> val ok : String = "OK"
> val x: (Int, String) = (3, "Blah")
> x match {
> 	case(_,ok) => println(ok) //Affiche "Blah" et non "OK", ce n'est pas la même variable
> }
> ```
> La portée de la variable `ok` dans le `match` est **locale à la branche**, et est donc prioritaire

### Motifs imbriqués

⇒ Permet de gagner en **concision**, un seul motif exprime alors plusieurs critères en **même temps**

```scala
/** 
  * UserInfo : un triplet (3-tuple): 
  * identifiant, mot de passe, et droits admin 
  */ 
type UserInfo = (String, String, Boolean) 

val user1: UserInfo = ("georges", "9999", false) 
val user2: UserInfo = ("nlambert", "aeNg9aip", true) 
/** 
  * @param user un utilisateur
  * @return le login de user s'il est admin, sinon "Not an admin".
  */ 

def unameOfAdmin(user: UserInfo): String = { 
	user match { 
		case (uname, _, true) => uname 
		case _ => "Not an admin" 
	}
}
```

Cela permet d'analyser la structure d'une valeur de façon "profonde" en imbriquant les motifs.

## Types algébriques

Les tuples :
- utiles pour regrouper plusieurs données en une seule
- `type` **alias** pour les tuples : améliore la lisibilité
```scala
type Data = (Int,Int,Int) //jour, mois, année
```

> [!bug] Alias de type
> Un alias est juste un **autre nom**, pas un **nouveau type**

> [!warning] Limitations des tuples
> - Accès aux composantes `._i` : sujet à erreur (par exemple date en FR et ENG) ⇒ solution (partielle) → le pattern-matching et les motifs variables
> - Type sans alternatives : taille fixe ⇒ un $n$-tuple aura **toujours** $n$ composantes

Les **types algébriques** permettent de 
- définir un **nouveau** type de données, composite 
- nommer les composantes du type
- autoriser les alternatives

### `case class`

Par exemple pour modéliser une date par un jour, un mois et une année

**Déclaration de type :**

```scala
case class Date(jour: Int, mois: Int, an: Int)
```

**Création de valeurs :**

```scala
Date(25,12,2018)
```

> [!tip] Notes sur `case clas`
> Pas de mot-clef `new`, la valeur est **uniquement définie** par le nom du constructeur et la valeur des composantes
> `Date` est le nom du type **et** du constructeur

Pour accéder aux composantes, on utilise leur nom (notation pointée) :
```scala
val d: Date = Date(10, 11, 2012) 
println(d.jour + "-" + d.mois + "-" + d.an) // 10-11-2012
```

Les `case class` sont **immutables**, on doit donc renvoyer de **nouvelles valeurs**

```scala
/** 
 * @param d une date
 * @return le début de mois pour la date d 
 */ 
def debutMois(d: Date): Date = { 
	Date(1, d.mois, d.an)
}
```

Pour le pattern-matching, `Date` peut aussi être un **motif** :

```scala
/**
 * @param d une date 
 * @return une chaîne décrivant la date 
 */ 
def description(d: Date): String = { 
	d match { 
		case Date(25, 12, _) => "Noël" 
		case Date(31, 10, _) => "Halloween" 
		case Date(14, 2, _) => "St Valentin" 
		case _ => "" 
	} 
}
```

### `sealed trait` et `extends`

Une image peut être : 
- soit un rectangle : défini par sa longueur et sa largeur 
- soit un cercle : défini par son rayon 
- soit plus compliquée : celle contenue dans un fichier

⇒ Création de type qui réunissent des types créés avec `case class`

**Nommage du nouveau type par `sealed trait Type`**
```scala
sealed trait Image 
case class Rectangle(w: Float, h: Float) extends Image 
case class Circle(r: Float) extends Image 
case class FromFile(filename: String) extends Image
```

On autorise des alternatives par `extends` ⇒ ici 3 variantes pour le type `Image`
Le mot-clé `sealed` : ces variantes (les `case class` de ce fichier) sont les **seules possibles.**

==On peut donc créer des types de tailles **diverses** et **hétérogènes** dans leurs types==

On a le choix pour le type **déclaré** ⇒ cela détermine la validité des accès aux composantes. 
```scala
val r1: Rectangle = Rectangle(1, 3) // r1 de type Rectangle 
println("Aire de r1 = " + (r1.h * r1.w)) // accès composantes OK 
val r2: Image = Rectangle(2, 4) // r2 de type Image 
println("Aire de r2 = " + ???) // r2.h et r2.w n'existent pas 
```
Le type de la variante, ici `Rectangle`, est plus précis. Souvent, en programmation, il vaut mieux, quand c’est possible, réfléchir de manière générale, sur le type algébrique global, ici `Image`.

Les types algébriques simples sont immutables ⇒ composés de `case class` 

Pattern-matching : 
- motifs des constructeurs: traiter tous les cas possibles 
- motifs des composantes: accéder à leur contenu

```scala
/** 
* @param i une image 
* @return i est un cercle de manière certaine 
* */ 
def estUnCercle(i: Image): Boolean = { 
	i match { 
		case Circle(_) => true 
		case Rectangle(_, _) => false 
		case FromFile(_) => false 
	} 
}
```

## Le type Scala `Option[T]`

On souhaite calculer l'aire d'une image, on peut pour un cercle, pour un rectangle, mais pas pour un fichier (d'après les `case class` définis précédemment)

On peut définir un **nouveau** type algébrique représentant qu'un résultat n'existe pas toujours :
```scala
sealed trait Result 
case class Ok(r: Double) extends Result 
case object Undef extends Result
```

> [!bug] Remarque
> Une `case class` sans composante se note `case object` 

Puis on peut utiliser ce type pour définir notre fonction :

```scala
def aire(i: Image): Result = { 
	i match { 
		case Circle(r) => Ok(math.Pi * r * r) 
		case Rectangle(h, w) => Ok(h * w) 
		case FromFile(_) => Undef 
	} 
}
```

Un type prédéfini joue le rôle du type `Result` : le type `Option[T]` où `T` est un type quelconque (`Double` dans l'exemple) avec 2 alternatives :
- `Some` : 1 composante de type `T`
- `None` : pas de composante.

```scala
/** 
* @param i une image 
* @return l'aire de l'image i, si on peut la calculer sans effet 
* */ 
def aire(i: Image) : Option[Double] = { 
	i match { 
		case Circle(r) => Some(math.Pi * r * r) 
		case Rectangle(h, w) => Some(h * w) 
		case FromFile(_) => None 
	} 
}
```

## Bilan

Types de données composites :
- tuples et types algébriques
- modéliser des données composites, agrégeant plusieurs informations

Pattern-matching :
- motif tuples, variables, imbriqués, et constructeur 
- motifs: contraintes sur les valeurs possibles 
- moyen d’accéder au **contenu effectif** des composantes de la valeur composite