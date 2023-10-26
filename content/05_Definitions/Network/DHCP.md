#Networks 

DHCP = **Dynamic Host Configuration Protokoll** 

zuständig für eine Netzwerkkonfiguration.  
Vergibt automatisch:
·        IP-Adresse
·        Subnetzmaske
·        IP eines Standardgateways
·        DNS-Server

### Theorie
Weiterentwicklung von BOOTP (Bootstrap Protokoll).  

#### DHCP-Protokollablauf
Client  --> <mark style="background: #D2B3FFA6;">DHCP-DISCOVER</mark> an Server
Server --> antortet im Optimalfall mit einem <mark style="background: #D2B3FFA6;">DHCP-OFFER</mark> (enthält Netzparameter)
Client  --> prüft ob Parameter stimmen - schickt ein <mark style="background: #D2B3FFA6;">DHCP-REQUEST</mark> an Server zurück
Server bestätigt Zuteilung mit <mark style="background: #D2B3FFA6;">DHCP-ACK</mark>

#### Zeitangaben
·  **Lease Time** => wie lange die Netzparameter verwendet werden können.

·  **Renewal Time** => Zeitpunkt an dem sich der Client um eine Verlängerung bemüht (Hälfte der Lease Time)

·  **Rebinding Time** => Zeitpunkt wo der Client per Broadcast Kontakt zu einem Server sucht (7/8 der Lease Time)

- nach Ablauf der Lease-Time - DHCP-Server kann IP wieder neu vergeben


#### ISC-DHCP-Server
- gebräuchlichste DHCP-Softwarepaket (ISC= Internet Systems Consortium)  
Paket besteht aus:
·        DHCP-Serversoftware
·        DHCP-Clientsoftware
·        DHCP-Relay-Agent (benötigt man, wenn kein kompletter DHCP-Server zur Verfügung steht)

Wenn das Paket zum Ersten Mal installiert wird - stürzt ab.  
Die Konfigurationsdatei für den Server ist <mark style="background: #D2B3FFA6;">dhcpd.conf</mark>
Die Datei erhält sämtliche <mark style="background: #D2B3FFA6;">Deklarationen</mark> und <mark style="background: #D2B3FFA6;">Parameterdefinitionen</mark>.  
Beim schreiben einer solchen Datei soll man folgendes beachten:


#### Wichtige Parameter (isc-dhcp-server)

```JS
ddns-update-style none|interim 
// none= keine updates interim=es gibt updates

ddns-updates on|off 
//Ob Server bei DHCPACK versucht DNS zu aktualisieren
ddns-hostname 
//bestimmt den Namen, für den betreffenden Client im DNS
allow client-updates
// Client kann sich selbst einen Namen wünschen

ignore client-updates 
//soll sich selbst um Aktualisierung kümmern

deny clien-updates
//verbietet updates

use-host-decl-names 
//Rechnername wird anstatt von ddns-hostname verwendet

log-facility 
//angeben, welche Kategorieder DHCP-Server benutzt

option <Name> <Wert> 
//gibt eine DHCP-Option an
```