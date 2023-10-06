---
title: "Introduction à Scala"
tags:
- info
- scala
---
# Introduction à Scala

Scala = "scalable language"
**Compatible avec Java dans les 2 sens :** les 2 produisent du *byte code* qui est interprété par la JVM

> [!tldr] Outils utilisés
> - Visual Studio Code (IDE) avec l’extension Metals (Scala) 
> - SBT 
> - Scalastyle : plugin SBT, encourage certaines bonnes pratiques 
> - JUnit : systématiser les tests des programmes 
> - Scribble : librairie graphique

⇒ utiliser les mots **expression** et **évaluer**

## Programmes, calculs et effets de bord

Une **expression** = quelque chose que l'on peut évaluer

> [!example] Exemple
> Dans une calculatrice `2+3` est une expression

Dans une calculatrice : pas **d'effet de bord** ⇒ rien d'autre que le fait d'évaluer l'expression ⇒ **expression pure** qui ne ==dépend que des paramètres fournis==.

Donc on essaye le + possible de travailler avec des expressions **pures**

Quand l'expression n'est pas pure → il existe des **effets de bords** : modification de la mémoire par exemple.

> [!important] 
> Savoir distinguer les **calculs purs** et les **calculs avec effets de bord**
> 
> Essayer de cantonner les effets de bords et les interactions avec l'utilisateur à quelques fonctions de haut niveau
> 
> ⇒ majorité du programme constitué de fonctions et d'expressions **pures** ⇒ on peut les analyser/tester + facilement

Toute expression en java a un **type**. En Scala → pas obligatoire d'indiquer les types (mais il est préférable d'indiquer le type)

Un programme Scala est une (suite d’expression(s) qui décrit le calcul. Certaines expressions ont un effet de bord.

Exécuter un programme Scala = calculer la valeur de l’expression, et réaliser les effets de bord qu’elle contient.

## Syntaxe des éléments de bases de Scala

Types disponibles de base en Scala :
- Types numériques : `Char`, `Int`, `Long`, `Float`, `Double`
- Types non numériques : `Boolean`, `Unit` (équivalent du type `void` en Java donc qui ne contient rien : une seule valeur possible : `()`)
- `AnyVal` : type de toutes les valeurs non-objet
- `String` : chaîne de caractères
- `AnyRef` : toutes les valeurs objet
- `Any` : toutes les valeurs possibles en Scala
- `List`, `Array`, `Map`, `Set` : les collections Scala

Disponibles dans Scribble :
- `Image` : représente des images
- `Color` couleurs dans Scribble

Un programme Scala est de la forme

```scala
object MonProgramme extends App { 
// définitions de variables et de fonctions 
val msg = "Hello World!" //ici le type n'est pas indiqué

def sayHello(): Unit = { 
	println(msg) 
} 

// code utilisant ces variables et fonctions 
sayHello() }
```

`object` est l'équivalent du `main`

- Expression pure :
```Scala
3 + 4 // calcule une valeur de type Int 
"Blah" // calcule une valeur de type String 
Circle(10) // calcule une valeur de type Image
```

- Expression impure : calcule une valeur et a un **effet de bord** (interaction avec l'environnement)
```Scala
println("Yo") // calcule un Unit, affiche un message 
draw(Circle(40)) // calcule un Unit, affiche une image 
readLine() // calcule une String, lit au clavier
```

Une séquence d’expressions est aussi une expression. On utilise le point-virgule pour séparer les expressions. Le point-virgule est optionnel si on passe à la ligne. 
```Sacla
expr1 ; expr2 ; .... ; exprN
``` 

La valeur d’une séquence est la valeur de la dernière expression. Toutes les valeurs des expressions intermédiaires sont ”oubliées”. Seuls leurs effets de bord sont cumulés. 
Exemple : l’expression `println("Hey") ; 3+4 ; "Blah" ; println("Yo")` 
- calcule une valeur de type `Unit` , celle retournée par `println("Yo")` 
- et a 2 effets de bord : afficher les messages "Hey" puis "Yo" 

Les deux valeurs intermédiaires 7 et "Blah" sont « oubliées ». Elles ne produisent pas d’effet de bord.

### Variables mutables et immutables

2 sortes de variables en Scala :
- modifiables = mutables (`var`)
```Scala
var y: String = "foo" 
y = "bar" // On peut modifier la valeur de y.
```
- non modifiables : immutabes (`val`)
```Scala
val x: Int = 42 
x = 0 // INTERDIT, erreur "reassignment to val"
```

> [!hint] Utilisation des variables
> 
> On préfère utiliser des `val` (donc des variables immutables qui **minimisent les effets de bords**) plutôt que des `var`

### Définition de fonction

Syntaxe de la déclaration de fonction :
```Scala
def maFonction (x1: Type1, ... ,xN: TypeN) : TypeR = { 
	expr
}
```

- `maFonction` : nom de la fonction
- `x1: Type1` sont les paramètres formels de la fonction (la portée de `x1` est locale donc uniquement dans la fonction)
- `TypeR` : type de la valeur renvoyée
- `expr` : corps de la fonction

La fonction est évaluée à la ==dernière expression évaluée dans le corps de la fonction==

Le mot `return` est rarement utilisé en Scala

```Scala
object monProgramme extends App {
// Définition de la fonction aireCarre 
def aireCarre (c: Int) : Int = c * c 

// Utilisation de la fonction aireCarre 
println(aireCarre(3)) // affiche l'entier 9 
println(aireCarre(3 * 2)) // affiche l'entier 36 }
```

## Spécification : vers un code sans erreurs

Spécification d'une fonction = dit **ce qu'elle fait et ce qu'elle renvoie**

Approche méthodique de conception logicielle :

1. Spécification
2. Concevoir l'algo
3. Programmation

En Scala, la spécification est répartie entre :
- la signature de la fonction
- tout le reste : doc Scala (=Scaladoc), annotations en commentaires.

```Scala
/** 
* Prints out an object to the default output, 
* followed by a newline character. 
* @param x the object to print. 
*/ 
def println(x: Any) : Unit = { ... }
```

Bonne spécification (précise) quand on peut sans regarder le code :
- savoir ce que calcule la fonction
- connaître ses effets de bord observables

## Booléns, conditionnelles, pattern-matching

Pour les expressions conditionnelles `if` : similaire à Java, sauf que ce sont des **expressions**

### Pattern-matching
= filtrage de motif en français ($\neq$ avec le `switch` de Java)

Syntaxe générale :

```Scala
expr match { 
case motif1 => expr1 
case motif2 => expr2 
... 
case motifN => exprN 
} 
```

Inspecte la valeur de `expr` , et si elle « correspond » à `motifi` , s’évalue en la valeur de `expri` . 

Qu’est-ce qu’un motif ? Pour aujourd’hui : 
- un littéral Scala numérique, booléen, chaînes de caractères 
- ou un ”joker” `_` : le motif universel 
 
> [!danger] Attention
> Un motif n’est pas une expression Scala ! Un motif n’a pas de valeur, c’est une information symbolique

> [!example] Exemples
> 
> ``` Scala
> val x: Int = ... 
> 
> x match { 
> case 0 => "zero" //motif littéral : reconnaît une seule valeur
> case 1 => "one"
> case 2 => "two" 
> case _ => "many" //motif universel
>  }
> ```
> Autre exemple où l'expression match a pour type `Boolean` :
> ```Scala
> val x: Int = ...
> 
> (x < 0) match { 
> case true => -x 
> case false => x }
> ```



