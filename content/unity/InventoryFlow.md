[Werdsmith](https://werdsmith.com/mrgizmo/HH6hFJu9qmfSrM)

# External Components
All the shops, items and levels (experience) will be managed through the LootLocker.io API, so please get familiar with this.

# User flow
Essentially, all the items in our game are NFTs (Non-Fungible Tokens). This means that users will need to be able to access their wallet from inside Unity, and have all their items be viewable in their wallet.

## Item types
1. Weapons
	a) Ranged (Guns/Blasters, Bows/Crossbows, Throwables)
	b) Melee (Short swords, limb augmentations, “multitools”)
2. Tools
	a) Research tools (drills, oscillators, etc -> think “Mars Rover”)
	b) Resource gathering tools (mining drills, autonomous vehicles)
	c) Repair bots
3. Building components
4. Electronics
	a) Laid down by the Matter Manipulator component of the multitool
	b) Connect different items together, process/transfer information/data & other items
5. Consumables
	a) Food
	b) Potions/Injections
	c) Temporary augmentations
6. Flora/Fauna
	Gathered from the planet
	Placed into “habitats” which then “charge” the base/vehicle & relevant multitools

We’re going to organise the items based on utility: they can be attached to the user (e.g. base building items or melee/ranged weapons), attached to the multitool (e.g. mining beams, specialised weapons, “matter manipulator”), attached to baes (e.g. stationary tools/weapons), or attached to vehicles (like ships or mechs). The vehicles’ storage lockers will act as a “cloud storage” unit for any connected base - for example, once a ship has flown to the same user’s base and docked, any items or information from the ship can be accessed at the base.

The main inventory view will show the items & consumables the player currently has available to them, as well as a window into their “wallet”, showing their currencies (users will be able to create their own currencies when working in groups), connections, and current “missions” or “quests”.

[Notion](https://skinetics.notion.site/Unity-Inventory-System-21648eeb129c43d5ab62528aa34f0854)