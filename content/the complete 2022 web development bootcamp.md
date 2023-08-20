---
title: "The Complete 2022 Web Development Bootcamp"
date: "2022-01-21"
tags:
- "notes"
- "seedlings"
sr-due: 2023-01-06
sr-interval: 3
sr-ease: 250
---

# How does the internet actually work

The internet is not a cloud. It is a long piece of wire that connects computers to each other. In these wires are connected two kinds of computers. The first kind are called web servers. Web servers are like libraries that serve you the data you need. They hold data that they provide upon request. The second kind are clients. These are the computers we use to connect to the internet.

If there are so much information in a server, how do web servers help us find the exact information we are looking for?

The processing of information happens this way:

1. Client via browser sends a request by typing google.com.
2. The Internet Service Provider (ISP) receives that request.
3. The ISP sends that request to a Domain Name System (DNS) server, which is basically a phone book of contacts. It returns the IP address for a requested website. All computers connected to the internet has its own IP address. It is like a postal address.
4. The ISP sends the IP address to the client.
5. The client then sends a direct message to that IP address to the ISP.
6. The ISP relays that message to the Internet Backbone. The backbone is made up of many of wires that traverse entire oceans under submarine cables.
7. The request goes directly to the IP address, which is the address of the requested page’s server (Google).
8. The server sends back the data requested and the browser reflects it.

This process happens in milliseconds.

### Review

- What is the Internet?
- What are web servers?
- What are clients?
- What is an ISP?
- What is a DNS server?
- What is an IP address?
- What is a browser?
- How does data and information flow through the Internet?

# How do websites work?

What does HTML, CSS, and Javascript do exactly?

Use a browser.

The data you receive from the internet consists of three types of files:

1. HTML - responsible for the structure of your website
2. CSS - responsible for styling your website
3. JS - responsible for making your website behave and do things

### Review

- What is the difference between HTML, CSS, and JS?

# How to get the most out of this course

1. Avoid typing the code along with the instructor.
2. After the 10 minute mark, stop the video then ask yourself: What is going on? What is the purpose of the code being written?
3. Type the code and replicate what happened in the 10 minutes.
4. Take notes using the cornell note-taking system:
   1. Write the title of the lesson.
   2. Write notes.
   3. Write questions based on the notes.
   4. Write a summary of the lesson.
5. If you are struggling with a particular topic, bookmark it, leave it for a while, then come back to it later.
6. When stuck, use Google and stackoverflow.

# How to get help when you're stuck

1. Define the expectation vis a vis the reality.
   1. What did you expect your code will do?
   2. What did it actually do?
2. Then look for what caused the difference.
3. Paste the error messages in Google.
4. If there are results from stack overflow, look at those.
5. Rewatch the videos, you may have made a mistake right before your code went wrong.
6. Check your code against the code you are copying.
7. Use the Q&A section in indivudal videos. Include the timestamp.

# Introduction to HTML

Web browsers interpret web files to display web pages.

The foundation of all websites.

You can create a website purely using HTML but not purely using CSS or JS.

HTML = Hypertext Markup Language

HTML has a common ancestry with XML (Extensible Markup Language) and GML (Generalized Markup Language)

They all came from the markup symbols proofreaders put in manuscripts.

[CodePen](https://codepen.io/)

Markup symbols used by editors in the past defined how letters, words, etc. should appear.

HTML tags also define how elements of a web page should appear.

<tag name>

Always close an open tag.

The heading tag only goes fom h1 to h6. Beyond h6, there will be no differences.

Read the HTML documentations at:

- MDN
- W3 Schools
- devdocs.io

# The anatomy of an HTML tag

1. Opening tag - <h1>
2. Content - Hello World!
3. Closing tag - </h1>

Self-closing tag

- e.g., <br>

How do you know how to write your tags?

- Refer to your documentations (devdocs.io).

<hr size=“3”>

hr = HTML element

size=“3” = HTML attribute

How to make a comment in HTML?

- <!--
- \-->

# What we're building - HTML personal site

To generate the boilerplate code for HTML files in Atom, use the following commands:

- HTML + enter
- HTML + tab
- ! + tab
- HTML:5 + tab

What is a boilerplate code?

- They are code templates that you are going to use for multiple projects.

Always save your files in Atom (make blue dot disappear).

<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>

  </body>
</html>

<!DOCTYPE html> : A declaration that the document is an html document with a specific version. This used to be too convulated. Now it’s simpler.

<html></html> : Everything in between these tags is an html code.

The code consists of:

1. <head></head> : Holds information about the webpage; tells the browser how it should handle the page
   1. <meta charset="utf-8"> : Tells the browser that the content of the page is encoded using utf-8 system. If a browser interprets a page using a wrong encoding system, it generates a mojibake.
   2. <title></title> : Tells the browser the title of the page
2. <body></body>

Always use charset=“utf-8” to accomodate international visitors.

Search engines crawl your website to search for meta tags

Resources

[Cheat Sheet](https://docs.emmet.io/cheat-sheet/)

[The Absolute Minimum Every Software Developer Absolutely, Positively Must Know About Unicode and Character Sets (No Excuses!)](http://www.joelonsoftware.com/2003/10/08/the-absolute-minimum-every-software-developer-absolutely-positively-must-know-about-unicode-and-character-sets-no-excuses/)

# How to Structure Text in HTML

Instead of <i>, use <em>.

Instead of <b>, use <strong>.

<em> and <strong>, unlike their counterparts, convey more information. They don’t just style content. They tell the browser that the content are more important.

# HTML Lists

<ul> unordered list

<li> list item

<ol> ordered list

# HTML Image Elements

An image tag is self-closing but it always requires an attribute, source.

The source can be a URL from the internet or an image file on the same directory as your website.

# HTML Links and Anchor Tags

HyperText - a collection of files that can be linked together using hyperlinks.

<a href=“#”>Link Text</a>

You can create multiple pages and link to them as long as:

1. The pages are in the same directory.
2. You can link a path towards them.

# HTML Tables

<table>

<tr> - row

<td> - table data or cell

<thead> - table head; fomatted in bold

<th> - table header cell element; using this will automatically bold your header element

<tbody> - table body

<tfoot> - table footer

Why separate the head, body, and foot of a table?

- This is useful when you want to style the different parts differenly.
- For example, if you want to use CSS and Javascript to keep the header immovable while you scroll down the rows.

Most styling attributes in HTML are “deprecated”. They are no longer recommended for use. Just use CSS for styling and JS for behavior.

# Using HTML Tables for Layout

Use this when you are not using CSS for styling yet

But this is not a good idea because it can be confusing

# HTML Tables Code Challenge

Solution: Nested tables (two cells; each cell is a separate table)

# HTML Forms

<form>

<label>

<input> - define type attribute

You can structure the form using HTML. But until you learn JS, you can’t tap on its full functionality yet.

# Forms in Practice

<textarea name="name" rows=“10” cols=“30"></textarea>

rows determine how tall your text area is.

cols deterin how wide the text area is.

when you click submit in this form, you are taken to your homepage. Why?

<form class="" action="index.html" method="post">

form action is equal to index.html

change form actionn to mailto:(put email here) so your default email client is opened

method=“post” simply means that the message in the text area gets posted to the email client.

encytype=“text/plain” - this will prevent unnecessary characters in your email

input=email already have validation functions in it. but we can even make it more sophisticated.

# Publishing your website

<!DOCTYPE html> is necessary in text editors but not when publishing online. You can remove it.

# Introduction to CSS

Cascading Style Sheets

In the past, people style their html using tags and attributes

Problems started showing up when you mess around the layout using just html because you need to use table, which required lots of words, were prone to errors, and were difficult to debug.

CSS is a code to style mark-up language. It can’t do anything by itself.

# Inline CSS

Change background of body

[background-color - CSS: Cascading Style Sheets | MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/background-color)

How to find go colors?

[Color Palettes for Designers and Artists - Color Hunt](https://colorhunt.co/)

How do you know which colors you can spell out and which you can only use using hex code

[<color> - CSS: Cascading Style Sheets | MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value)

The problem with inline CSS is that it can be cumbersome to style each html element.

This problem is what internal CSS solves

# Internal CSS

If you want to affect CSS style globally, use internal CSS, which is placed under the <head>

To create internal CSS, create a <style> tag.

After that, follow these two rules:

1. Define what part of the page you want to affect.
2. Define what change you want to make at that part.

For example:

1. What part? body
2. What change? {background-color: blue}

Even if unstyled, browsers already have default CSS applied to them

[https://www.w3schools.com/csSref/css_default_values.asp](https://www.w3schools.com/csSref/css_default_values.asp)

**hr default CSS**

display: block;

margin-top: 0.5em;

margin-bottom: 0.5em;

margin-left: auto;

margin-right: auto;

`border-style: inset;`

border-width: 1px;

hr border style default to inset

What we want?

- Single line
- No border
- White in color

How

1. Change the border style to none
2. Overwrite default browser value by specifying a new value for it using CSS.

Everything in the page are essentially just boxes. Even lines.

If all of them are boxes, you can change their height and width, even the lines.

You cannot change <body> height because it has default values that prevent us from doing so.

Things to remember about width

- You will view your site in different devices, so you don't really want to put a fix width value on it.
- Instead you can use percentage (i.e., percent relative to the entire width of the webpage)

