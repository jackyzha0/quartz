---
banner: "https://images.unsplash.com/photo-1650573547848-d7b93ed79782?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjAwOTd8MHwxfHNlYXJjaHw2NHx8cG9rZW1vbnxlbnwwfDB8fHwxNjc3MjUxNDI2&ixlib=rb-4.0.3"
banner_y: 0.536
---

## Development Changelog

1. Grid and `Tilemap`
2. Player movement
	1. Sprite Animator
3. NPC's
	1. NPC field of view
4. Switching Scenes
	1. Creating portals using `Collider2D`
	2. Creating new `Scene` and switching to it
	3. Persisiting objects between scenes by creating shared parent
	4. Update correct position in new scene, make sure only one instance of character, and pause game while switching (prevent user from movign)
	5. Multiple portals per scene
5. Indoor Scene
6. Additive scene loading
	1. load connected scenes, delete unconnected scenes
	2. location portal using additive scene
7. Saving states
8. Persisting scene states
	1. After loading scene, find all objects of type `SavableEntity` in current scene
9. Menu

