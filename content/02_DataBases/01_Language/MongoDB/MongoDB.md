#DataBases 

---

[[Schema-MongoDB]]
[[MongoDB-Übungen]]

### Theorie
- noSQL Datenbank
- Case-Sensitive (Groß- bzw. Kleinschreibung beachten!)
- dokumentbasiert
- ohne Schema
- Unterstützt JSON Format
- Unterstützt keine Fremdschlüssel (Foreign-Keys)
- Unterstützt Sharing und Replikation

- optimiert für Schreibleistung
	- gut geeignet für Echtzeit-Analysen, Content Management, Internet, ...


Grundlegende Commands:
```js
// alle Datenbanken anzeigen  
show dbs;  
  
// aktuelle Datenbank anzeigen  
db;  
  
// neue DB erzeugen  
use insy_3chit;  
  
// löschen einer DB; Achtung auf Zeitintervall bis zur Aktualisierung  
db.dropDatabase('insy_3chit');  
  
// neue Collection (Applikation) erzeugen  
db.createCollection('obstladen');  
  
// alle Collection anzeigen  
show collections;  
  
// einfügen eines neuen Dokumentes ("Datensatz")  
db.obstladen.insertOne({  
    name: "Banane",  
    price: 0.99,  
    category: 'Obst',  
    amount: 16  
});  
  
// anzeigen aller Dokumente  
db.obstladen.find();    // legt selber primary-key an (_id)
```

## mehrere Dokumente einfügen:
```javascript
// mehrere Dokumente einfügen  
db.obstladen.insertMany(  
    [  
        {  
            name: "Apfel Neu",  
            price: 0.80,  
            category: 'Obst',  
            amount: 10  
        },  
        {  
            name: "Apfel",  
            price: 0.60,  
            category: 'Obst',  
            amount: 2  
        },  
        {  
            name: "Kiwi",  
            price: 1.20,  
            category: 'Obst',  
            amount: 0,  
            ratings: [  
                { user: "Lassl", stars: 5},  
                { user: "Haul", stars: 4},  
                { user: "Muster", stars: 1}  
            ]  
        }  
    ]  
);
```

## Ausgabe filtern
```javascript
// filtern nach name="Apfel"  
db.obstladen.find({ name: "Apfel"});

// filtern nach Namen - aufsteigend/absteigend sortiert  
db.obstladen.find().sort({name: 1});  
db.obstladen.find().sort({name: -1});
```

## Dokumente zählen
```javascript
// Ergebnisse zählen  
db.obstladen.find().count();  
db.obstladen.countDocuments();
```


## Index erstellen/löschen
```JavaScript
// Feld Indexieren - für eine Suche erforderlich  
db.obstladen.createIndex(  
{ name: "text" },  
{ default_language: "german" }  
);  
  
// INdex löschen  
db.obstladen.dropIndex("name_text");  
  
// Indexe anzeigen  
db.obstladen.getIndexes();
```

## Ausgabe einschränken und filtern
```JavaScript
// Ergebnis einschränken (ersten 2 Datensätze)  
db.obstladen.find().limit(2);  
db.obstladen.find().sort( {price: 1}).limit(1);  
  
// Filterung nach größer, kleiner  
    // $gt, $gte, $lt, $lte, $eqdb.obstladen.find(  
    {  
    price: {$gt: 0.9}  
    }  
);

// Ergebnis filtern mit Kombinationen (Suchkriteriem, Ausgabe)  
    // _id = 0 - blendet Primary-Key aus
db.obstladen.find(  
{ category: "Obst" },  
{ _id: 0, name: 1, price: 1}  
);
```

## Text suchen
```JavaScript
// nach Text suchen  
db.obstladen.find(  
{  
    $text: { $search: "Apfel" }  
});
```


## Dokumente Updaten
```JavaScript
// Preis der Banane ändern
db.obstladen.updateOne(  
{ name: "Banane" },  
{  
    $set: { price: 2.99 }  
}  
);

// hinzufügen einer Kategorie (Gurke)  
db.obstladen.updateOne(  
{ name: "Gurke" },  
{  
    $set:  
    {  
        price: 5,  
        category: "Gemüse",  
        views: 0  
    }  
},  
{  
// wenn ein Objekt nicht existiert wird es so erstellt und aktualisiert  
upsert: true  
}  
);

// für alle Obst wird der Price auf 0.2 gesetzt  
db.obstladen.updateMany(  
{ category: "Obst" },  
{  
    $set: {  
        price: 0.2  
    }  
}  
);

// erhöhrt den Wert von views um +1  
db.obstladen.updateOne(  
{ name: "Gurke" },  
{  
    $inc: {  
        views: 1  
    }  
}  
);

// ein Feld umbenennen  
db.obstladen.updateOne(  
{ name: "Gurke" },  
{  
    $rename:  
    { views: "likes" }  
}  
);
```

## Delete One/Many
```JavaScript
// ein Dokument löschen  
db.obstladen.deleteOne({name: "Gurke"});  
  
// viele Dokumente löschen  
db.obstladen.deleteMany({category: "Obst"});

// Collection löschen
db.obstladen.drop();

// Datenbank löschen
db.dropDatabase("insy_3chit");
```

## Redundanzen vermeiden
```JS
// .distinct()
db.Participant.distinct("courses.subject");
```