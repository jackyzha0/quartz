---
title: font.getsize()
tags:
  - cv
  - python
  - PIL
date: 2024-12-06
---

# Detail

Exact size depends on many factors. I'll just show you how to calculate different metrics of font.

[![](https://i.sstatic.net/gSBad.png)](https://i.sstatic.net/gSBad.png)

```python
font = ImageFont.truetype('arial.ttf', font_size)
ascent, descent = font.getmetrics()
(width, baseline), (offset_x, offset_y) = font.font.getsize(text)
```

- Height of red area: `offset_y`
- Height of green area: `ascent - offset_y`
- Height of blue area: `descent`
- Black rectangle: `font.getmask(text).getbbox()`


# Application Example



# Reference

* https://stackoverflow.com/questions/43060479/how-to-get-the-font-pixel-height-using-pils-imagefont-class