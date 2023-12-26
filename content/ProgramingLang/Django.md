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




# Creating an application

python manage.py startapp APPNAME

• __init__.py: An empty file that tells Python to treat the blog directory as a Python module.

• admin.py: This is where you register models to include them in the Django administration site—using this site is optional. 

• apps.py: This includes the main configuration of the blog application. 

• migrations: This directory will contain database migrations of the application. Migrations allow Django to track your model changes and synchronize the database accordingly. This directory contains an empty __init__.py file. 

• models.py: This includes the data models of your application; all Django applications need to have a models.py file but it can be left empty. 

• tests.py: This is where you can add tests for your application. 

• views.py: The logic of your application goes here; each view receives an HTTP request, processes it, and returns a response.

# Django Meta Class

In Django models, the `Meta` class is a special inner class that you define within a model class to provide metadata about the model. This metadata can affect how the model behaves, how it's interpreted by Django's ORM (Object-Relational Mapping), and how it interacts with the database.

The `Meta` class is completely optional in a Django model. If you don't define one, Django will use default values for all the relevant settings. However, defining a `Meta` class gives you a lot of control over model-specific options. Some of the most commonly used options include:

1. **`ordering`**: This specifies the default order in which the objects returned by QuerySets should be sorted. For example, `ordering = ['-publish']` would order objects by the `publish` field in descending order.

2. **`db_table`**: This allows you to set a custom name for the database table. If this isn't provided, Django generates a default table name.

3. **`verbose_name`** and **`verbose_name_plural`**: These provide human-readable names for the model. This is especially useful in Django's admin interface.

4. **`unique_together`**: This can be used to define a composite unique constraint. For example, `unique_together = ('field1', 'field2')` ensures that each combination of `field1` and `field2` is unique across the database table.

5. **`index_together`**: Similar to `unique_together`, but for creating indexes in the database.

6. **`abstract`**: If set to `True`, the model is an abstract base class. Abstract base models are not used to create any database table. Instead, other models inherit from them and create database tables.

7. **`managed`**: If set to `False`, Django won't perform any database operations for the model (like creating the table, migrations, etc.). It's useful when the database table is managed outside of Django.

8. **`permissions`**: Custom permissions for the model, used in Django's authentication system.

9. **`constraints`**: Allows defining database constraints for the model.

10. **`get_latest_by`**: Field name to use with the model’s `get_latest_by()` method and `latest()` manager method.

11. **`default_related_name`**: The default reverse name to use for relationships pointing to this model.

12. **`indexes`**: Allows defining database indexes for the model.

13. **`app_label`**: Defines the name of the Django app that the model belongs to. This is useful if the model is defined outside of any application in `INSTALLED_APPS`.

These are just a few examples of what you can define in a `Meta` class. The options provide a powerful way to influence the SQL code generated by Django and how the ORM interacts with your models. Remember, any settings you define in a `Meta` class apply to the entire model class and all instances of that model.


# How to design model in Django

Designing models in Django, which is a high-level Python web framework, involves creating Python classes that define the structure of your database. Models in Django are a source of truth for your data. They contain the essential fields and behaviors of the data you're storing. Here's a guide to help you design models effectively in Django:

### 1. Understand Your Data
Before writing any code, understand the data you want to store and how different pieces of data are related to each other. Identify the entities (like User, Post, Product, etc.) and their attributes.

### 2. Creating a Model
Each model in Django is a Python class that subclasses `django.db.models.Model`. The attributes of the class represent database fields.

```python
from django.db import models

class MyModel(models.Model):
    my_field = models.CharField(max_length=100)
```

### 3. Choose Field Types
Django provides various field types like `CharField`, `IntegerField`, `DateField`, `ForeignKey`, etc. Choose the appropriate field type based on the nature of the data.

### 4. Define Relationships
Understand the relationships between different entities. Django supports three primary types of relationships: 
- **ForeignKey**: A many-to-one relationship. Use this if many instances of a model can be associated with one instance of another model.
- **ManyToManyField**: A many-to-many relationship. Use it when instances of a model can be associated with many instances of another model.
- **OneToOneField**: A one-to-one relationship. Use it when one instance of a model is associated with one instance of another model.

### 5. Use `Meta` Options
The `Meta` class inside a model is where you define the model-specific options like ordering, database table name (`db_table`), verbose names (`verbose_name` and `verbose_name_plural`), etc.

### 6. Implement Methods
You can define methods in the model class. Common methods include:
- `__str__`: Returns a human-readable representation of the object.
- Custom methods to perform operations specific to the model.

### 7. Indexing and Constraints
Add indexes using `Meta` class options to improve query performance. Define constraints like `unique_together` for data integrity.

### 8. Consider Model Inheritance
Django offers three types of model inheritance: abstract base classes, multi-table inheritance, and proxy models. Choose based on your design needs.

### 9. Validation
Define clean methods or validators to enforce specific rules on your fields for data integrity.

### 10. Create and Run Migrations
Once your models are defined, create migrations and run them to update the database schema.

```bash
python manage.py makemigrations
python manage.py migrate
```

### Best Practices
- Keep models simple and focused on the data and behavior they represent.
- Use verbose field names to improve code readability.
- Add docstrings to models and their methods for documentation.
- Keep business logic in models or managers rather than views or other layers.

### Example
Here's a simple example of a blog application with two models:

```python
from django.db import models
from django.utils import timezone

class Author(models.Model):
    name = models.CharField(max_length=100)
    bio = models.TextField()

    def __str__(self):
        return self.name

class Post(models.Model):
    author = models.ForeignKey(Author, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    content = models.TextField()
    published_date = models.DateTimeField(default=timezone.now)

    class Meta:
        ordering = ['-published_date']

    def __str__(self):
        return self.title
```

In this example, we have two models `Author` and `Post` with a ForeignKey relationship. This is a simplified representation to get you started with Django models.


# Add Index in models

Important Point:
- To improve query performance, especially for queries that filter or order by the `publish` field, a database index is added to this field in the `Post` model of a Django application. This is particularly beneficial since the `publish` field is used for default ordering of query results. 

- The index is added to the `Meta` class of the `Post` model using the `indexes` option, which allows defining database indexes. These indexes can be on single or multiple fields and can specify order (ascending or descending) or use functional expressions and database functions.

- Note that on MySQL databases, index ordering is not supported, so a descending index will be created as a regular index.

- The addition of this index will be reflected in future database migrations for the blog models.

Code Example:
```python
from django.db import models
from django.utils import timezone

class Post(models.Model):
    title = models.CharField(max_length=250)
    slug = models.SlugField(max_length=250)
    body = models.TextField()
    publish = models.DateTimeField(default=timezone.now)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-publish']
        indexes = [
            models.Index(fields=['-publish']),
        ]

    def __str__(self):
        return self.title
```

In this code, an index is added to the `publish` field of the `Post` model to optimize query performance. The index is specified in the `Meta` class under the `indexes` option, indicating a descending order for the `publish` field.



# Django By Example 4 Book Summary

#django #books 

pip install Django~=4.1.0
python 3.10
used for book

python -m django --version => check django version

## MVC

The Model-View-Controller (MVC) is a software architectural pattern commonly used for developing user interfaces. It divides an application into three interconnected components to separate internal representations of information from the ways that information is presented to and accepted from the user. This separation helps manage complexity and facilitates efficient code reuse and parallel development. Here's a breakdown of each component:

1. **Model**: The Model represents the data or the business logic of the application. It manages the data, logic, and rules of the application. For example, if your application is a book library, the Model will manage book data, keeping track of which books are in the library, whether they are loaned out, etc.

2. **View**: The View is the visual representation of the Model. It presents the data to the user. The View is responsible for displaying the data (the books and their status) from the Model to the user and also for sending user commands to the Controller. The View is typically what the user interacts with, like the graphical user interface.

3. **Controller**: The Controller acts as an interface between Model and View components to process all the business logic and incoming requests, manipulate data using the Model component, and interact with the Views to render the final output. For example, when a user wants to borrow a book, the Controller will handle this request, checking with the Model to see if the book is available and then updating the View.

The key idea behind MVC is that each of these components can be developed and tested independently. This makes the development process more efficient and allows for easier maintenance and scaling of the application. The MVC pattern is widely used in web applications, where the View is the HTML or web page, the Controller is the server-side scripting or backend technology, and the Model is the database or server-side logic.


## MVC vs MVT

**Model-View-Template (MVT)** is another architectural pattern similar to Model-View-Controller (MVC), but with some differences in how it handles the presentation layer. MVT is notably used in the Django framework for web development. 

### Model-View-Template (MVT):

1. **Model**: Similar to MVC, the Model in MVT represents the data structure of the application. It is concerned with what the data is, how it is stored, retrieved, and changed. Essentially, it represents the database structure and handles data-related logic.

2. **View**: In MVT, the View is more closely related to what is called the Controller in MVC. It is responsible for processing a user's request and returning the appropriate response. The View in MVT takes user input, processes it (possibly involving interactions with the Model), and returns the output.

3. **Template**: The Template in MVT is similar to the View in MVC. It is concerned with how to present the data. It is responsible for generating the HTML (or other markup) that is displayed in the user’s browser. Essentially, it's the layout and design of what the user sees and interacts with.

### Comparison of MVT and MVC:

- **Role of View/Controller/Template**: The primary difference lies in the View component. In MVC, the View is about presenting data, while in MVT, the View is more about the business logic or control logic. The presentation logic in MVT is handled by the Template.

- **Flow of Control**:
  - In **MVC**, a user interacts with the View, which then updates the Controller. The Controller interacts with the Model, updates it if necessary, and then a View is rendered.
  - In **MVT**, a user interacts with the Template (equivalent to MVC's View), which passes the request to the View (equivalent to MVC's Controller). The View, after interacting with the Model if needed, renders the Template.

- **Usage**:
  - **MVC** is a more general pattern and is used in various types of applications, from small to large enterprise applications. It's not limited to web applications.
  - **MVT** is specifically tailored for web applications and is closely associated with Django, a high-level Python web framework.

- **Separation of Concerns**:
  - Both MVC and MVT aim to separate concerns, but they do it slightly differently. MVC separates the data (Model), the user interface (View), and the control logic (Controller), while MVT separates the data (Model), the control logic (View), and the presentation logic (Template).

In summary, while both MVC and MVT patterns aim to separate concerns and streamline development, their approach to handling the user interface and control logic differs. MVC is a more traditional and widely used pattern, while MVT is a variation more specific to web development, particularly in the Django framework.

```bash
django-admin startproject mysite
cd mysite && python manage.py migrate
python manage.py runserver
# python manage.py runserver 127.0.0.1:8001 --settings=mysite.settings
```



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
# How to create Models in Django ?

Creating models in Django involves defining the structure of your database tables in terms of Python classes. Django's Object-Relational Mapping (ORM) layer then translates these Python classes into database tables. Here's a step-by-step guide to creating Django models:

### 1. Set Up Your Django Project and Application
Before creating models, you need to have a Django project and at least one application within it.

- **Start a Project**: If you haven't already, start a Django project by running:
  ```bash
  django-admin startproject myproject
  ```
- **Create an Application**: Create an application within your project:
  ```bash
  python manage.py startapp myapp
  ```
- **Register the Application**: Add your app to the `INSTALLED_APPS` list in your project's `settings.py` file:
  ```python
  INSTALLED_APPS = [
      # ...
      'myapp',
  ]
  ```

### 2. Define Your Models
In the `models.py` file of your application, define your models.

- **Import the models module**: 
  ```python
  from django.db import models
  ```
- **Create a class for each model**:
  ```python
  class MyModel(models.Model):
      # Define fields here
      field_name = models.FieldType(options)
  ```

  - Each model is represented by a class that subclasses `models.Model`.
  - Each field of the model is represented by an instance of a `models.Field` subclass (e.g., `CharField`, `IntegerField`).

- **Example**:
  ```python
  class Book(models.Model):
      title = models.CharField(max_length=100)
      author = models.CharField(max_length=100)
      published_date = models.DateField()
  ```

### 3. Run Migrations
After defining your models, you need to create migrations and apply them to your database.

- **Create Migrations**: Run the following command to create migration files for your models:
  ```bash
  python manage.py makemigrations myapp
  ```
- **Apply Migrations**: Execute the migrations to create database tables:
  ```bash
  python manage.py migrate
  ```

### 4. Use Models in Django
Now, your models are ready to be used in views, forms, and templates.

- You can create, retrieve, update, and delete instances of your models using Django's ORM methods.
- For example, to create a new `Book` object:
  ```python
  new_book = Book(title="Sample Book", author="Author Name", published_date=date.today())
  new_book.save()
  ```

### 5. Admin Interface (Optional)
To manage your models easily, you can register them with Django's admin interface.

- In `admin.py` of your app, import your model and register it:
  ```python
  from django.contrib import admin
  from .models import Book

  admin.site.register(Book)
  ```

### Additional Tips
- **Model Fields**: Familiarize yourself with the various field types available in Django (`CharField`, `IntegerField`, `ForeignKey`, etc.), as well as their options (like `max_length`, `null`, `blank`, `choices`, etc.).
- **Relationships**: Learn about defining relationships (one-to-one, many-to-one, many-to-many) using `ForeignKey`, `OneToOneField`, and `ManyToManyField`.
- **Meta Options**: Use the inner `Meta` class in your model to provide metadata to your model like ordering options, verbose names, etc.
- **Querying**: Understand how to query your models using Django's ORM to retrieve, filter, and order data efficiently.

By following these steps, you can successfully create and use models in your Django application to interact with the database in a Pythonic way.



## What is Slug field ?
A "slug" in Django and web development is a short label typically used in URLs to identify a particular resource in a human-readable way. A slug is a part of a URL that is usually a cleaned-up version of a title or name, containing only letters, numbers, underscores, or hyphens. They are generally used in URLs because they are easier to type, read, and remember than a numerical ID or a chunk of query parameters. They also help with Search Engine Optimization (SEO) since they clearly describe the content of the page.

### Django's SlugField

In Django, a `SlugField` is a field in a model used to store and generate these slugs. It's a part of Django's model fields and is used to store a slug for a particular record. Here's how it works and its characteristics:

- **Syntax**:
  ```python
  slug = models.SlugField(max_length=50)
  ```

- **Characteristics**:
  - The `SlugField` in Django is similar to a `CharField` but with some constraints: it can only contain letters, numbers, underscores, or hyphens.
  - It's commonly used in URLs for individual records, making the URLs more user-friendly and SEO-friendly.
  - You can set a `max_length` parameter to specify the maximum length of the slug.
  - Often, the slug is derived from another field in the model, like the title of a blog post. Django can automatically populate a slug field using the `slugify` function, which converts a given string into a slug format.

- **Auto-populating Slugs**:
  - In practice, slugs are often generated automatically from another field, like the title of an article. For example, the title "My First Blog Post!" might be automatically turned into the slug "my-first-blog-post".
  - You can override the `save` method of your model or use Django's `pre_save` signal to auto-populate the slug field based on another field.

- **Usage in URLs**:
  - Slugs are used in URL patterns to provide a unique identifier for an object that is also readable and SEO-friendly. For instance, a blog post might be accessible at a URL like `/blog/my-first-blog-post`.

- **Example**:
  ```python
  from django.db import models
  from django.utils.text import slugify

  class BlogPost(models.Model):
      title = models.CharField(max_length=100)
      slug = models.SlugField(max_length=100, unique=True)

      def save(self, *args, **kwargs):
          if not self.slug:
              self.slug = slugify(self.title)
          super(BlogPost, self).save(*args, **kwargs)
  ```

  In this example, a `BlogPost` model is defined with a `title` and a `slug`. The `save` method is overridden to automatically generate a slug from the `title` if the slug is not provided.

In summary, a `SlugField` in Django is used to store the slug of a model instance, which is a URL-friendly string derived from another field, like a title. It enhances the readability and SEO of URLs in web applications.


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


## Add time in models

![[Screenshot from 2023-12-26 08-57-14.png]]


## What is class Meta in django ?

In Django, a `class Meta` inside a model class is a special inner class that holds configuration metadata for the model. It's a way to tell Django about various options and preferences for how the model should behave. Here's what you can do with `class Meta`:

### Options for `class Meta`:

1. **Naming and Ordering**:
   - `db_table`: Specify the name of the database table to use for the model. If not given, Django will use a default name based on the app and model names.
   - `ordering`: Define the default ordering for query results from the model. It's a list or tuple of field names; prefixing a field name with `-` indicates descending order.

2. **Permissions**:
   - `permissions`: A list of permission tuples that define custom permissions for the model. Useful for extending Django's built-in permissions system.
   - `default_permissions`: Define which default permissions (add, change, delete, view) Django should create for the model.

3. **Abstract Base Classes**:
   - `abstract`: If `True`, the model is an abstract base class. Django won't create a database table for abstract models. They're a way to put common information into a number of other models.

4. **Field Options**:
   - `verbose_name` and `verbose_name_plural`: Define human-readable singular and plural names for the model. If not specified, Django will generate default verbose names.

5. **Field Restrictions**:
   - `unique_together`: This is a list of lists of fields that must be unique when considered together.
   - `index_together`: Similar to `unique_together`, but specifies columns that should be indexed together.

6. **Relationships**:
   - `get_latest_by`: Specify the default field to use in the `latest()` method of the model's manager.
   - `constraints`: A list of database constraints to apply to the model's table.

7. **Model Inheritance**:
   - `proxy`: If `True`, the model is a proxy model. It will not create a new database table but will create a new proxy interface to the original model.

8. **Managed Option**:
   - `managed`: Determines whether Django will handle the creation, migration, and deletion of the database table. Defaults to `True`. If `False`, Django won't manage the database table's lifecycle.

9. **App Label**:
   - `app_label`: Define the app label for models not in an application listed in `INSTALLED_APPS`.

10. **Other Options**:
    - `default_related_name`: Provide a default reverse name for related objects.

Here's an example of using `class Meta` in a Django model:

```python
from django.db import models

class Author(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()

    class Meta:
        db_table = 'author_details'
        ordering = ['name']
        verbose_name = 'Author'
        verbose_name_plural = 'Authors'
        permissions = (
            ('can_email_author', 'Can Email Authors'),
        )
```

In this example, `class Meta` is used to set a custom table name, define a default ordering by name, set a verbose name for the admin interface, and define a custom permission.

The use of `class Meta` is a powerful feature that lets you control various aspects of your Django model's behavior in a declarative and centralized way.


## Adding a database index

`
```python
class Meta:
	ordering = ['-publish']
	indexes = [ models.Index(fields=['-publish']), ]
```


## Activating the application


```python
INSTALLED_APPS = [

'django.contrib.admin',

'django.contrib.auth',

'django.contrib.contenttypes',

'django.contrib.sessions',

'django.contrib.messages',

'django.contrib.staticfiles',

'blog.apps.BlogConfig' # blog app see apps.py

]
```


```python
    class Status(models.TextChoices):
        DRAFT = 'DF', 'Draft'
        PUBLISHED = 'PB', 'Published'

# later you can use with this
    status = models.CharField(max_length=2,
                              choices=Status.choices,
                              default=Status.DRAFT)
# in class

```

Here, a subclass named `Status` is defined within the `Post` class, using `models.TextChoices` to create a set of choices that can be used for a field later. `DRAFT` and `PUBLISHED` are two possible states for a blog post, with corresponding database values of 'DF' and 'PB', and human-readable names 'Draft' and 'Published'.

![[Screenshot from 2023-12-26 09-24-44.png]]


# Add user

```python
from django.db import models

from django.utils import timezone

from django.contrib.auth.models import User

  
  

class PublishedManager(models.Manager):

def get_queryset(self):

return super().get_queryset()\

.filter(status=Post.Status.PUBLISHED)

  
  

class Post(models.Model):

  

class Status(models.TextChoices):

DRAFT = 'DF', 'Draft'

PUBLISHED = 'PB', 'Published'

  

title = models.CharField(max_length=250)

slug = models.SlugField(max_length=250)

author = models.ForeignKey(User, # from django.contrib.auth.models import User

		on_delete=models.CASCADE,

		related_name='blog_posts')

body = models.TextField()

publish = models.DateTimeField(default=timezone.now)

created = models.DateTimeField(auto_now_add=True)

updated = models.DateTimeField(auto_now=True)

status = models.CharField(max_length=2,

	choices=Status.choices,

	default=Status.DRAFT)

  

objects = models.Manager() # The default manager.

published = PublishedManager() # Our custom manager.

  

class Meta:

ordering = ['-publish']

indexes = [

models.Index(fields=['-publish']),

]

  

def __str__(self):

return self.title
```

![[Screenshot from 2023-12-26 09-29-22.png]]

### Create admin for site

python manage.py createsuperuser

Adding models to the administration site Let’s add your blog models to the administration site. Edit the admin.py file of the blog application and make it look like this. The new lines are highlighted in bold: 
'''
from django.contrib import admin
from .models import Post admin.site.register(Post)
'''
Now reload the administration site in your browser. You should see your Post model on the site.

### Customizing how models are displayed

in admin.py

```python
from django.contrib import admin 
from .models import Post @admin.register(Post) 
class PostAdmin(admin.ModelAdmin): 
	list_display = ['title', 'slug', 'author', 'publish', 'status']
```


# Django ORM Cheatsheet

https://djangocentral.com/django-orm-cheatsheet/

## Creating model managers

The default manager for every model is the objects manager. This manager retrieves all the objects in the database. However, we can define custom managers for models.

Edit the models.py file of your blog application to add the custom manager as follows. The new lines are highlighted in bold:

class PublishedManager(models.Manager):
	def get_queryset(self): return super().get_queryset()\ .filter(status=Post.Status.PUBLISHED)
	
  class Post(models.Model): 
		# model fields # ... 
	   objects = models.Manager() # The default manager.
	   published = PublishedManager() # Our custom manager.

>>> from blog.models import Post
>>> Post.published.filter(title__startswith='Who')

![[Screenshot from 2023-12-26 09-49-01.png]]


