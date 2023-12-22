---
tags:
  - asgi
  - django
  - web
  - python
---
```bash
conda create -n django python=3.10
conda activate django
pip install Django
```
# ASGI

Asynchronous Server Gateway Interface (ASGI) is a specification for Python web servers and applications. It serves as an evolution of the traditional WSGI (Web Server Gateway Interface), which has been the standard for Python web applications. The key features and purpose of ASGI are:

1. **Asynchronous Support**: ASGI provides a standard for handling asynchronous requests in Python. This is particularly important for enabling web applications to handle long-lived connections, such as those needed for WebSockets, HTTP/2, and other protocols.

2. **Compatibility with WSGI**: ASGI is designed to be backward compatible with WSGI. This means that applications and frameworks written for WSGI can be adapted to use ASGI with minimal changes.

3. **Scalability**: By supporting asynchronous programming, ASGI allows for more scalable web applications. Asynchronous applications can handle a larger number of simultaneous connections with fewer resources, as they don't block the server while waiting for I/O operations.

4. **Flexibility**: ASGI separates the concerns of web application and server, allowing for more flexibility in choosing or developing both. Different ASGI servers can be used with different ASGI applications.

5. **Layered Architecture**: ASGI defines a layered architecture with different components handling specific types of events (HTTP, WebSocket, lifespan). This modularity allows for more maintainable and extensible applications.

6. **Community Adoption**: ASGI has gained significant traction within the Python community, with web frameworks like Django and Starlette providing support for ASGI.

Overall, ASGI represents a modern approach to building Python web applications, enabling more efficient handling of asynchronous operations and better scalability. It's particularly useful for applications that require handling real-time data or maintaining persistent connections with clients.


Django components are loosely coupled, which means they can be managed independently. This helps separate the responsibilities of the different layers of the framework; the database layer knows nothing about how the data is displayed, the template system knows nothing about web requests, and so on.


# Main framework components

Django follows the MTV (Model-Template-View) pattern. It is a slightly similar pattern to the wellknown MVC (Model-View-Controller) pattern, where the Template acts as View and the framework itself acts as the Controller. 
The responsibilities in the Django MTV pattern are divided as follows: 

• Model – Defines the logical data structure and is the data handler between the database and the View. 

• Template – Is the presentation layer. Django uses a plain-text template system that keeps everything that the browser renders.

• View – Communicates with the database via the Model and transfers the data to the Template for viewing.

The framework itself acts as the Controller. It sends a request to the appropriate view, according to the Django URL configuration.

![[Screenshot from 2023-12-22 10-49-33.png]]


