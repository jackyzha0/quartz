---
title: "file-based-storage"
aliases: file based storage
tags: 
- info201
---

doesn't scale well

- demlimited text e.g., CSV TSV
	- easy to create and process
	- portable
	- lowest common denominator
- structured text e.g., JSON, XML, YAML
	- many tools for querying and transforming data
	- portable also
- Serialiased data Structures (*usually* binary)
	- more compact
	- easy to do
	- single user only
	- no automatic failure recovery
	- no querying
	- versioning issues
	- no standards
	- less portable
