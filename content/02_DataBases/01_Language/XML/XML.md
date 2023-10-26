#DB 
textbasierte Auszeichnungssprache zur Strukturierung von Daten
XML = "eXtensible Markup Language"

#### Verbindungen mit
- [[XSD]]
- [[XSLT-XSL]]

### Theorie
-   Textbasiertes Format zur Darstellung strukturierter Daten
-   Erlaubt die Definition benutzerdefinierter Tags und Attribute
-   Kann zur Beschreibung von Datenstrukturen und zum Datenaustausch verwendet werden
-   Lesbar von Menschen und Maschinen
-   Kann in Verbindung mit anderen Technologien wie XSLT und XPath verwendet werden, um Daten zu transformieren und zu analysieren
-   Kann in verschiedenen Anwendungen und Branchen wie Webentwicklung, E-Commerce, Datenintegration, etc. verwendet werden.
-   Basiert auf offenen Standards und ist plattformunabhängig

### XML-Code Grundgerüst
```XML
<root xmlns:xs="http://www.w3.org/2001/XMLSchema-instance" xs:noNamespaceSchemaLocation="root.xsd">
	... 
</root>
```

### Code-Beispiel
- mit eigenen Tags
```XML
<kursverwaltung xmlns:xs="http://www.w3.org/2001/XMLSchema-instance" xs:noNamespaceSchemaLocation="kursverwaltung.xsd">
<?xml-stylesheet type="text/xsl" href="kursverwaltung.xsd"?>
<label>Berufsreifeprüfung</label>
<participants>
	<participant id="1">
		<lastname>Muster</lastname>
		<firstname>Max</firstname>
		<email>m1.muster@muster.at</email>
		<address>
			<zipcode>3100</zipcode>
			<city>St. Pölten</city>
		</address>
		<courses>
			<course course_id="12345678">
				<subject>Deutsch</subject>
				<price>100</price>
				<bookingstate>bezahlt</bookingstate>
				<year>2020</year>
				<grade>4</grade>
			</course>
			<course course_id="23456789">
				<subject>Englisch</subject>
				<price>200</price>
				<bookingstate>bezahlt</bookingstate>
				<year>2020</year>
				<grade>3</grade>
			</course>
			<course course_id="1">
				<subject>Mathematik</subject>
				<price>300</price>
				<bookingstate>bezahlt</bookingstate>
				<year>2020</year>
				<grade>2</grade>
			</course>
	</participant>
	<participant id="2">
		<lastname>Cäsar</lastname>
		<firstname>Julius</firstname>
		<address>
			<zipcode>3105</zipcode>
			<city>Radelberg</city>
		</address>
		<courses>
			<course course_id="12345678">
				<subject>Deutsch</subject>
				<price>100</price>
				<bookingstate>offen</bookingstate>
				<year>2020</year>
				<grade>1</grade>
			</course>
		</courses>
	</participant>
</participants>
</kursverwaltung>
```
