# Pygame Projects
Here you'll find a link to all the python projects and the api references.

## Pygame API
We're starting off with a simple python game that can be used to:
* Mirror Phaser, Unity gameplay, assets, player [account] data (via Lootlocker API, Metamask, etc)
* Provide endpoints to the game's API in different languages

The game code can be found in the `unity-lootlocker` branch of the [signal-k/dabpi](https://github.com/signal-k/dabpi/tree/unity-lootlocker) repository.

### Level class
The game's level information, structure and formula. How does this compare to Unity & Phaser? How do we integrate the API into this?

We're organising the sprites into groups with different rules, as we'll potentially be dealing with hundreds+ sprites and assets:

* `visible_sprites` -> group for sprites that will be drawn
  * This is the only group that draws sprites
  * Player, Map, Enemies, Obstacles, etc
* `obstacle_sprites` -> 
  * [Every] Sprites that the player can collide with

The sprites can be in multiple groups, even at the same time.