# L4 Stata: Basics

Stata

1.  Statistical programming

    -  Data sets get too big for spreadsheet software

    -  Many operations, nice to save work and save steps
		1.  Helps with collaboration
		2. Helps with finding and correcting errors (without redoing work)
		3. Commands efficiently operate on large sections of data simultaneously

2.  Introduction

    -  Stata especially well-suited to economics (regression analysis).

    -  But expensive.

    -  Other stats packages are available (e.g. R, SAS, SPSS), can program in Python, C, Matlab, Java). But learning new stats package or programming language is like using a Casio calculator when you're familiar with TI---all the buttons do all the same things, they're just located in different places. So learning one language helps you pick up others quickly, as needed. (Stata has specific value for Economics research assistants, future PhDs.)

3.  Basic user interface

    -  Open Stata. Very different GUI (graphical user interface) than Excel, but same idea. Feels more like computer programming software, for good reason.

    -  Click on Data Editor (Edit), enter data by hand: numbers 1-10 in column 1, make up ten values in column 2.
		1.  Row entries are called observations (numbered automatically on left side)
		2. Column entries are called variables, default named "var1" and "var2"

    -  Close data editor. Notice in main screen, a running list of individual commands (and their results), based on what we just did manually.
		1.  With our first action, we actually implemented three commands: set "obs" from 0 to 1, generate variable "var1", and set the value of var1 for observation 1.
		2. As we added more data, we set "obs" to 2, 3, ..., 10, replaced var1 for observations 2, 3, ..., 10, and then generated a second variable, "var2", and replaced its values for observations 1-10. (Note, we no longer needed to expand "obs" at that point.)

    -  Command line
		1.  We can use the command line as a calculator: type display sqrt(8\*2)
		2. We can add additional commands using the command line. Type: **gen**erate varthree
            1.  Note: in Stata commands, shortcuts are indicated by underlining the minimal number of letters to convey the same meaning: "gen" or "gene" or "gener" or "genera" or "generat" or "generate" are all equivalent, but "ge" is ambiguous, and will therefore not work.
		3. Error: when we generate a new variable, we need to define its values. Let's try again: generate varthree=3
		4. Now open Data Editor again to see the result. We have defined a new variable "varthree" to equal 3, not just for a particular observation, but for every observation. This is the power of the programming approach to data: you can do lots of things at once! (In Excel, there are shortcuts to copy and fill, but nothing this quick.) Most of the time, we won't interact with the spreadsheet directly; we'll just be programming.
		5.  To see this again, close Data Editor and type: replace varthree=2\*var2 if var1\>7. We see that three real changes were made, and if we open the Data Editor again, we can see what that looks like.
		6. What if we meant to type varthree=2\*var2 if var1\>5? We could type over again, or we can push "PgUp" to repeat the previous command (and edit it before hitting return). Pushing this multiple times allows us to repeat earlier commands.

    -  Left and right panels
		1.  On top right-hand side is a list of the variables we have so far: var1, var2, and newvar.
		2. The bottom right-hand side summarizes our data: we have three variables and 10 observations.
		3. (If you ever need to, you can resize these panels by dragging their borders.)
		4. Notice on left-hand side is list of commands we've used so far (red for the ones that returned error codes). Let's highlight the first 26 lines (click on the first, then shift-click on line 26) and push Ctrl+C to copy these. (This creates var1 and var2 and replaces all 10 values of var1 but only the first 5 values of var2.)
		5.  Break. If you send the computer on an impossible task, it may think for a really long time. To get it to stop so you can revise its instructions, click on "Break" (red X button).

4.  Do Files

    -  Click on "New Do File Editor" at the top of the screen (looks like a Word document, with a pencil). This opens a new window, with a text editor.

    -  Type Ctrl+V to paste the command lines that we copied earlier. This becomes a short computer program that, once we execute, will create two variables and replace their values. (In computer programming, a "command" tells the computer to do something. A "script" is a list of commands, to be executed in order. Scripts in Stata are called Do files.)

    -  Note: some programming languages require a semicolon or other punctuation to denote the end of one command and the beginning of the next. "Return" plays that role in Stata, so writing on separate commands on separate lines is sufficient.

    -  Always use a script, not the command line!
		1.  Often, after many steps of manipulating data, you realize that you should have done step 3 differently. In Excel, you might be able to hit "undo" repeatedly (if you haven't saved and closed the program yet), but once you correct step 3, you'll then have to redo all subsequent steps. With a script, you can edit step 3 and recompile in moments.
		2. A script is also useful for collaborators and replicators, as well as yourself when you come back to a project after a long pause. I learned this the hard way: I downloaded data, manipulated it repeatedly using the command line, found results that were really interesting, and copied and pasted them into my research paper. A more urgent project came up, so it was months before I came back to this. When I came back, I did (what I thought were) the same manipulations but got totally different results. I couldn't figure out how to reproduce the results that I had recorded earlier. Maybe I had been making a mistake? Maybe I'm making a mistake now, but was previously correct? If I had a paper trail of all my data manipulations at the time, I could compare my work now and then to see how they differ, and which is more reliable. ...But I don't, and may never publish that paper.
		3. For your data project, you will need to submit your Do file, not just your results.
		4. Related programming tip: Never overwrite your original data set. Use a script to open your original data set, make whatever edits need to made, and then save the revised data as a new data set with a different file name. That way, every time you run your script, it pulls the same original data.

    -  Use comments to keep things neat, organized
		1.\*Comments begin with an asterisk.
		2. /\* Or they can be enclosed (even mid-line) in asterisks and slashes\*/

    -  Save .do file using Save icon.

Data files

5.  Clear

6.  Computer programs are designed to recognize and interpret information, but only in specific formats, specified by file type (e.g. .pdf, .docx, .mp3).

7.  For example, Spreadsheets often saved as .csv ("comma separated values")

    -  year,growth;2021,2%;2020,1%;2019,1.5% can be understood to be a 3x2 table

8.  Excel recognizes .csv or .xlsx, which adds formatting information.

9.  Stata stores data using .dta and stores scripts using .do

10. Example: search Google for "Our World in Data Covid github", download xslx of covid data. Save as FileName (maybe FileName_raw). (If you save in OneDrive, you should be able to access it from other computers.) Good idea to save in its own folder, so that additional files all stay together.

11. Directories

    -  Open file location and Shift-right click to "Copy as path". In Stata .do file, type import delimited "FilePath", clear (with quotation marks around FilePath).
		1.  The "delimited" command lets Stata know it's a .csv file.
		2. Note: "clear" option replaces data in Stata memory, if any (can only hold one dataset at a time).

    -  We'll often be creating multiple files: the original .xlsx or .csv, the converted original .dta, a .do, a final .dta, and possibly intermediate .dta or other files. To keep things organized, it's a good idea to make a directory for each project.

    -  Stata is set to work within a "working directory". From any working directory, you can call a file that has a complete file path name. But you can also set the working directory to be the file you want to work in, and not have to write out the complete file path each time.

    -  To see what directory is the current working directory, type pwd in the command line (for print working directory).

    -  cd command: can change working directory. Then can rewrite earlier import command with shorter file name instead of complete file path.

12. Resave as .dta

    -  export excel Filename_raw.xlsx, replace firstline
		1.  firstline option recognizes first line of data set as labeling variable names.

    -  save Filename_raw.dta

    -  use Filename_raw(.dta), clear

13. Save edited.dta at end of .do file

    -  save FileName_edited.dta, replace

    -  Note: replace option only important when re-running code.

Exploring data

1.  Browse

2.  Describe

3.  Lookfor

4.  Sort

5.  Order

6.  Summarize

    -  Summarize icu_patients_per_million hosp_patients_per_million

    -  Summarize tot\*\[where\* is a place holder for any letter or combination of letters\]

    -  Summarize\*

    -  Doesn't work with strings; notice location isn't summarized.

    -  Summarize, detail gives medians and percentiles

7.  Generate

    -  Generate rich = gdp_per_capita\> 11840.85

8.  Tabulate

    -  tabulate rich

    -  tab continent

9.  Histogram

10. Correlate

11. Scatter