---
tags:
  - on/reading
  - the-garden-shed
  - on/obsidian
  - on/scripting
date: 2023-04-16
aliases:
  - replacing-goodreads-with-obsidian
---
I have been a Goodreads user for many, many years. It has provided me the means to track my reading activity alongside a list of books I want to read. The past few years I’ve been an avid Kindle reader, topping 20,000 pages read each year. Goodreads integration with the Kindle has made it very easy to mark a book started and finished.

Last year’s purchase of a Synology 920+ NAS as a replacement backup device led to me hosting some of my own content[^1]. Then, with Twitter’s meltdown I’ve been exploring the Fediverse. So, at the weekend I took a look at [Bookwyrm](https://bookwyrm.social) which is a non-corporate version of Goodreads. Didn’t like it and it felt really awkward to me. Somehow I ended up viewing [a video by Curtis McHale](https://www.youtube.com/watch?v=cV5GVr0v0c0&t=93s) where he covered off using [Obsidian](https://obsidan.md) and the [Obsidian Book Search](https://github.com/anpigon/obsidian-book-search-plugin) plugin. I’m a big Obsidian user so I took the time to explore. This is what I ended up with.

## Feature selection

I don’t use all the features of Goodreads. Those I use are:

- tracking book read dates, conveniently a single click from my Kindle Oasis.
- tracking which books in a series I’ve read
- list of books I want to read
- annual summary of the books I’ve read, and most importantly the number of pages read
- sometimes recommendations based on what Goodreads Friends are reading

Because I’ve started mixing audiobooks with ebooks, page counts are problematic in Goodreads. A 12 chapter audiobook is listed as 12 pages.

The good news. I’ve been able to replicate all except the friends feature in Obsidian, and more.

## Initial setup

I’m going to assume you have at least passing familiarity with Obsidian and installing plugins. If not, this is a good chance for you to develop your knowledge a little further.

Obsidian is a text editor that uses Markdown files in the back-end and makes it super easy to link between files. Obsidian’s flexibility can be extended using plug-ins.

Shopping list (follow the links, all free):

- [Obsidian](https://obsidian.md) - the app behind it all
- [Obsidian Book Search plugin](https://github.com/anpigon/obsidian-book-search-plugin) - search and import metadata from books
- [Obsidian Dataview plugin](https://github.com/blacksmithgu/obsidian-dataview) - provides database functionality for automatically creating lists of books
- [Obsidian Auto Note Mover plugin](https://github.com/farux/obsidian-auto-note-mover) - used to automatically file notes based on tags
- [Obsidian Templater plugin](https://github.com/SilentVoid13/Templater) - for book Series and Author page creation in a standard form

Get Obsidian installed and then install the plugins.

## Obsidian Book Search plugin
You will use this plugin to gather book metadata such as title, author, isbn, number of pages, publisher etc. This is the most laborious part of adding book information to any system (it’s what Goodreads excels at). Anything that eases that is worth its weight in gold.

Instructions refer to version 0.5.9. Software changes over time, and there may be changes in your version.

![](https://live.staticflickr.com/65535/53154715235_ce19c09799_c.jpg)

**New file location** should be obvious. It’s the folder where you want your book notes stored. I use the Auto Note Mover plugin to then file notes into their rightful homes automatically. 

**New file name** uses any of the metadata the plugin returns to name your file. The default is _Title - Author_ but I’ve changed this to just _Title_. When I link to a book from another note, it reads better with the book name alone.

**Template file** is the name of the file where the magic happens. It defines the metadata I want Book Search to return, plus any additional metadata to make up my book’s note. The plugin’s web page has a sample template you can copy and paste into your own template file.

## My template file

I started with the suggested template file and then made some of my own changes.

```
---
tag: source/book 
title: "{{title}}"
author: [{{author}}]
publisher: {{publisher}}
duration:
  pages: {{totalPage}}
  minutes:
isbn: {{isbn10}} {{isbn13}}
cover: {{coverUrl}}
status: unread
created: {{DATE:YYYY-MM-DD HH:mm:ss}}
updated: {{DATE:YYYY-MM-DD HH:mm:ss}}
series: 
  name: 
  sequence: 
history:
  reads: 
  started: 
  finished: 
format: 
---

![cover|150]({{coverUrl}})

```dataview
TABLE WITHOUT ID 
    status as Status,
    history.started as Started,
    history.finished as Finished, 
    series.name as Series, 
    series.sequence as "#"
from #source/book
where title = this.title
```

> [!HINT] I'm having trouble getting the code to display properly. Include a final ``` at the bottom of the code above.

The differences are:

- Replace the book tag with _source/book_
- Replace Total with _length.pages_ and _length.minutes_ so that I can track both books and audiobooks
- Add _series.name_ and _series.sequence_ to track information of which series a book belongs to, and its place within that series
- Add _history.reads_, _history.started_ and _history.finished_ for reading history. Read on for more on how that works.
- Add _format_ to track the formats of a book that I hold.

At the bottom I have a Dataview that queries the current page to display information when not in Obsidian’s edit mode.

## Sample book page
Here is the page for _Edgedancer_ by Brandon Sanderson.

```
---
tag: source/book
title: "Edgedancer"
author: [Brandon Sanderson]
publisher: Hachette UK
publish: 2018-10-18
duration:
  pages: 183
  minutes: 383
isbn: 1473226597 9781473226593
cover: http://books.google.com/books/content?id=caVnDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api
status: read
created: 2023-04-09 21:05:56
updated: 2023-04-09 21:05:56
series: 
  name: "[[The Stormlight Archive]]"
  sequence: 2.5
history:
  reads: 1
  started: 2022-05-04
  finished: 2022-05-06
format: [ebook, audiobook]
---

![cover|150](http://books.google.com/books/content?id=caVnDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api)

```dataview
TABLE WITHOUT ID 
    status as Status,
    history.started as Started,
    history.finished as Finished, 
    series.name as Series, 
    series.sequence as "#"
from #source/book
where title = this.title
```

> [!HINT] I'm having trouble getting the code to display properly. Include a final ``` at the bottom of the code above.

The only fields I need to fill in are _book.duration_, _series.x_, _history.x_ and _format_. In a few cases I replaced the _cover_ links with an alternative cover I found elsewhere [^2].  

The Dataview section looks like this:

![](https://live.staticflickr.com/65535/53153706197_264157b846_c.jpg)

This book I’ve read only once. For any books I’ve read multiple times, I write the date as `[2021-03-04, 2022-05-04]`. Later Dataview queries pull out the maximum date from the _history.started_ or _history.finished_ fields.

## Author

Every book has one or more authors so there will be a page for each.

![](https://live.staticflickr.com/65535/53154775843_563e431612_c.jpg)

There is a Templater file called _author_ that makes for quick creation of these pages.

```
---
tags: person/author
---

```dataview
TABLE WITHOUT ID
  file.link as Title,
  series.name as Series,
  publish as Published
FROM #source/book
where contains(author, this.file.name)
sort publish
```

> [!HINT] I'm having trouble getting the code to display properly. Include a final ``` at the bottom of the code above.

## Series

Here’s what a linked series page looks like. I fill in the author’s name, and grab the Goodreads book series link.

![](https://live.staticflickr.com/65535/53153706647_bd1f7821c9_c.jpg)

And the code to generate it is stored in a Templater file called _book-series_.

```
---
tags: atlas/series/books state/active
goodreads: 
---

A series of books by [[]] consisting of:
```dataview
TABLE WITHOUT ID
  series.sequence as "Seq.",
  file.link as "Title",
  max(history.finished) as "Last Read",
  status as Status,
  history.reads as "Times Read"
FROM #source/book 
WHERE series.name = this.file.link and !contains(file.path, "Templates")
SORT series.sequence
```

> [!HINT] I'm having trouble getting the code to display properly. Include a final ``` at the bottom of the code above.


## What else can you do?

### Make a list of all books

```
```dataview
TABLE WITHOUT ID
   "![|60](" + cover + ")" as Cover,
   file.link as Title,
   link(author) as Author,
   series.name as Series,
   join(list(history.finished)) as "Finished",
   status as Status
FROM #source/book 
WHERE !contains(file.path, "Templates")
SORT status DESC, file.ctime ASC

```

> [!HINT] I'm having trouble getting the code to display properly. Include a final ``` at the bottom of the code above.

### Make a list of all series

```
```dataview
TABLE WITHOUT ID
  file.link as "Series",
  goodreads as "Goodreads"
from #atlas/series/books and #state/active 
where !contains(file.path, "Templates")
sort file.link
```
> [!HINT] I'm having trouble getting the code to display properly. Include a final ``` at the bottom of the code above.

  
## One more thing. The “Want to Read” wishlist.

There is one feature I’m missing from Goodreads. The ability to create a list of books to read. Super easy, just create a list and as I purchase books, click through to create the page, then immediately use the Book Search plugin to pull in the details.

```
[[The Divine Comedy]]
[[I and Thou]]
```

---- 
[^1]: I will post about this soon, I promise.
[^2]: Yes, I’m moving away from storing data on Goodreads, but that doesn’t prevent me from linking to the useful information there.