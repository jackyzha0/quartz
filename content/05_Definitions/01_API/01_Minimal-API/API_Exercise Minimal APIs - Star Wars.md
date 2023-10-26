#Definitions 

---
## # Assignment

Build up a REST API using [Dotnet Minimal APIs](https://deep-thought.norwin.at/tech-kb/web-development/Dotnet-Minimal-APIs/). Your API should be able to handle data about Star Wars characters.

A character is described by these properties:

- Name
- Faction
- Homeworld
- Species

For example:

```json
{
	"id": 1,
	"name": "Luke Skywalker",
	"faction": "Rebel Alliance",
	"homeworld": "Tatooine",
	"species": "Human"
}
```

```json
{
	"id": 2,
	"name": "Darth Vader",
	"faction": "Galactic Empire",
	"homeworld": "Tatooine",
	"species": "Human"
}
```

```json
{
	"id": 3,
	"name": "R2-D2",
	"faction": "Rebel Alliance",
	"homeworld": "Naboo",
	"species": "Droid"
}
```

> In <mark style="background: #D2B3FFA6;">C#</mark> we use <mark style="background: #D2B3FFA6;">PascalCase</mark> for property identifiers. In <mark style="background: #D2B3FFA6;">JSON</mark> it is more commen tu use <mark style="background: #D2B3FFA6;">camelCase</mark> identifiers. ASP.NET’s default serialization/deserialization behavior is to convert the casings, so that a PascalCase property will be serialized as camelCase field in JSON and vice-versa. So you can create your C# classes with normal PascalCase identifiers (Id, Name, Faction, …)

The single resource of your API is `/sw-characters`. You should support these endpoints:

---
### # GET /sw-characters

Returns all available characters.

#### # Filters

It should be possible to <mark style="background: #D2B3FFA6;">filter by faction</mark>, <mark style="background: #D2B3FFA6;">homeworld</mark> or <mark style="background: #D2B3FFA6;">species</mark> using query parameters: `GET /sw-characters?faction=Rebel%20Alliance` - returns all characters that belong to the Rebel Alliance `GET /sw-characters?homeworld=Naboo` - returns all characters with Naboo as homeworld `GET /sw-characters?species=Human` - returns all human characters

---
### # GET /sw-characters/{id}

Returns a specific character by ID.

---
### # POST /sw-characters

Everytime gives a new ID.

Insert a new entry into the list of characters. When sending the request, your JSON body should not contain an `id` Property and if it does it should be ignored by the API. The API will assign a new ID automatically and return the assigned ID in the response.

---
### # PUT /sw-characters/{id}

Update a specific character by ID (The ID itself should not be changed).

----
### # DELETE /sw-characters/{id}

Delete a character by ID.

---
## # Storing data

Usually you would want to persist data managed by an API on some sort of database. For this exercise it is sufficient to store the data in memory (e.g. using a static List of characters) that will be accessed/modified by the requests.

## # Request and response data

Every request and response should be formatted as JSON. It is up to you however how you design the messages. Think about what information is needed in each request/response. For example where do you need IDs in the message body?

---
## # Tests

- + own project for unit-tests

Test your API manually by using Postman. Additionally write automated unit tests. Set up a unit test project where you try a few tests. For example: Insert an entry and try to get it again. Delete it afterwards and try to get it again, it should not be possible. Each endpoint and functionality should be tested by one or more unit tests.

For being able to unit-test your handlers, your handlers should be publicly accessible from the unit test project. You can achieve this by following the structure outlined in [Dotnet Minimal APIs > Structuring Example](https://deep-thought.norwin.at/tech-kb/web-development/Dotnet-Minimal-APIs/).
