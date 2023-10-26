#DB 

### Theorie
XSL = eXtensible Stylesheet Language = styling language for XML.
XSLT = XSL Transformations

- transform XML documents into other formats
	- XML
	- HTML
- Basierend auf XML
- Wird verwendet, um XML-Daten für die Anzeige in verschiedenen Formaten zu formatieren, wie z.B. HTML, XHTML, PDF, etc.
- Verwendet ein Template-basiertes System zur Erstellung von Formatierungsregeln
- Ermöglicht die Definition von Layouts, Stilen, Schriftarten und Farben
- Kann zur Erstellung von dynamischen Webseiten und Berichten verwendet werden
- Teil der XSL-Sprachfamilie, die auch XSLT (Transformation) enthält, um Daten zu transformieren

## Standard-file
```xml
<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="2.0">
...
</xsl:stylesheet>
```

Für Output:
```XML
# für XML
<xsl:output method="xml" encoding="utf-8" indent="yes"/>
# für HTML
<xsl:output method="html" encoding="utf-8" indent="yes"/>
```

Um auf Elemente zugreifen zu können - Start in Root:
```XML
<xsl:template match="/">
...
</xsl:template>
```


## HTML
Spitzklammern: ohne Attribute: ">" || "<"
bei Attributen: 
```XML
&lt;...&gt;
```
```XML
<xsl:text disable-output-escaping="yes"> 
	&lt;!DOCTYPE html&gt; 
</xsl:text> 

<html lang="de"> 
	<head> 
		<title>irgendwas </title> 
	</head> 
	<body>
</body> 
</html>
```


## Allgemeine Elemente:
```XML
<xsl:value-of select="firstname"/>

<xsl:value-of select='concat(last-name," ",first-name)'/>

# Zeilenumbruch
<xsl:text>&#10;</xsl:text>

# Klammer auf und wieder zu
<xsl:text disable-output-escaping="yes"> &lt;bla&gt; </xsl:text>
```

## Templates:
### Apply-template
	- man muss den ganzen Pfad angeben - unabhängig von aktuellem Knoten
```XML
<?xml version="1.0" encoding="utf-8" ?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="2.0">
    <xsl:output indent="yes" encoding="UTF-8" method="xml" />

    <xsl:template match="/">
        <xsl:text>&#10;</xsl:text>
        <positions>
            <xsl:apply-templates select="//teams/team" mode="var1"/>
            <xsl:apply-templates select="//teams/team" mode="var2"/>
            <xsl:apply-templates select="//teams/team" mode="var3"/>
        </positions>

    </xsl:template>

    <xsl:template match="team" mode="var1">
        <xsl:for-each select="position[@type = 'defense']">
            <position>
                <xsl:attribute name="type">
                    <xsl:value-of select="@type" />
                </xsl:attribute>
                <team>
                    <xsl:attribute name="code">
                        <xsl:value-of select="../nation/short-name"/>
                    </xsl:attribute>
                    <xsl:for-each select="player/name">
                        <player>
                            <xsl:value-of select="concat(first-name, ' ', last-name)"/>
                        </player>
                    </xsl:for-each>
                </team>
            </position>
        </xsl:for-each>
    </xsl:template>
    <xsl:template match="team" mode="var2">
        <xsl:for-each select="position[@type = 'playground']">
            <position>
                <xsl:attribute name="type">
                    <xsl:value-of select="@type" />
                </xsl:attribute>
                <team>
                    <xsl:attribute name="code">
                        <xsl:value-of select="../nation/short-name"/>
                    </xsl:attribute>
                    <xsl:for-each select="player/name">
                        <player>
                            <xsl:value-of select="concat(first-name, ' ', last-name)"/>
                        </player>
                    </xsl:for-each>
                </team>
            </position>
        </xsl:for-each>
    </xsl:template>
    <xsl:template match="team" mode="var3">
        <xsl:for-each select="position[@type = 'attack']">
            <position>
                <xsl:attribute name="type">
                    <xsl:value-of select="@type" />
                </xsl:attribute>
                <team>
                    <xsl:attribute name="code">
                        <xsl:value-of select="../nation/short-name"/>
                    </xsl:attribute>
                    <xsl:for-each select="player/name">
                        <player>
                            <xsl:value-of select="concat(first-name, ' ', last-name)"/>
                        </player>
                    </xsl:for-each>
                </team>
            </position>
        </xsl:for-each>
    </xsl:template>

</xsl:stylesheet>
```

### Call-template
	- kann von aktuellem Pfad jedes beliebige Template aufrufen
```XML
<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="2.0">
    <xsl:output method="xml" encoding="utf-8" indent="yes"/>
    <xsl:template match="/">
        <xsl:text>&#10;</xsl:text>
        <positions>
            <xsl:call-template name="haul">
                <xsl:with-param name="var1" select='"defense"'/>
            </xsl:call-template>

            <xsl:call-template name="haul">
                <xsl:with-param name="var1" select='"playground"'/>
            </xsl:call-template>

            <xsl:call-template name="haul">
                <xsl:with-param name="var1" select='"attack"'/>
            </xsl:call-template>
        </positions>
    </xsl:template>

    <xsl:template name="haul">
        <xsl:param name="var1"/>

        <xsl:for-each select="//teams/team/position[@type = $var1]">
            <position>
                <xsl:attribute name="type">
                    <xsl:value-of select="@type"/>
                </xsl:attribute>
                <team>
                    <xsl:attribute name="code">
                        <xsl:value-of select="../nation/short-name"/>
                    </xsl:attribute>
                    <xsl:for-each select="player/name">
                        <player>
                            <xsl:value-of select="concat(first-name, ' ', last-name)"/>
                        </player>
                    </xsl:for-each>
                </team>
            </position>
        </xsl:for-each>
    </xsl:template>

</xsl:stylesheet>
```