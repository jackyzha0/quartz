---
title: "11-mvc-model"
aliases: 
tags: 
- cosc203
- lecture
---

![mvc model diagram|400](https://i.imgur.com/Ini1bwk.png)

# view templates
## pug
pug is a view engine.
``` js
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')
```

a pug file 
- defines an html template

e.g.,
``` pug
doctype html
head
  title mytitle
  script(type="text/javascript")	 
```