#DB 

### Kursverwaltung
```Js
show dbs;  
db;  
  
use kursverwaltung;  
db.createCollection('Participant');  
db.dropDatabase("kursverwaltung");  
  
show collections;  
  
  
db.Participant.insertMany([  
    {  
    first_name: "Max",  
    last_name: "Muster",  
    email: "m.muster@muster.at",  
    cities:  
        {  
        zipcode: "3100",  
        city: "St.Pölten"  
        },  
    courses: [  
        {  
        course: "1",  
        subject: "Mathematik",  
        price: 300,  
        course_year: 2020,  
        bookingstate: "bezahlt",  
        grade: 2  
        },  
        {  
        course: "12345678",  
        subject: "Deutsch",  
        price: 100,  
        course_year: 2020,  
        bookingstate: "bezahlt",  
        grade: 4  
        },  
        {  
        course: "2",  
        subject: "Fachbereich",  
        price: 400,  
        course_year: 2020,  
        bookingstate: "bezahlt",  
        grade: 1  
        },  
        {  
        course: "23456789",  
        subject: "Englisch",  
        price: 200,  
        course_year: 2020,  
        bookingstate: "bezahlt",  
        grade: 3  
        }  
    ]},  
    {  
    first_name: "Julius",  
    last_name: "Cäsar",  
    cities:  
        {  
        zipcode: "3105",  
        city: "Radlberg"  
        },  
    courses:  
    [  
        {  
        course: "12345678",  
        subject: "Deutsch",  
        price: 100,  
        course_year: 2020,  
        bookingstate: "offen",  
        grade: 1  
        },  
        {  
        course: "23456789",  
        subject: "Englisch",  
        price: 200,  
        course_year: 2020,  
        bookingstate: "bezahlt",  
        grade: 5  
        },  
        {  
        course: "1",  
        subject: "Mathematik",  
        price: 300,  
        course_year: 2020,  
        bookingstate: "bezahlt",  
        grade: 1  
        },  
        {  
        course: "2",  
        subject: "Fachbereich",  
        price: 400,  
        course_year: 2020,  
        bookingstate: "bezahlt",  
        grade: 1  
        },  
    ]},  
    {  
    first_name: "Franz",  
    last_name: "Achilles",  
    email: "ferse@muster.at",  
    cities:  
        {  
        zipcode: "3106",  
        city: "Spratzern"  
        },  
    courses:  
    [  
        {  
        course: "1",  
        subject: "Mathematik",  
        price: 300,  
        course_year: 2020,  
        bookingstate: "bezahlt",  
        grade: 1  
        },  
        {  
        course: "2",  
        subject: "Fachbereich",  
        price: 400,  
        course_year: 2020,  
        bookingstate: "bezahlt",  
        }  
    ]},  
    {  
    first_name: "Titus",  
    last_name: "Tatius",  
    email: "titus@muster.at",  
    cities:  
        {  
        zipcode: "3106",  
        city: "Spratzern"  
        },  
    courses:  
    [  
        {  
        course: "12345678",  
        subject: "Deutsch",  
        price: 100,  
        course_year: 2019,  
        bookingstate: "bezahlt",  
        },  
        {  
        course: "2",  
        subject: "Fachbereich",  
        price: 400,  
        course_year: 2019,  
        bookingstate: "offen",  
        }  
    ]},  
    {  
    first_name: "Kein",  
    last_name: "Kurs",  
    cities:  
        {  
        zipcode: "3100",  
        city: "St.Pölten"  
        }  
    },  
    {  
    first_name: "Kein",  
    last_name: "Kurs",  
    cities:  
        {  
        zipcode: "3100",  
        city: "St.Pölten"  
        }  
    }]);
```

### Kaffeehandel
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
                    desciption: "Anzahl",  
                    minimum: 0  
                },  
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