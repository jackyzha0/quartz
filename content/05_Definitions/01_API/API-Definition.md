#Definitions 
[[API_Minimal APIs .NET]]

---

|   |   |
|---|---|
|A|pplication|
|P|rogramming|
|I|nterface|

To interact between two applications. 
Allows other programs or application to use functionality that you expose:

- Functions
- Protocols
- Objects
---
## # Weather Data Example

Request:

```http
GET https://www.7timer.info/bin/astro.php
?lon=15.593063
&lat=48.411018
&ac=0
&unit=metric
&output=json
```

Response:

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "product": "civil",
	"init": "2023070206",
	"dataseries": [
		{
			"cloudcover": 7,
			"temp2m": 21,
			"rh2m": "63%",
			"wind10m": {
			"direction": "W",
			"speed": 3
		},
		...
	]
}
```
---
## # API Keys

- like username + password
- prevent from DDOS-attacks (spam, overloading)
---
## # API Use-Cases

- Frontend - Backend Communication
- Component Communication
    - e.g. One Service calls another service
- DaaS
	Desktop As A Service - Cloud Computing
---
## # Frontend-Backend

![[Pasted image 20230926151927.png]]

Using APIs, you can link any software parts, potentially using <mark style="background: #D2B3FFA6;">different technologies, as long as they support the same protocol</mark>. 

----
## # Component Communication

![[Pasted image 20230926152005.png]]

Communication between elements = APIs (arrows)

---
## # Protocols

Through OSI-Model.
There are several common protocols used in APIs.

- [[API_REST]]

![[Pasted image 20230926152044.png]]

---
## # Attributes of protocols

**Protocols …**

- allow exchange of messages and information between 2 processes.
    - Processes don’t need to be on the same physical machine. Can be distributed and communicate over network.
- are open to any technology or programming language.
- have a clear specification.
---
#### # API-Platforms

### # Postman
open-source API platform for building & using APIs

--------------------

