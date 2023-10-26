#OS 

### Theorie
- RAID = Redundant Array of Independent Disks

= Verbund von mehreren Festplatten - in denen gesicherte Daten mehrmals vorkommen
- für höhere Ausfallsicherheit 


### Arten von RAIDs
- WICHTIGSTEN: RAIDs 0, 1, 5, 6

##### - RAID 0: benötigt 2 mind. Festplatten
	- abgespeicherten Daten werden auf die beiden Festplatten abgespeichert
	- Rechner kann von beiden Platten lesen und schreiben --> SCHNELLER
	- Nachteil: fällt eine Platte aus - gehen wichtige Daten verloren (andere Hälfte verliert an Wert) 
	
###### - RAID 1: benötigt mind 2 Festplatten
	- fällt eine der Festplatten aus - man hat Sicherungskopie auf der anderen (1 : 1 Sicherungskopie)
	- Nachteil: braucht viel Speicher
	
##### - RAID 5: benötigt mind. 3 Festplatten
	- Daten wie bei RAID 0 auf alle Festplatten verteilt - jedoch zusätzliches hinterlegen von Prüfsummen
		- sollte eine Platte ausfallen, können durch Prüfsumme die verlorenen  Daten errechnet werden
	- Nachteil: LANGSAM
	- Vorteil: AUSFALLSICHER

##### - RAID 6: benötigt mind. 4 Festplatten
	- arbeitet ähnlich wie RAID 5 - berechnet 2 Arten von Profüsummen
		- es können sogar 2 Festplatten ausfallen, ohne dass Daten verloren gehen
	- Vorteil: AUSFALLSICHER
	- NACHTEIL: NOCH LANGSAMER ALS RAID 5

##### - RAID 10: Kombinieren von RAID 0 & RAID 1 - mind. 4 Festplatten
	- Daten auf mehrere Festplatten aufgeteilt (RAID 0) - zusätzlich: Spiegeln der Daten auf andere Festplatte (RAID 1)
	- Vorteil: SCHNELL & AUSFALLSICHER
	- Nachteil: HOHE KOSTEN VIELER FESTPLATTEN