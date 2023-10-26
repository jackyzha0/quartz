#Definitions 

----

|   |   |
|---|---|
|RE|presentational|
|S|tate|
|T|ransfer|

Server responds to requests with a representation of a resource (typically as JSON).

---
## # Origin

- [Roy Fielding](https://en.wikipedia.org/wiki/Roy_Fielding) identified 5 architectural concepts that make the web successful in his dissertation (2000):
    - Addressable Resources
    - A Uniform, Constrained Interface
    - Representation-Oriented
    - Communicate Statelessly
    - Hypermedia As the Engine Of Application State (HATEOAS)

---
## # Addressable Resources

- Before REST was introduced there was often just one address where clients sent requests to.
- The functionality or resource was specified within the message body.
- REST uses the URI concept for distinguishing between resources within one service
    - people-service.com/students
    - people-service.com/teachers

---
## # Uniform, Constrained Interface

- Use a limited number of operations to manipulate resources.

|HTTP-Method|Description|
|---|---|
|GET|Read-only, Idempotent, Secure, State will be unchanged|
|POST|Add a new resource. Not idempotent: Every call will change state|
|PUT|Create a resource if it doesn’t exist, update it if it exists. Idempotent!|
|DELETE|Deletes a resource. Idempotent|
|HEAD|Just as GET, but only status codes will be returned. Idempotent|
|OPTIONS|List which methods are supported for a resource. Idempotent|

---
## # Excursus: Idempotence

An operation is idempotent if it can be applied multiple times without changing the result beyond the initial execution.
When the state changes - it is not idempotent

[Idempotence on Wikipedia](https://en.wikipedia.org/wiki/Idempotence)

---
## # Uniform, Constrained Interface - Advantages

- Simplicity
    - Easy to understand
    - Lowers need for detailed interface description
    - No complex client libraries are needed
- Interoperability
    - HTTP-Client-Library is sufficient for accessing REST services and available for practically every programming language or platform
- Scalability
    - Results of read-only operations (GET, HEAD, OPTIONS) can be cached by clients and proxy-servers

---
## # Representation-Oriented

- Client and server exchange representations of resources using HTTP requests and responses.
- Representation is not standardized
- Commen formats:
    - JSON
    - XML
    - YAML
- HTTP-Header ‘Content-Type’ defines which format will be used:
    - `Content-Type: application/json`
- Using HTTP-Header ‘Accept’, the client can specify the preferred format (e.g. if the server supports multiple formats)
    - `Accept: application/json`

---
## # Communicate statelessly

- A single request in independent from previous and following requests
- Server keeps no state for clients

---
## # HATEOAS

- Hypermedia As the Engine Of Application State
- Servers provide information about resources dynamically
- Subsequent requests can be made using the information from the response

```fallback
GET /accounts/12345 HTTP/1.1
Host: bank.example.com
```

```json
{
    "account": {
        "account_number": 12345,
        "balance": {
            "currency": "usd",
            "value": 100.00
        },
        "links": {
	        // links - for more informations
            "deposits": "/accounts/12345/deposits",
            "withdrawals": "/accounts/12345/withdrawals",
            "transfers": "/accounts/12345/transfers",
            "close-requests": "/accounts/12345/close-requests"
        }
    }
}
```

---

[

## # Designing RESTful Web-Services

### # Define object model

![[Pasted image 20230927115327.png]]

### # Model URIs

- `/employees`: all employees
- `/employees/{id}`: specific employee
- `/logbookentries`: all entries
- `/logbookentries/{id}`: specific entry
- `/employees/{id}/logbookentries`: all logbookentries for specific employee

---
## # Semantics of HTTP-Methods

- `GET /employees[?startIndex=0&size=5]`
    - Read (a part of) all employee objects
    - [?key = value] query parameters
- `GET /employees/{id}`
    - Read an employee object via its key
- `POST /employees`
    - Insert an employee object. Key will be generated and (usually) returned.
- `PUT /employees/{id}`
    - Update an employee object. Create if not exists (recommendation).
- `DELETE /employees/{id}`
    - Delete an employee object (or mark as deleted)

---
## # HTTP and REST

-<mark style="background: #D2B3FFA6;"> Following the principles</mark> by Roy Fielding a <mark style="background: #D2B3FFA6;">RESTful</mark> service can use basically any communication protocol.
- However in practice, REST is basically only used with HTTP

---
## # Structure of a HTTP request

- RFC: [https://datatracker.ietf.org/doc/html/rfc2616#section-4](https://datatracker.ietf.org/doc/html/rfc2616#section-4)
- A correctly composed HTTP request contains the following elements:
    - A request line
    - A series of HTTP headers, or header fields (sent back by browser)
    - A message body, if needed

```fallback
GET /employees HTTP/1.1
Host: employee-service.com
Accept: application/json
User-Agent: Mozilla/5.0
```

```fallback
PUT /employees/42 HTTP/1.1
Host: employee-service.com
Content-Type: application/json
Accept: application/json

{
  "firstName": "Fritz",
  "lastName": "Phantom"
}
```

---
## # HTTP Response

A response consists of

- a status code
- response headers
- a body
---
## # Status code categories

|Category|Description|
|---|---|
|1xx|Informational response. Processing continues|
|2xx|Success|
|3xx|Redirection|
|4xx|Client errors. (Error seems to have been caused by client)|
|5xx|Server errors.|

---
## # Popular status codes

| Status Code | Message               | Description                                                      |
| ----------- | --------------------- | ---------------------------------------------------------------- |
| 101         | Switching Protocols   | e.g. when opening WebSocket connection                           |
| 200         | OK                    | Request was handled successfully                                 |
| 201         | Created               | Request was successful, a resource has been created.             |
| 301         | Moved Permanently     | Redirects permanently to location specified in `Location` Header |
| 400         | Bad Request           | Request is malformed                                             |
| 401         | Unauthorized          | User not logged in or no authorization information provided.     |
| 403         | Forbidden             | User is logged in but not permitted to access the resource.      |
| 404         | Not Found             | Requested resource could not be found                            |
| 418         | I’m a teapot          | April fools joke by the IETF                                     |
| 500         | Internal Server Error | Unspecified error on the server happened.                        |

