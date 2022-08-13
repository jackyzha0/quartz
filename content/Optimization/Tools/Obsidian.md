---
title: Obsidian
---

## Czym jest Obsidian?
Najprościej mówiąc to aplikacja do notowania. Jej głównymi zaletami jest fakt, że pracuje na lokalnych plikach [[markdown]] oraz umożliwia połączenia między notatkami poprzez tzw. "wiki links". Na ich podstawie może budować mapy treści. 

## Jak wykorzystuję Obsidian? 
Wyłącznie w jednym celu: rozwijania tego projektu, czyli tzw. Digital Garden. Z pomocą projektu [Quartz](https://quartz.jzhao.xyz/) (opartego o framework Hugo) publikuję te notatki w domenie brain.overment.com. 

### Zasady
Pomimo tego, że zapoznałem się z więkością materiałów od osób takich jak Tiago Forte, tak jednocześnie większość zasad rozwoju notatek w Obsidianie opracowałem samodzielnie. Według mnie Tiago świetnie organizuje temat ale jego system jest dla mnie zbyt złożony. Z pewnością pod wieloma względami się różnimy, więc mój proces musiał zostać dopasowany do mnie. 

**Zasady to:** 
- Gdy o czymś piszę i pada słowo kluczowe na temat którego chcę powiedzieć więcej, oznaczam je linkiem. 
- Stosuję prostą organizację katalogów, czyli:
	- Fundamenty - moje podstawy funkcjonowania
	- Optymalizacja - moje techniki optymalizacji
	- Wiedza - to, co wiem
	- i Projekty - to, co robię
- W przypadku gdy widzę, że jakiś temat uwzględnia wiele powiązanych ze sobą zagadnień tworzę notatkę zbiorczą, stanowiącą zbiór lików do wszystkich tematów. Według m.in. Tiago, to tzw. ToC - Table of Contents.
- Tworzę treści o tym, co chcę eksplorować lub o tym, co jest dla mnie w danej chwili ważne. Często wyzwalaczem jest sytuacja w której ktoś zadaje mi pytanie a ja widzę, że powtarza się ono często, więc lepiej będzie napisać o nim notatkę zamiast odpowiadać indywidualnie. 

i to wszystko. Nie ma nic poza tym. 

### Automatyzacja
Do pracy z Obsidianem wykorzystuję [[Optimization/Tools/Keyboard Maestro]] oraz moje makra [[Projects/Design Maestro]]. Umożliwiają mi one przede wszystkim: 

- szybkie otwieranie wybranych notatek (x-scheme-url np. obsidian://open?vault=content&file=_index)
- szybkie dodawanie treści (Keyboard Maestro, akcja Append text to a File)
- dopisywanie linków do bardzo popularnych tematów (jak wyżej)
- wprowadzanie globalnych zmian do notatek (z pomcą [[Regex]])
- aktualizacje metadanych (np. czasu ostatniej edycji pliku interpretowanej przez Quartz)
- szablony dodawania notatek (text expander)

Przykład wykorzystania Deisgn Maestro - szybkie dodawanie nowych narzędzi. Wykonanie tego makro dodaje narzędzie do listy ToC oraz tworzy nową notatkę. Do schowka trafia link do niej, dzięki czemu w razie potrzeby mogę bardzo szybko otworzyć Obsidiana a jeżeli nie ma takiej potrzeby, nie muszę się odrywać od aktualnie wykonywanego zadania: 
![](https://space.overment.com/Screen-Shot-2022-08-12-14-11-53-xmPJB/Screen-Shot-2022-08-12-14-11-53.png)
Powyższe makro nie jest częscią [[Projects/Design Maestro]] i zostało przygotowane na moje potrzeby. Analogiczne makra mam dla Książek, Automatyzacji czy Modeli Mentalnych.
### Publikacja notatek
Mój `vault` jest jednocześnie repozytorium [[Knowledge/Programming/git/git]]. Oznacza to, że moje notatki przechowywane są nie tylko lokalnie na moim komputerze ale także we wspomnianym repozytorium. 

Jednocześnie `vault` umieszczony jest wewnątrz wspomnianej aplikacji przygotowanej na podstawie projektu Quartz, z pomocą której generuję strony HTML oraz publikuję je na brain.overment.com z pomocą automatyzacji [[Github Actions]]. 

Proces konfiguracji Quartz szczegółowo pokazałem na filmie dostępnym na [[Projects/Ahoy!]] [Czytaj wpis](https://community.ahoy.so/c/nocode-podziel-sie-wiedza/publikacja-notatek-na-obsidian-z-quartz-na-github-pages) oraz jest on również dość szczegółowo opisany na stronie projektu Quartz, przy czym sam zastosowałem jeszcze kilka własnych modyfikacji. O części z nich wspominam na filmie a nad niektórymi nadal pracuję. 

Co ciekawe aktualizacje odbywają się w 100% automatycznie, ponieważ w chwili zamknięcia Obsidiana, makro Keyboard Maestro zostaje uruchomione i: 
- dodaje zmiany do repozytorium
- wysyła je do zdalnego repozytorium
- przesłanie danych uruchamia [[Github Actions]] i tym samym publikuje notatki

