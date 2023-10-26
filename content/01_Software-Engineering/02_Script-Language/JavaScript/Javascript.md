#Software-Engineering 

---
#### # Einführung in JavaScript

- JavaScript ist eine Programmiersprache
- Zusammen mit HTML und CSS zählt sie zu den Kerntechnologien des World Wide Web.
- Haupteinsatzgebiet ist client-seitige Code-Ausführung im Browser
- Wichtigkeit nimmt im Server und Desktop-Bereich zu
---
#### # Meist verwendete Programmiersprachen 2023

![most_used_programming_languages.png](https://deep-thought.norwin.at/tech-kb/basics/assets/most_used_programming_languages.png)

---
## # Eigenschaften

- nicht zu verwechseln mit Java
- interpretierte Sprache, nicht kompiliert
- dynamische Typisierung
- objektorientiert
- mehrere Paradigmen
    - ereignisgesteuert (event-driven)
    - funktional
    - imperativ
---
#### # Node.js

- [[Node.JS]] ist eine Laufzeitumgebung mit deren Hilfe JavaScript Programme außerhalb des Browsers ausgeführt werden können.
- Einsatzbereiche:
    - JavaScript Programme auf dem Server ausführen
    - Entwickler-Tool
    - Basis für Desktop Applikationen die auf Website-Technologien basieren.

#### # Programmausführung

- Ein JavaScript Programm kann mit Node.js nach der Installation von Node.js im Terminal ausgeführt werden - führt file "my-first-program.js" aus

```bash
>> node my-first-program.js
hello world!
```
---

## JavaScript Language Basics
---
#### # Ausgabe in der Konsole:

- Über den Befehl `console.log();`

```javascript
console.log("text der ausgegeben wird");
console.log(42);
```

```fallback
>> node program.js
text der ausgegeben wird
42
```

---
#### # Kommentare

```javascript
// Ich bin ein Kommentar

/*
  ich bin ein 
  mehrzeiliges kommentar
*/
```
---
### # Programmbestandteile

Ein Softwareprogramm besteht aus einer Abfolge von Anweisungen. Wir unterscheiden zwischen:

- Deklarationen
- Instruktionen

---
### # Deklaration

Mit der Deklaration einer Variable wird einem Bezeichner ein Wert zugeordnet. Variablen werden zur Speicherung von Daten verwendet.

---
### # Instruktion (= Befehl)

Ein Befehl ist ein definierter Einzelschritt, der von einem Computer ausgeführt werden kann. Darunter fallen:

- Werte von Variablen verändern
- Entscheidungen treffen
- Bildschirmausgaben

---
### # Datentypen

Eine Variable wird für die Verwaltung von Daten verwendet. Sie besitzt einen Namen (Identifier) und einen Wert.

Werte können dabei bestimmten Datentypen angehören.

Ein Datentyp bestimmt welche Werte gespeichert werden können.

---
#### # Speicherbereiche

Mit einer Variable wird ein Teil des Arbeitsspeichers verwaltet. Dem Namen der Variable wird die Speicherzelle zugeordnet, mit der der für sie reservierte Speicherbereich beginnt.

Eine Variable ist also technisch gesehen nur eine Adresse im Speicher.

---
#### # Variablen

- früher: Schlüsselwort `var`
    - sollte nicht mehr verwendet werden
- `let`: ein Wert der später geändert werden kann
- `const`: ein Wert der später nicht mehr geändert werden kann

```javascript
let theAnswer = 42;
const greeting = "hello world";

// Deklaration einer Variable
let x;

// Speichern des Wertes 42 in der Variable
x = 42;

// Deklaration der Variable y 
// und Initialisierung mit dem Wert 21
let y = 21;
```
---
#### # Identifier / Bezeichner

- Einen Variablennamen nennt man auch Identifier
- Über den Namen identifizieren wir den darunter liegenden Wert.
- Identifier in JavaScript
    - Case-sensitive (Groß- und Kleinschreibung ist wichtig)
        - `greeting` und `Greeting` sind unterschiedliche Identifier
    - können Buchstaben, Ziffern, _ und $ enthalten, sonst nichts (auch kein Leerzeichen)
    - dürfen nicht mit einer Ziffer beginnen

---
### # Datentypen

Bei einer Variableninitialisierung wird nicht nur ein Wert, sondern gleichzeitig auch ein Datentyp zugewiesen.

Ein Datentyp beschreibt eine Menge von Werten und Operationen, die auf eine Variable angewandt werden dürfen.

Damit bestimmt der Datentyp die **Art** der Information, die in einer Variable gespeichert werden kann.

---
### # Datentypen in JavaScript

JavaScript kennt die folgenden Datentypen:

- string
- number
- boolean
- undefined
- null
- object
- array
---
#### # If-Verzweigung

In der Regel wird ein Programm von oben nach unten, Befehl für Befehl ausgeführt.

Wenn man steuern will, dass ein gewisser Programmteil nur unter einer bestimmten Bedingung ausgeführt wird, verwendet man eine **If-Verzweigung**

---

Der Schüler hat 75 Punkte erreicht. Das Programm prüft die Anzahl der erreichten Punkte. Falls der Schüler mehr als 50 Punkte erreicht hat, hat er die Prüfung bestanden.

---

```javascript
// SYNTAX: IF Verzweigung
if (<condition>) {
		// condition trifft zu
	<operations>
} else {
	// condition trifft nicht zu
	<operations>
}
```

```javascript
let points = 75;

if (points > 50) {
	console.log("You passed your exam");
} else {
	console.log("You failed your exam");
}
```

---

```javascript
// Ermittle den groesseren Wert der 3 Variablen
// und gib ihn aus.
let x = 24;
let y = -121;
let z = 53;

if (x > y) {
	if (x > z) {
		console.log(x);
	} else {
		console.log(z);
	}
} else {
	if (y > z) {
		consolo.log(y);
	} else {
		console.log(z);
	}
}
```

---
#### # Bedingungen auswerten

Eine Bedingung ist ein Ausdruck, der nach Auswertung immer entweder wahr (true) oder falsch (false) ist.

Bedingungen ergeben also nach der Auswertung immer einen boolschen Wert. Bedingungen werden auch boolsche Ausdrücke genannt.

---

```javascript
// Der String wird immer ausgegeben
if (true) { // --> wird zu true ausgewertet
	console.log("Hello world");
}

let x = 21;
if (x > 0) { // -> wird zu true ausgewertet
	console.log("value is positive");
}
```

```javascript
let a = 7;
let b = 7;
let c = 4;

// Der == Operator prueft 2 Werte auf Gleichheit
if (a == b) { // -> wird zu true ausgewertet
	console.log("values are equal");
}

// Der != Operator prueft 2 Werte auf Ungleichheit.
if (a != c) { // -> wird zu true ausgewertet
	console.log("values are not equal");
}
```

---
#### # WHILE-Schleife

Schleifen sind Kontrollstrukturen, die es ermöglichen Anweisungen bzw. Blöcke von Anweisungen zu wiederholen.

While-Schleifen wiederholen Anweisungen solange, solange die gegebene Bedingung eintritt.

![[Pasted image 20231005144322.png]]


```javascript
// SYNTAX: While Schleife
while (<condition>) {
	<operations>
}
```

```javascript
// Beispiel: While Schleife
let foo = 0;
while (foo < 3) {
	console.log("wow");
	foo = foo + 1;
}

console.log("done");
```