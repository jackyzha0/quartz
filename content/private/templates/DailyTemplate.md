[<% tp.date.yesterday("YYYY-MM-DD") %>](daily_notes/<% tp.date.yesterday("YYYY-MM-DD") %>) << [daily-notes](notes/daily-notes.md) >> [<% tp.date.tomorrow("YYYY-MM-DD") %>](daily_notes/<% tp.date.tomorrow("YYYY-MM-DD") %>)

---
# <% tp.date.now("DD-MM-YY") %>
<% tp.user.album() %>
<% tp.user.xkdc() %>

<% tp.user.stocks({a:"AAPL"}) %> 
<% tp.user.yahoo({a:"SP500"}) %> 
<% tp.user.yahoo({a:"TSLA"}) %>

## Today
<%*
const d = new Date().getDay()
switch(d){
	case 1:
		tR+=""
		break;
	case 2:
		tR+=""
		break;
	case 3:
		tR+=""
		break;
	case 4:
		tR+=""
		break;
	case 5:
		tR+=""
		break;
	default:
		break;
}
%>

# Review
```dataview
list from #lecture where sr-due = date(today)
```

## Backlog

## Projects
- python ai weekly review
- spotify clone

## Links
- [202 lab book](C:\Users\Jet%20Hughes\Documents\Personal\COSC202LabBook-2.pdf)
- [i201 cousework](https://isgb.otago.ac.nz/infosci/INFO201/labs_release/raw/master/output/info201_labs.html#)
- [i201 Assignments](https://isgb.otago.ac.nz/info201/shared/assignments_release/raw/master/output/info201_assignments.html)

## Today's Log