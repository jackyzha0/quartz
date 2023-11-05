```bash
django-admin startproject project_name
cd project_name

django-admin startapp appname
python manage.py runserver
python manage.py createsuperuser


python manage.py makemigrations
python manage.py showmigrations
python manage.py migrate
```


Django Template Language: variables, tags, filters, comments

Django Rest Framework (DRF)

## Serializers
Model serializers - easily convert Django model instances to JSON
Relationship Serializers - convert related models into JSON
Deserialization and Validation
Renders -> responsible for displaying your output

Filtering - allows users to get a subset
Searching
Ordering
Data Sanitization
Pagination
Caching - serving saved results instead of creating new ones
- Client-side, reverse proxy server, web server, database server


## Securing an API in Django REST Framework
- Token-based authentication in DRF
- User roles
- Throttling
- Authentication (with Djoser)
- Registration and authentication endpoints with JWT