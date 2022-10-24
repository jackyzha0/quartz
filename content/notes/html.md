---
title: "html"
aliases: 
tags: 
- cosc203
---

# Structure
Element: `<div id="element" disabled>Hello!</div>

Example:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Boy</title>
    <meta charset="UTF-8" />
</head>
<body>
<h1>
    Hello World! 😃
</h1>
</body>
</html>
```

# Elements

## Multimedia
### Vector Graphics
``` html
<img
 src="star.svg"
 alt=“a star vector graphic”
 height="87"
 width="100" />
 ```
 
 ```html
<svg width="300" height="200">
 	<rect width="100%" height="100%" fill="green" />
</svg> 
 ```

### Videos
``` html
<video src="rabbit320.webm" controls>
 <p>Your browser doesn't support HTML5 video. Here
is a <a href="rabbit320.webm">link to the video</a>
instead.</p>
</video>
```

### Audio
```html
<audio controls>
 <source src="viper.mp3" type="audio/mp3">
 <source src="viper.ogg" type="audio/ogg">
 <p>Your browser doesn't support HTML5 audio. Here
is a <a href="viper.mp3">link to the audio</a>
instead.</p>
</audio>
```

### iframe
Embedding other webpages
``` html
<iframe style="border-radius:12px" src="https://open.spotify.com/embed/track/
5wdo9394EgfGIqoLsMAPzx?utm_source=generator" width="100%" height="380"
frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media;
fullscreen; picture-in-picture"></iframe>
```

## Table
```html
<table>
 <tr>
	 <th>Data 1</th>
	 <th style="background-color: yellow">Data 2</th>
 </tr>
 <tr>
	 <td>Calcutta</td>
	 <td style="background-color: yellow">Orange</td>
 </tr>
 <tr>
	 <td>Robots</td>
	 <td style="background-color: yellow">Jazz</td>
 </tr>
</table>
```