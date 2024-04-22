---
title: LÖVE
compartir: true
---
# LÖVE

[LÖVE](https://love2d.org/) is a framework you can use to make 2D games in Lua. It's free, open-source, and works on Windows, macOS, Linux, Android and iOS.

## Community and Links

- [LÖVE2D.org](https://love2d.org/)
- [Wiki / Documentation](https://love2d.org/wiki/Main_Page)
- [Forums](https://love2d.org/forums/)
- [Introduction to LÖVE](https://dev.to/rubenwap/lua-and-love-are-your-gateway-drug-to-videogame-making-53ag)

## Examples

### Hello World

This is the full source for 'hello world' in LÖVE. Running this code will cause an 800 by 600 window to appear, and display white text on a black background:

```lua
function love.draw()
    love.graphics.print('Hello World!', 400, 300)
end
```

### Draw an Image

```lua
function love.load()
    whale = love.graphics.newImage("whale.png")
end
function love.draw()
    love.graphics.draw(whale, 300, 200)
end
```

### Play a Sound

```lua
function love.load()
    sound = love.audio.newSource("music.ogg", "stream")
    love.audio.play(sound)
end
```

## Functions

### `love.load()`

This function is called at the beginning and it's supposed to load all your data and variables.

```lua
function love.load()
    hero = {}
    hero.name = "Ruben"
    hero.health = 100
    hero.alive = true
    score = 0
end
```

### `love.update`

This function runs repeatedly during the session. The variable `dt` is used to update your data, as it marks the time passed since it last ran.

```lua
function love.update(dt)
    if hero.health < 1 then
        hero.alive = false
    end
    if enemy.dead then
        score = score + 1
    end
end
```

### `love.draw`

Like `love.update`, this function is also called continuously, but rather than calculate the values, it draws game elements on the screen.

```lua
function love.draw()
    love.graphics.print(score, 400, 300)   
end
```

The value being printed score would constantly be redrawn, but since we are also updating the value of it in the update function, on every redraw we would get the most updated value.

## Beyond the Basics

### Movement

```lua
if love.keyboard.isDown("right") then
    hero.x = hero.x + hero.speed * dt
end
```

### Drawing Elements

```lua
love.graphics.rectangle("line", 400, 300, 100, 100)
```

### Drawing an Image

```lua
love.graphics.draw("path to img", 400, 300, 100, 100)
```

## License

LÖVE is licensed under the liberal zlib/libpng license. This means that:

- It costs nothing.
- You can use it freely for commercial purposes with no limitations.

The source can be found on [GitHub](https://github.com/love2d/love).
