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
		tR+="- [ ] 11:00 Cosc202 Lecture\n- [ ] 12:00 Cosc201 lab"
		break;
	case 2:
		tR+="- [ ] 10:00 Info203 Lecture\n- [ ] 11:00 Cosc201 Lecture\n- [ ] 13:00 Info201 Lecture\n- [ ] 14:00 Cosc202 Lab"
		break;
	case 3:
		tR+="- [ ] 10:00 Info203 Lecture\n- [ ] 16:00 Cosc201 Tutorial"
		break;
	case 4:
		tR+="- [ ] 11:00 Cosc202 Lecture\n- [ ] 12:00 Cosc201 Lab\n- [ ] 12:00 Info203 Tutorial\n- [ ] 16:00 Info201 Lecture"
		break;
	case 5:
		tR+="- [ ] 09:00 Cosc202 Lab\n- [ ] 11:00 Cosc201 Lecture\n- [ ] 12:00 Info201 Lab"
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