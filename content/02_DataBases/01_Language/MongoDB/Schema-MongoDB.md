#DataBases  

---

### Theorie
- Erstellen von Validierungsregeln - jedes Dokument in DB bekommt fixe Anforderung

### BSON-Datenformat
- binäres Datenformat
- kann im Vergleich zu JSON schneller von MongoDB Datenbank verarbeitet werden
- speichern Daten in Form von Key-Value Paaren


### Keywords-Schema
```JS
#region_Basic_Commands
bsonType = "..."               // Beschreibung Eigenschaften-Typ
required = "[..., ..., ...]"   // Beschreibung zwingende Eigenschaften
additionalProperties = true    // erlaubt Hinzufügen weiterer Eigenschaften
	properties: {...}          // hereinschreiben de Eigenschaften

minLength: ...                 // minimale Eingabelänge
maxLength: ...                 // maximale Eingabelänge
minimum: ...                   // ... ist die niedrigste Zahl
maximum: ...                   // ... ist die höchste Zahl

#region_Enum                   // Auswahlliste - eines kann ausgewählt werden
...
properties: {
	bookingstate:{
		enum: ["bezahlt", "offen", "storniert"]
	}
}

#region_Array
bsonType = "array",            // anstatt "properties" - "items"
minItems: 1,                   // minimale Anzahl
maxItems: 5,                   // maximale Anzahl
uniqueItems: true,             // vermeiden von Redundanzen
items: {
	bsonType: "...",
	required: ["...", "..."],
	additionalproperties: false,
	properties: {
		...
	}
}
```


### Validation-Rules
```JS
// Kollektion erstellen - level: strikt; fehlertyp: error
db.createCollection(  
"example",  
{  
    validationLevel: "strict",  
    validationAction: "error",  
    validator: {  
        $jsonSchema: 

// Dokumentbeschreibung - first_name, last_name, cities - FIX
				      {  
                bsonType: "object",  
                required: ["first_name", "last_name", "cities"],  
                additionalProperties: true,  
                properties: {  
                    first_name : {  
                        bsonType: "string",  
                        maxLength: 50  
                    },  
                    last_name : {  
                        bsonType: "string",  
                        minLength: 3,  
                        maxLength: 50  
                    },  
                    email : {  
                        bsonType: "string",  
                        maxLength: 50  
                    },  
                    // cities - benötigt zipcode, city - keine weiteren Eigenschaften
                    cities : {  
                        bsonType : "object",  
                        required : ["zipcode", "city"],  
                        additionalProperties : false,  
                        properties : {  
                            zipcode : {  
                                bsonType : "string",  
                                maxLength : 4  
                            },  
                            city : {  
                                bsonType : "string",  
                                maxLength: 50  
                            }  
                        }  
                    },  
                    courses : {  
                        bsonType : "array",  
                        additionalProperties : false,  
                        items : {  
                            bsonType : "object",  
                            required : ["course", "subject", "price"],  
                            additionalProperties : true,  
                            properties : {  
                                course : {  
                                    bsonType : "string",  
                                    minLength : 1,  
                                    maxLength : 8  
                                },  
                                subject : {  
                                    enum : ["Mathematik", "Deutsch", "Englisch", "Fachbereich", "Webdesign"]  
                                },  
                                price : {  
                                    bsonType : "int",  
                                    minimum : 0,  
                                    maximum : 999  
                                },  
                                bookingstate : {  
                                    enum : ["bezahlt", "offen", "storniert"]  
                                },  
                                grade : {  
                                    enum : [1, 2, 3, 4, 5]  
                                },  
                                course_year : {  
                                    bsonType : "int",  
                                    minimum : 2000,  
                                    maximum : 3000  
                                }  
                            }  
                        }  
                    }  
                }  
            } 


```


### Code-Example-Kursverwaltung:
```JS
// SCHEMADEFINITION  
db.createCollection(  
    "Participant", {  
        validationLevel: "strict",  
        validationAction: "error",  
        validator: {  
            $jsonSchema: {  
                bsonType: "object",  
                required: ["first_name", "last_name", "cities"],  
                additionalProperties: true,  
                properties: {  
                    first_name : {  
                        bsonType: "string",  
                        maxLength: 50  
                    },  
                    last_name : {  
                        bsonType: "string",  
                        minLength: 3,  
                        maxLength: 50  
                    },  
                    email : {  
                        bsonType: "string",  
                        maxLength: 50  
                    },  
                    cities : {  
                        bsonType : "object",  
                        required : ["zipcode", "city"],  
                        additionalProperties : false,  
                        properties : {  
                            zipcode : {  
                                bsonType : "string",  
                                maxLength : 4  
                            },  
                            city : {  
                                bsonType : "string",  
                                maxLength: 50  
                            }  
                        }  
                    },  
                    courses : {  
                        bsonType : "array",  
                        additionalProperties : false,  
                        items : {  
                            bsonType : "object",  
                            required : ["course", "subject", "price"],  
                            additionalProperties : true,  
                            properties : {  
                                course : {  
                                    bsonType : "string",  
                                    minLength : 1,  
                                    maxLength : 8  
                                },  
                                subject : {  
                                    enum : ["Mathematik", "Deutsch", "Englisch", "Fachbereich", "Webdesign"]  
                                },  
                                price : {  
                                    bsonType : "int",  
                                    minimum : 0,  
                                    maximum : 999  
                                },  
                                bookingstate : {  
                                    enum : ["bezahlt", "offen", "storniert"]  
                                },  
                                grade : {  
                                    enum : [1, 2, 3, 4, 5]  
                                },  
                                course_year : {  
                                    bsonType : "int",  
                                    minimum : 2000,  
                                    maximum : 3000  
                                }  
                            }  
                        }  
                    }  
                }  
            }  
        }  
    }  
);
```

### Code-Example-KaffeeShop
```JS
// auswahlliste: Sorte: Enum  
db;  
show dbs;  
  
use insy_3chit;  
show collections;  
db.coffee.drop();  
db.coffee.find();  
  
// SCHEMA  
db.createCollection("coffee", {  
    // braucht Typdefinition  
    validationLevel: "strict",  
    // Error bei Validationsfehler  
    validationAction: "error",  
    validator: {  
        $jsonSchema: {  
            bsonType: "object",  
            // Zuweisung des Titels "Kaffeshop" für das Dokument  
            title: "Kaffeeshop",  
            required: ["article", "price", "amount", "sort"],  
            additionalProperties: true,  
            properties: {  
                article: {  
                    bsonType: "string",  
                    description: "Artikel",  
                    maxLength: 50  
                },  
                price: {  
                    bsonType: "double",  
                    description: "Verkaufspreis",  
                    // Wert anstatt: minLength/maxLength  
                    minimum: 0,  
                    maximum: 999.99  
                },  
                amount: {  
                    bsonType: "int",  
                    minimum: 0  
                },  
                sort: {  
                bsonType: "string",  
                enum: ["Bohnenkaffee", "Espresso", "Pulverkaffee", "Schonkaffee",  "Americano"]  
                },  
                producer: {  
                bsonType: "object",  
                required: ["name", "city", "zipcode"],  
                additionalProperties: false,  
                properties: {  
                    name: {  
                        enum: ["Dallmayr", "Tchibo", "Cellini", "Hochland"],  
                        },  
                    city: {  
                        bsonType: "string",  
                        maxLength: 50  
                        },  
                    zipcode: {  
                        bsonType: "string",  
                        minLength: 4,  
                        maxLength: 5  
                    }  
                    }  
                },  
                tastes: {  
                // array - weil im Kaffee mehrere Geschmäcker besitzt  
                    bsonType: "array",  
                    additionalProperties: false,  
                    uniqueItems: true,  
                    items: {  
                    // bei bsonType hätte man ein leeres Objekt - leere Aufzählliste  
                        bsonType: "object",  
                        additionalProperties: false,  
                        required: ["taste"],  
                        properties: {  
                            taste: {  
                                enum: ["cremig", "mild", "vollmundig"]  
                            }  
                        }  
                    }  
                }  
            }  
        }  
    }  
})  
  
// Datensätze  
db.coffee.insertOne(  
    {  
    article: "Espresso dOro",  
    price: 7.30,  
    amount: 10,  
    sort: "Espresso",  
    producer: {  
        name: "Dallmayr",  
        zipcode: "80331",  
        city: "München"  
    },  
    // Array mit Objekten  
    tastes: [  
        {taste: "vollmundig"},  
        {taste: "mild"}  
    ]  
});  
  
db.coffee.insertOne(  
    {  
    article: "Beste Bohne",  
    price: 5.30,  
    amount: 45,  
    sort: "Bohnenkaffee",  
    producer: {  
        name: "Dallmayr",  
        zipcode: "80331",  
        city: "München"  
    }  
});
```

### Code-Example-MongoDB(Teil 1) - Teams
```JS
use insy_3chit;  
  
// 4.1 / Collection - Schema  
  
db.createCollection(  
"projects",  
{  
    validationLevel: "strict",  
    validationAction: "error",  
    validator: {  
        $jsonSchema: {  
            // PROJEKT  
            bsonType: "object",  
            title: "Projects",  
            required: ["title", "projectBegin", "type", "state"],  
            additionalProperties: true,  
            properties: {  
                _id: { },  
                title: {  
                    bsonType: "string",  
                    minLength: 3,  
                    maxLength: 50  
                },  
                type: {  
                    enum: ["request", "research", "management"]  
                },  
                state: {  
                    enum: ["created", "in_approvement", "approved"]  
                },  
                description: {  
                    bsonType: "string",  
                    minLength: 0,  
                    maxLength: 4000  
                },  
                projectBegin: {  
                    bsonType: "date"  
                },  
                isFWFSponsored: {  
                    bsonType: "bool"  
                },  
                isFFGSponsored: {  
                    bsonType: "bool"  
                },  
                isEUSponsored: {  
                    bsonType: "bool"  
                },  
                isSmallProject: {  
                    bsonType: "bool"  
                },  
                // SUBPROJECTS  
                subprojects: {  
                    bsonType: "array",  
                    additionalProperties: false,  
                    uniqueItems: true,  
                    items: {  
                        bsonType: "object",  
                        required: ["title"],  
                        additionalProperties: false,  
                        properties: {  
                            title: {  
                                bsonType: "string",  
                                minLength: 3,  
                                maxLength: 100  
                            },  
                            description: {  
                                bsonType: "string",  
                                minLength: 0,  
                                maxLength: 4000  
                            },  
                            appliedResearch: {  
                                bsonType: "int",  
                                minimum: 0,  
                                maximum: 100  
                            },  
                            theoreticalResearch: {  
                                bsonType: "int",  
                                minimum: 0,  
                                maximum: 100  
                            },  
                            focusResearch: {  
                                bsonType: "int",  
                                minimum: 0,  
                                maximum: 100  
                            }  
                        }  
                    }  
                },  
                // FACILITIES  
                facilities: {  
                    bsonType: "object",  
                    required: ["name", "code"],  
                    additionalProperties: false,  
                    properties: {  
                        name: {  
                            bsonType: "string",  
                            minLength: 3,  
                            maxLength: 100  
                        },  
                        code: {  
                            bsonType: "string"  
                        }  
                    }  
                },  
                // DEBITORS  
                debitors: {  
                    bsonType: "object",  
                    required: ["name"],  
                    additionalProperties: false,  
                    properties: {  
                        name: {  
                            bsonType: "string",  
                            minLength: 5,  
                            maxLength: 100  
                        },  
                        description: {  
                            bsonType: "string"  
                        }  
                    }  
                }  
            }  
        }  
    }  
});  
db.projects.drop();  
  
  
// 4.1 / Insert-Statements  
  
db.projects.insertMany([  
    {  
        title: "Projekt-Testübung",  
        type: "request",  
        state: "created",  
        projectBegin: ISODate("2023-06-13"),  
        isFWFSponsored: false,  
        subprojects: [{ title: "Test", focusResearch: 50 }]  
    },  
    {  
        title: "INSY Projekt 1",  
        type: "management",  
        state: "approved",  
        projectBegin: ISODate("2023-04-26"),  
        isFWFSponsored: true  
    },  
    {  
        title: "INSY Projekt 2",  
        type: "research",  
        state: "in_approvement",  
        projectBegin: ISODate("2022-03-27"),  
        isEUSponsored: true,  
        subprojects: [  
            { title: "Subprojekt 1", focusResearch: 100, appliedResearch: 30 },  
            { title: "Subprojekt 2", theoreticalResearch: 80 },  
            { title: "Subprojekt 3", theoreticalResearch: 80, appliedResearch: 10 }  
        ],  
        debitors: {  
            name: "Person 1",  
            description: "Person"  
        },  
        debitors: {  
            name: "Person 2",  
            description: "Person"  
        },  
        debitors: {  
            name: "Person 3",  
            description: "Person"  
        }  
    },  
    {  
        title: "INSY Projekt 3",  
        type: "research",  
        state: "approved",  
        facilities: {  
            name: "facility 1",  
            code: "123"  
        },  
        facilities: {  
            name: "facility 2",  
            code: "234"  
        },  
        facilities: {  
            name: "facility 3",  
            code: "345"  
        },  
        facilities: {  
            name: "facility 4",  
            code: "456"  
        },  
        facilities: {  
            name: "facility 5",  
            code: "567"  
        },  
        subprojects: [  
            { title: "Subprojekt 4", theoreticalResearch: 40 },  
            { title: "Subprojekt 5", appliedResearch: 10 }  
        ],  
        debitors: {  
            name: "Person 4",  
            description: "Person"  
        },  
        debitors: {  
            name: "Person 5",  
            description: "Person"  
        },  
        projectBegin: ISODate("2023-02-03"),  
        isFFGSponsored: false  
    },  
    {  
        title: "INSY Projekt 4",  
        type: "request",  
        state: "in_approvement",  
        projectBegin: ISODate("2022-08-09"),  
        isFWFSponsored: false  
    }  
]);  
  
db.projects.find();  
  
  
// 4.1 / Dokumente bearbeiten  
  
// 1/  
db.projects.updateMany({}, [  
{  
    $set: {projectEnd: 2020-01-01}  
},  
{  
    $set: {rating: 5}  
},  
{  
    $set: {partners: ["TU Wien"]}  
}  
]);  
db.projects.find();  
  
// 2/  
db.projects.updateMany({type: "request"},  
{  
    $set: {isEUSponsored: true}  
});  
  
// 3/  
db.projects.updateMany({},  
{  
    $rename: {rating: "projectRating"}  
});  
db.projects.find();  
  
// 4/  
db.projects.updateMany({},  
{  
    $addToSet: {partners: "HTL Krems"},  
    $addToSet: {partners: "TU Graz"}  
});  
db.projects.updateMany({},  
{  
    $pull: {partners: "HTL Krems"}  
});  
db.projects.find();
```