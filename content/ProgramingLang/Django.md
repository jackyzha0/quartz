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

# `python manage.py migrate`

The `python manage.py migrate` command is a crucial part of managing database schemas in Django, a popular Python web framework. This command is used to apply migrations to your database. Migrations are Django's way of propagating changes you make to your models (adding a field, deleting a model, etc.) into the database schema.

Here's a breakdown of what `migrate` does and its importance:

1. **Applying Migrations**: Migrations are Django's way of keeping track of changes to the database schema. Each time you modify a model (e.g., add a field, delete a model, change a field type), Django generates a migration file – a Python script – to reflect those changes. The `migrate` command applies these migrations to your database, updating the database schema.

2. **Database Schema Management**: Migrations are essential for managing the database schema over time. They allow for a database to be updated in a controlled and consistent manner, avoiding the need for manual schema alterations.

3. **Synchronization**: The `migrate` command ensures that the current state of the database matches the state expected by the models. It applies all migrations that have been generated but not yet applied to the database.

4. **Initial Setup**: When you first set up a Django project, `migrate` is used to create the necessary database tables for all the apps listed in `INSTALLED_APPS` that Django provides, like the authentication system, sessions, admin, etc.

5. **Dependencies Handling**: Django keeps track of dependencies between migrations. For example, if one migration depends on another, `migrate` ensures they are applied in the correct order.

6. **Idempotency**: Running `migrate` multiple times doesn’t have adverse effects. If there are no new migrations to apply, Django will simply report that no changes were made.

7. **Database Agnostic**: Django’s migration system is designed to be database agnostic. The same migration files can be applied across different types of databases (like MySQL, PostgreSQL, SQLite) without modification.

To use `migrate`, you typically follow these steps:

1. Make changes to your models.
2. Create migrations for those changes with `python manage.py makemigrations`.
3. Apply those migrations to the database with `python manage.py migrate`.

It's important to regularly run `python manage.py migrate` in your development process to keep your database schema synchronized with your models. In production, this should be done as part of your deployment process.

python manage.py runserver ==> see for results

python manage.py runserver 127.0.0.1:8001 --settings=mysite.settings ==> Runs with custom settings

When you have to deal with multiple environments that require different configurations, you can create a different settings file for each environment.

# Project settings

`settings.py` is a central configuration file in a Django project. It contains various settings and options that determine how your Django application behaves. Understanding `settings.py` is crucial for effective Django development, as it controls fundamental aspects of your project, such as database configurations, installed apps, middleware, templates, and more. Here's an overview of some key components typically found in a `settings.py` file:

1. **`DEBUG`**: A boolean that turns on/off debug mode. When `True`, Django provides detailed error pages when an exception occurs. This should be set to `False` in production for security reasons.

2. **`INSTALLED_APPS`**: A list of strings designating all Django applications that are activated in this Django instance. It includes both your own apps and Django's built-in apps.

3. **`MIDDLEWARE`**: A list of middleware classes used by the project. Middleware is a framework of hooks into Django’s request/response processing. It's a way to process requests and responses globally.

4. **`ROOT_URLCONF`**: A string representing the full Python import path to your root URLconf. This tells Django where to find the URL patterns for the project.

5. **`TEMPLATES`**: A list containing the settings for all template engines to be used with Django. It includes where the templates are stored, which engines to use, and other options.

6. **`DATABASES`**: A dictionary that contains the settings for all databases to be used with the application. It includes database engine (like PostgreSQL, MySQL, SQLite), name, user, password, host, etc.

7. **`AUTH_PASSWORD_VALIDATORS`**: A list of password validation rules for user passwords.

8. **`STATIC_URL`** and **`STATICFILES_DIRS`**: These settings define how Django handles static files (CSS, JavaScript, images). `STATIC_URL` is the URL to use when referring to static files, and `STATICFILES_DIRS` is a list of filesystem directories to check when loading static files.

9. **`LANGUAGE_CODE`** and **`TIME_ZONE`**: These settings specify the default language and timezone for the project.

10. **`SECRET_KEY`**: A large random value used for cryptographic signing. This key is crucial for security and should be kept secret.

11. **`ALLOWED_HOSTS`**: A list of strings representing the host/domain names that this Django site can serve.

In addition to these standard settings, `settings.py` can include custom settings specific to your project. When creating a new Django project, a `settings.py` file is automatically generated with default values, which you can then modify to suit your project's needs.

Remember that `settings.py` contains sensitive information, such as database credentials and the secret key, so it should be protected and not exposed publicly. For production environments, it's a good practice to separate sensitive information into environment variables or use a configuration management tool.

![[Screenshot from 2023-12-22 11-16-15.png]]

In Django, a project is considered a Django installation with some settings. An application is a group of models, views, templates, and URLs. Applications interact with the framework to provide specific functionalities and may be reused in various projects. You can think of a project as your website, which contains several applications, such as a blog, wiki, or forum, that can also be used by other Django projects.


# Creating an application

python manage.py startapp APPNAME

• __init__.py: An empty file that tells Python to treat the blog directory as a Python module.

• admin.py: This is where you register models to include them in the Django administration site—using this site is optional. 

• apps.py: This includes the main configuration of the blog application. 

• migrations: This directory will contain database migrations of the application. Migrations allow Django to track your model changes and synchronize the database accordingly. This directory contains an empty __init__.py file. 

• models.py: This includes the data models of your application; all Django applications need to have a models.py file but it can be left empty. 

• tests.py: This is where you can add tests for your application. 

• views.py: The logic of your application goes here; each view receives an HTTP request, processes it, and returns a response.


```python
from django.db import models

  

# Create your models here.

from django.db import models

class Post(models.Model):

	title = models.CharField(max_length=250)

	slug = models.SlugField(max_length=250)

	body = models.TextField()

	def __str__(self):

		return self.title
```

We have also added a __str__() method to the model class. This is the default Python method to return a string with the human-readable representation of the object. Django will use this method to display the name of the object in many places, such as the Django administration site.

![[Screenshot from 2023-12-22 11-33-17.png]]


By default, Django adds an auto-incrementing primary key field to each model. The field type for this field is specified in each application configuration or globally in the DEFAULT_AUTO_FIELD setting. When creating an application with the startapp command, the default value for DEFAULT_AUTO_FIELD is BigAutoField. This is a 64-bit integer that automatically increments according to available IDs. If you don’t specify a primary key for your model, Django adds this field automatically. You can also define one of the model fields to be the primary key by setting primary_key=True on it.