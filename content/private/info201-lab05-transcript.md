**Analyst:** Good to see you again. I'm hoping to get some more clarity and detail on a couple of main aspects of the system, specifically the information that needs to be stored—data requirements, in other words—and also details of how you conduct some of the main business process.

**Client:** That sounds fine...I'll try to help as best I can.

**Analyst:** Thanks. Hmm, so I remember you described the process of ==enrolling students, which involves an audition that has to be scheduled and passed, and then fees would be paid, with scholarships potentially available for special situations. And presumably you'd want to record which staff member actually conducted the audition==, so perhaps we should start there. What information would you need to record about the staff you employ? Just in general, not necessarily relating to the auditioning process.

**Client:** Right, the ==main information we record on staff would be their name, their contact details,== ...

**Analyst:** So ==postal address, phone number==?

**Client:** Yes. Most have a ==land line in their office, but we'd also want their mobile number and/or home number== for after-hours contact in emergencies. ==They have a standard e-mail address issued through the school==, which we use for all work-related memos and suchlike.

**Analyst:** And ==you're happy to record their surname separately for ease of sorting and searching?==

**Client:** I think that would make sense, yes. Let's see, what ==other details...ah, their qualifications, and also their salary==.

**Analyst:** Right, of course. And are staff issued with any sort of ID card? Specifically, is there already a unique staff ID number that we could use in the system?

**Client:** Yes, actually—==all staff are given a card with their details printed on it, and it also acts as a security swipe card for building access, photocopying, and the like.==

**Analyst:** Great, that's handy. It would be good to have a sample copy of one or two so we can make sure that the data models covers everything. And what do the staff identifier values actually look like?

**Client:** ==They have a letter indicating the kind of job they have—things like “A” for academic staff, “G” for general, “T” for tutors—followed by a number...4 digits==, I think.

**Analyst:** OK, and that==set of job categories would be a well-defined list that you might want to change occasionally==?

**Client:** Well-defined, yes...and I suppose there could be new job types added in future—it's a changing world!

**Analyst:** I'm just thinking it would make certain forms and reports a bit easier to construct if you had a definitive list of them—for example, if you wanted a list of staff grouped and ordered by their job category.

**Client:** OK, yes, could be quite useful then.

**Analyst:** Now back to the ==auditions==: what information needs to be recorded there?

**Client:** Well, there's the ==date and time of the booking, the audition room, the staff members attending...and the student==, of course.

**Analyst:** So there ==could be more than one staff member== attending?

**Client:** Yes, we often assign two or three staff as we like to have assurance of a fair and thorough assessment, especially as the available staff may not be experts in the instrument the student is playing. They can confer to sort out any differences of opinion.

**Analyst:** Now for ==students, I guess you would record similar information to staff==?

**Client:** Yes, let's see...yes, it's ==largely the same, and in fact we give students a school e-mail address as well. But not a phone number==, of course!

**Analyst:** Right. ==And some kind of student ID==?

**Client:** Yes—those are just a ==unique number, 7 digits, no special prefix or anything==.

**Analyst:** And ==when do those get issued? What I'm wondering is, can you book an audition for a student who hasn't been assigned an ID number ye==t?

**Client:** Ah, I think I see the issue there..==.at present we just take their name and contact details and what instrument they play, and make the booking==.

**Analyst:** Mm, that could present a problem because we can't just use their name or even contact details to reliably identify them. ===We could have the system issue an ID number for them immediately they're recorded into the system, even if they end up failing the audition or not enrolling fully for other reasons===. Would that be OK?

**Client:** I think so—I mean, the numbers are just numbers and we're not particularly precious about maintaining the sequence or anything.

**Analyst:** Good, I think that will be a good way to work it, then. And the ==outcome of the audition—how is that recorded==?

**Client:** Just a==pass/fail result.== The staff who attended the audition discuss their impressions and make that decision themselves. At the moment we ==keep their audition sheets in case there are any disputes further down the line==.

**Analyst:** I see...so the system should probably ==record their notes and comments== as well...

**Client:** Yes, that would save having to keep the paper copies hanging around!

**Analyst:** Great, we'll do that then. Now for the ==enrolment details==...

**Client:** That's pretty straightforward: ==if they pass the audition, the student is eligible to enrol fully. We treat each enrolment as lasting a single year==, because they have to pay annually and because students will sometimes drop out after a year or two. But they're ==not considered fully enrolled until their fees for the year are paid up==.

**Analyst:** Yes, and you mentioned they could be eligible for a scholarship as well...

**Client:** That's right—==scholarships are handled by a separate body, so we don't have much to do with that. We only really need to know that it was approved and that the funds are available.==

**Analyst:** OK, but you would want to record any fee demands issued and any payments for accounting purposes?

**Client:** Yes, definitely:==invoices and payment receipts all need to be recorded accurately for accounting==.

**Analyst:** OK, so you would want to ==record the student enrolling, the year of enrolment, and whether their fees are paid for that year==. Oh, ==and their specialist instrument too==...hmm, could they ever have more than one of these?

**Client:** Actually quite a few of our students are multi-instrumentalists, but at this level the training is for a high-level of specialised performance, and so ==each student has just one specialist instrument==.

**Analyst:** If they do have additional instruments they can play, would you you want that recorded anywhere?

**Client:** That could actually be quite useful in looking for possible tutors or understudies or ring-ins for other performing groups.

**Analyst:** OK, so we could potentially list all instruments that each student can play, which would allow easy searching and reporting, or we could ==simply record those additional skills in a notes field associated with the student==.

**Client:** The searching and reporting capability sounds handy...

**Analyst:** I think it would come down to how often such a search would be useful—someone would have to record the information in order for it to be used.

**Client:** Ah, OK...well, it probably doesn't happen very often, so maybe just a notes field would be sufficient.

**Analyst:** OK, we can go for that simpler option and test that it's satisfactory later on. Now, for hiring ==instruments==, you mentioned a ==lettering and numbering scheme for identifying== those—what do those codes typically look like?

**Client:** ==A typical one would be something like VLA37, where the VL tells us it's a violin, the A is for standard size, and 37 is the instrument numbe==r.

**Analyst:** And do all ==instruments have various sizes available?== What would be the typical sizes?

**Client:** No, ==most of them just come in a standard size==. I should note that the sizes are different from registers such as contrabass flute, which plays a different range of notes. The sizes are to accommodate larger or smaller performers, but the instruments are still tuned to the same tuning. Most adult players would be encouraged to play the standard full-sized instrument if possible, but as you can imagine, someone who is naturally physically very small might struggle with a full-sized double bass or bassoon.

**Analyst:** I see. And the ==available sizes==? Is it always just A, B, C, ...? How far along the alphabet do they go?

**Client:** Yes, we just use a==single-letter code. A for full size, B for 3/4, C for 1/2,== and that's as far as we would ever need to go. I should point out that those sizes are just nominal: a quotes-half-size instrument typically isn't literally half the size!

**Analyst:** I'm wondering how many instruments might you have of each type? ==And are the instrument type codes always a two-letter value like VL?==

**Client:** I think they're all two letters; I'd have to check if there are any exceptions to that.

**Analyst:** Right, it ==might be prudent to allow longer codes just in case==. But that shouldn't be a problem. ==And how many instruments might you have of each type?==

**Client:** Not more than 100 for most instruments. We might have a hundred-and-something violins, actually—they're quite popular.

**Analyst:** OK, so we would need to ==support at least 3-digit instrument numbers==. Now for the ==class scheduling and streaming==: how does that work, and what needs to be recorded?

**Client:** The ==first step there is to decide on the available class sessions==. That's ==partly down to how popular the class or instrument is, but is also based on teacher availability==. We==try to cap theory classes to around a dozen students==, and ==instrumental tuition to more like half a dozen==, but it ==depends on the class and the teacher==. We ==need to assign each class to a room as well==. ==Some rooms are set up for different uses==: ==some are basically classrooms with desks and chairs, and others are more like a small auditorium for instrumental classes and small ensembles==. ==We have a couple of larger auditoria for the bigger ensembles such as the symphony orchestra==. ==Once the weekly timetable is worked out, it's basically fixed for the whole year==.

**Analyst:** OK, good. And what about ==results and grades==?

**Client:** OK, that's a big one. At the moment, each teacher maintains a spreadsheet for each of their classes in which they record each student's result for each assessed item, such as a performance exam or theory test. At the moment, collating all of those is a bit of a nightmare, to be honest. Error-prone, fiddly, ...

**Analyst:** I could imagine. What ==we should probably aim to do is put all of the recording of marks into a single place== so that it can be more easily managed and especially if you wanted to calculate the overall marks automatically.

**Client:** That would be a life-saver! As long as ==teachers can have easy access to the system to record and check on grades==.

**Analyst:** Such as ==via the Web or their phone==?

**Client:** Yes, or ==for teachers who prefer to work on paper, it would be good if they could just give the results sheets to secretarial staff for data entry==...

**Analyst:** Of course. And you mentioned earlier that you ==need to withhold final marks until they are confirmed==. How exactly does that process happen?

**Client:** Well, the ==marks get recorded by individual teachers, then collated by admin staff and the total are calculated. Then they're sent back to the teachers for review==, ==in case there are discrepancies or surprises that need to be followed up. This might involve teachers meeting to discuss the discrepancy or reviewing the student's work. It could also trigger a re-count or a re-mark of anomalous assessments. Once that's all sorted out, the results can be made available.==

**Analyst:** So that's ==releasing all of the results for all students at the same time==?

**Client:** Yes, that's right.

**Analyst:** So the exact date and time of release isn't something you would necessarily know in advance? That is, it's more like you would want to press a button to release the results?

**Client:** I think a ==scheduled release would be better==. That way, we could tell the students in advance when to expect their results. At least, ==as long as we could update the release date in case we needed more time to deliberate==.

**Analyst:** And it could be useful to ==have the student results mailed out to them automatically by e-mail?==

**Client:** Yes, definitely—it's always good if we can get the results out to them as quickly as possible. We would still ==send a formal official copy in the post==, however.

**Analyst:** OK, sure. Well, I think that just about wraps it up for now. Thanks again for all your insights and information.

**Client:** Not a problem—hope it all helps!

![](https://i.imgur.com/Njz40F5.png)
