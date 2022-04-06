---
title: Day
draft: true
---
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
		tR+="- [ ] 10:00 Info203 Lecture\n- [ ] 14:00 Info203 Tutorial\n- [ ] 16:00 Cosc201 Tutorial"
		break;
	case 4:
		tR+="- [ ] 11:00 Cosc202 Lecture\n- [ ] 12:00 Cosc201 Lab\n- [ ] 16:00 Info201 Lecture"
		break;
	case 5:
		tR+="- [ ] 09:00 Cosc202 Lab\n- [ ] 11:00 Cosc201 Lecture\n- [ ] 12:00 Info201 Lab"
		break;
	default:
	break;
}
%>°