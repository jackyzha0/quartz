---
title: "11-view-templates"
aliases: 
tags: 
- cosc203
- lecture
sr-due: 2023-03-11
sr-interval: 100
sr-ease: 250
---

[slides](https://blackboard.otago.ac.nz/bbcswebdav/pid-2972656-dt-content-rid-19051721_1/courses/COSC203_S2DNI_2022/COSC203_lecture11.pdf)

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
```
doctype html 
head 
  title Pug 
  script(type= "text/javascript"). 
    if (foo) bar(1 + 5) 
body 
  h1 Pug - node template engine 
  #container.col //auto makes div with classs
    p You are amazing 
    p Pug is a terse and simple templating language. 
```

### extending views
- you can declare a base template and then extend it, replacing jus the bits you want to change

![extending template example|400](https://i.imgur.com/nwF5Vlc.png)
