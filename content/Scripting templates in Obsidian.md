---
tags:
  - on/obsidian
  - on/scripting
  - productive-laziness
date: 2023-08-02
---
> Here be some dragons. This is a quick post to explain how Javascript can be used eliminate the need to update multiple pages if the structure of your metadata changes. Using Javsscript comes with risks. Enter at your own peril.

Within [[Obsidian]], the combination of the [Dataview](https://github.com/blacksmithgu/obsidian-dataview) and [Templater](https://github.com/SilentVoid13/Templater)] plugins can make for a powerful way to access and organise your notes using metadata. However, as your [[Digital Garden]] develops, things will change and you might find a situation where you have:

1. Added metadata to some notes
2. Created a template to populate a summary note
3. Decided to update your metadata
4. Find you have to update each previously templated page manually because templates are a one-time thing. 

I have many such partnerships of pages and summary pages in my system and I often find myself tweaking as more information is being added.

For example, I store information about the books I read including the series (and sequence in that series) that they belong to. Current count is 51 series pages. I use Templater to populate the Dataview query that creates a list of books on a page. But what if, as recently happened, I wanted to track audiobooks that I'd listened to? My book metadata expanded to include "listened" as well as "read". How do I update my series page to reflect both dates without updating all 51 instances?

The answer lies in the weeds.

1. Create a Javascript (.js) file that contains the Dataview instructions to build the table I want to display.
2. Create a `book-series.md` template that calls the .js file.
3. Create a series page and apply the template.

Because I've now broken the link between the page and the code that generates the list of books displayed on it, I can update the underlying .js file and all series update the next time I open the page.

## Javascript file for displaying books in a series
My file is called `book-series.js`. Any changes here are reflected in all book series pages.

```javascript
let pg = dv.current();

const books = dv.pages("#media/book")
  .where(p => dv.func.contains(p.series, pg.file.name) || dv.func.contains(p.series, pg.file.link) );

if(books.length > 0) {

    dv.table(["📘 Book", "Title (sequence)", "Read", "Listened"],
    books
        .sort(p => dv.func.number(p.sequence))
        .map(p => [
        dv.func.embed(dv.func.link(p.thumbnail, "60")),
        p.file.link + " (" + p.sequence + ")",
        dv.array(p.read).sort(),
        dv.array(p.listened).sort()
        ])
    )
}
```

## Book series template file
My file is called `book-series.md`.

```
---
tags:
- #status/▶️
- #rating/unrated 
- #atlas/series/books 
- #t/book-series/2023-06-18  
goodreads:: 
---
A series of books by [[]] consisting of:
```dataviewjs
await dv.view("/Extras/Scripts/book-series")
```
```
```

The last call to my script is what does the magic.
