---
title: Automatyzacja
---

> Every great software developer, for example, now has an army of robots working for him at nighttime while he or she sleeps, after they’ve written the code, and it’s cranking away. ~ Naval Ravikant

Automatyzacja w moim rozumieniu polega na wykorzystaniu [[Knowledge/Programming/API]] do łączenia ze sobą wszystkich usług i serwisów, które je udostępniają. W dużym uproszczeniu chodzi o wymianę informacji pomiędzy aplikacjami, ograniczając zaangażowanie człowieka do minimum.

## White-hat Automation
Mając w zasięgu możliwość wysyłania tysięcy wiadomości i eliminowania kolejnych aktywności na rzecz automatyzacji, łatwo dojść do miejsca w którym zwyczajnie "przesadzimy". 

Sam stosuję prostą zasadę: nie automatyzuję procesu budowania relacji. **Wykorzystuję boty po to aby dawały mi przestrzeń do tego, aby móc poświęcić więcej czasu i uwagi innym.**

## Projektowanie scenariuszy
Do tworzenia scenariuszy automatyzacji wykorzystuję wszystkie moje umiejętności, zarówno techniczne jak i wiedzę na temat biznesu oraz budowania relacji.

**Najważniejszy stack [[Optimization/Tools/Narzędzia]]:** 
- [[Optimization/Tools/Airtable]] - bazy danych
- [[Optimization/Tools/Notion]] - zarzadzanie zadaniami, notatki i panele aktywności
- [[Optimization/Tools/MakeHQ]] i [[Optimization/Tools/Zapier]] - łączenie usług
- [[Optimization/Tools/Raycast]] - automatyzacja macOS
- [[Optimization/Tools/Buffer]] - publikacja w mediach społecznościowych
- [[Optimization/Tools/Sendgrid]] - maile transakcyjne i newslettery
- [[Optimization/Tools/Keyboard Maestro]], [[Optimization/Tools/Better Touch Tool]] i [[Optimization/Tools/Hazel]] - automatyzacja w systemie macOS
- [[Optimization/Tools/Shortcuts]] - automatyzacja na [[Optimization/Hardware/iPhone]]
- [[Optimization/Tools/Webflow]], [[Optimization/Tools/Framer Sites]] [[Systemflow]] i [[Carrd]] - strony www
- [[Tailwind CSS]] i [[Tailwind UI]] - low-code tworzenie stron
- [[Optimization/Tools/Slack]] - komunikacja z botami (w obie strony)

## Mój zespół robotów
Moje automatyzacje ulepszają się wraz z każdą kolejną iteracją. Oznacza to, że co jakiś czas wykorzystuję nowe narzędzia oraz zdobytą wiedzę do tego, aby zastąpić stare scenariusze nowymi.

Aktualnie każdy scenariusz przypisany jest do Avatara - bota posiadającego określone cechy, zdolności i odpowiedzialności. Każdy z nich może podejmować zadania samodzielnie lub w przypadku konieczności skorzystania z pomocy drugiego bota, może poprosić go o pomoc. 

Nazwy robotów są niczym innym jak rodzajem "kategorii" dzięki której łatwo jest mi tworzyć scenariusze i układać "user stories".

### Claire - Biuro
![avatar](https://space.overment.com/g15SCJixXvzEcGXz1Fi7/Claire-Office.png)
Odpowiedzialna za scenariusze związane z moim wirtualnym biurem. To ona dba o wystawianie dokumentów, przypomnienia o płatnościach czy organizację narzędzi, które wykorzystuję do codziennych zadań (które również jest mi w stanie sama przydzielić!). Jej najważniejszym narzędziem jest [[Optimization/Tools/Superhuman]] oraz [[Optimization/Tools/Notion]]

### Jenny - Social Media
![avatar](https://space.overment.com/2RHdid3HgnubEWBbFGBz/Jenny-Social-Media.png)
Jenny pomaga mi w prowadzeniu mediów społecznościowych. Dba o harmonogram, przygotowanie treści oraz przypomnienia o nowych komentarzach. Jej głównym narzędziem jest [[Optimization/Tools/Airtable]] i [[Optimization/Tools/Buffer]]

### Nicky - Designer
![avatar](https://space.overment.com/NmnfAQuQDP3pQLETM4fL/Nicky-Designer.png)
Nicky to designer tworzący niemal wszystkie grafiki które pojawiają się w moich wszystkich mediach społecznościowych. Wykorzystuje szablony i [[Projects/EasyBanner]] do tworzenia kreacji i przekazywania ich do pozostałych botów lub bezpośrednio do mojego schowka z pomocą [[Optimization/Tools/Keyboard Maestro]]

### Ellie - Researcher
![avatar](https://space.overment.com/30DlrdWqwsrOkAr42ReG/Ellie-Researcher.png)
Ellie pomaga mi w pozostawaniu na bieżąco z źródłami wiedzy z mojego [[Foundations/Knowledge acquisition system]] Odwiedza blogi, newslettery i strony www, zbierając informacje które mogą być przydatne dla mnie lub na potrzeby tworzonych przeze mnie materiałów. Ellie dodaje też nowe wpisy do mojego projektu [brain.overment.com](https://brain.overment.com) oraz do zasobów [[Projects/Ahoy!]]

### Luke - Content
![avatar](https://space.overment.com/hs32tUAIugXVHnxgJjDM/Luke-Studio.png)
Rolą Luke'a jest pomoc mi w przygotowaniu materiałów. Początkowo wyłącznie wideo a teraz również artykułów i plików audio. Zajmuje się przesyłaniem plików pomiędzy serwisami, tworzeniem kopii zapasowych oraz przygotowywaniem struktur materiałów. Np. po nagarniu materiału tworzy dla mnie wpis w Airtable z odpowiednio przygotowanymi linkami, aktualizuje notatki w brain.overment.com i z pomocą Claire dodaje mi zadania związane z uzupełnianiem treści przed ich publikacją.

### Rose - Newsletter
![avatar](https://space.overment.com/Bj4t3VyAuX4IZFC8aZ9f/Rose-Newsletter.png)
Rose pomaga mi ze wszystkim, co związane z rozbudową i prowadzeniem całej komunikacji mailowej. Np. planuje kampanie [[Optimization/Tools/Sendgrid]] czy wspólnie z Nicky i Jenny, publikują informacje o nim w mediach społecznościowych. 

## Tony - Developer
![avatar](https://space.overment.com/Tony-Programmer-qiFwc/Tony-Programmer.png)
Tony skupia się na pomocy w programowaniu i tworzeniu produktów. Ułatwia mi organizację i zarządzanie projektami czy obsługę narzędzi typowo związanych z programowaniem (np. terminal czy IDE ([[Optimization/Tools/Intellij]])


## Zarządzanie rosnącą liczbą scenariuszy
Wraz z rozwojem scenariuszy, makr, skrótów i listy narzędzi z których korzystam, pojawiają się momenty w których krótko mówiąc, zaczynam się w nich gubić lub przynajmniej zauważam, że nie korzystam z części z nich. 

To jak adresuję ten problem opisałem na [[Projects/Ahoy!]] w tym wpisie:
https://community.ahoy.so/c/integromat/jak-zarzadzac-rosnaca-liczba-scenariuszy-automatyzacji. Uwzględniłem w nim też różne techniki pracy, które ułatwiają mi budowanie nowych scenariuszy i makr.

Jednym z najważniejszych elementów tego procesu **jest usuwanie a nie dodawanie**. To nawiązanie do "Hack Away the Unessentials" o których tak wiele nauczył mnie [[Knowledge/People/Bruce Lee]]. 


## Powiązania
- [[Optimization/Automation/Microservices]]
- [[Optimization/Automation/Tools]]
- [[Optimization/Automation/Scenarios]]