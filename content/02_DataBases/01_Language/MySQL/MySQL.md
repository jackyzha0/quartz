^#DB 

### Theorie
- relationale Datenbank
- jeder Datensatz wird als eine Tabellenzelle mit Zeilen u. Spalten gespeichert
- erfordert Schemadefinition
- Unterstützt Fremdschlüssel (Foreign-Key)
- Leistung für hochleistungsfähige Joins über mehrere Tabellen
- SQL: häufigere Verwendungen im Vergleich zu MongoDB

## Grundbefehle:

#### Anzeige DBs - Rechte
```MySQL
# Benuterrechte anzeigen
SHOW GRANTS;
SHOW GRANTS FOR CURRENT_USER;
```

```MySQL
# vorhandenen DBs anzeigen
SHOW DATABASES;
```

#### Löschen/Erstellen einer DB
```MySQL
DROP DATABASE IF EXISTS dbname;

CREATE DATABASE dbname CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

#### Schema einstellen
```MySQL
USE dbname;
```

#### Löschen von Tables in einer DB
```MySQL
DROP TABLE IF EXISTS table1
DROP TABLE table2
```

#### Erstellen von Tables
```MySQL
CREATE TABLE tablename
(
	ATTRIBUTE VARCHAR(4) NOT NULL,
	ATTRIBUTE2 INT NOT NULL,
	PRIMARY KEY (ATTRIBUTE)
)
```

#### Einträge in Tables
```MySQL
INSERT INTO tablename (ATTRIBUTE, ATTRIBUTE2) VALUES ("1", 100 000)
```

#### Union

get associations

```MySQL

```