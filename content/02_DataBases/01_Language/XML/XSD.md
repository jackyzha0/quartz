#DB 
XSD = XML Schema Definition = Beschreibung der Struktur von XML-Dokumenten 

#### Theorie
-   Basierend auf XML
-   Struktur von XML-Dokumenten zu definieren + validieren
-   Definiert Datenmodell, einschließlich Elemente, Attribute, Datentypen, etc.
-   Kann verwendet werden, um die Gültigkeit von XML-Dokumenten zu überprüfen und Fehler zu identifizieren
-   Kann zur Dokumentation von XML-Schemas und zum Datenaustausch zwischen verschiedenen Systemen verwendet werden
-   Unterstützt komplexe Datenstrukturen und Wiederholungen von Elementen und Attributen
-   Kann mit anderen XML-Technologien wie XSLT und XPath verwendet werden, um Daten zu transformieren und zu analysieren
-   Teil des W3C-XML-Schema-Standards und wird von verschiedenen Anwendungen und Systemen unterstützt

### Code-Beispiel
```XSD
<?xml version="1.0" encoding="utf-8" ?>
<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema">

    <xs:simpleType name="zipcodeType">
        <xs:restriction base="xs:string">
            <xs:pattern value="[0-9][0-9][0-9][0-9]"/>
        </xs:restriction>
    </xs:simpleType>

    <xs:complexType name="addressType">
        <xs:sequence>
            <xs:element name="zipcode" type="zipcodeType"/>
            <xs:element name="city" type="xs:string"/>
        </xs:sequence>
    </xs:complexType>

    <xs:simpleType name="username">
        <xs:restriction base="xs:string">
            <xs:minLength value="3"/>
            <xs:maxLength value="50"/>
        </xs:restriction>
    </xs:simpleType>

    <xs:simpleType name="emailType">
        <xs:restriction base="xs:string">
            <xs:pattern value="([a-zA-Z0-9]([-.\w]*)([a-zA-Z0-9])@([a-zA-Z0-9]([-.\w]*)([a-zA-Z0-9]*)+[a-z]{2,9}))"/>
        </xs:restriction>
    </xs:simpleType>

    <xs:element name="kursverwaltung">
        <xs:complexType>
            <xs:sequence>
                <xs:element name="label"/>
                <xs:element name="participants">
                    <xs:complexType>
                        <xs:sequence>
                            <xs:element name="participant" maxOccurs="unbounded">
                                <xs:complexType>
                                    <xs:sequence>
                                        <xs:element type="username" name="lastname"/>
                                        <xs:element type= "username" name="firstname"/>
                                        <xs:element type="emailType" nillable="true" minOccurs="0" name="email"/>
                                        <xs:element type="addressType" name="address" nillable="true" minOccurs="0"/>
                                        <xs:element name="courses" nillable="true" minOccurs="0">
                                            <xs:complexType>
                                                <xs:sequence>
                                                    <xs:element name="course" maxOccurs="4">
                                                        <xs:complexType>
                                                            <xs:sequence>
                                                                <xs:sequence>
                                                                    <xs:element type="xs:string" name="subject"/>
                                                                    <xs:element type="xs:int" name="price"/>
                                                                    <xs:element type="xs:string" name="bookingstate"/>
                                                                    <xs:element type="zipcodeType" name="year"/>
                                                                    <xs:element type="xs:int" name="grade" nillable="true" minOccurs="0"/>
                                                                </xs:sequence>
                                                            </xs:sequence>
                                                            <xs:attribute name="course_id" type="xs:string"/>
                                                        </xs:complexType>
                                                    </xs:element>
                                                </xs:sequence>
                                            </xs:complexType>
                                        </xs:element>
                                    </xs:sequence>
                                    <xs:attribute type="xs:string" name="id"/>
                                </xs:complexType>
                            </xs:element>
                        </xs:sequence>
                    </xs:complexType>
                </xs:element>
            </xs:sequence>
        </xs:complexType>
    </xs:element>
</xs:schema>
```