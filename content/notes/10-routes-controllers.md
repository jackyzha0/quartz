---
title: "10-routes-controllers"
aliases: 
tags: 
- cosc203
- lecture
sr-due: 2022-12-07
sr-interval: 46
sr-ease: 250
---

[slides](https://blackboard.otago.ac.nz/bbcswebdav/pid-2971203-dt-content-rid-19033355_1/courses/COSC203_S2DNI_2022/COSC203_lecture10%281%29.pdf)

# Routes and controllers
## MVC model
- design pattern
- used in ios development

routes - foward requests to appropriate controller functions
controller functions - get data from models, create html, display data, and return to view
views (templates) - used by controllers to render data

## Routes
 - a section of express code that assocaites an HTTP verb, and url path, and a function to handle that pattern
 - route is a middleware created by `var router = express.Router();`

### route path
- define endpoints at which requests can be made
- can be string patterns similar to regex

## route parameters
- named url segments used to capture values at specific positions in the url
- e.g., `/:user/`
- captures values are stored in `req.params` object
- names must be made up of "word characters"

## route functions
- express middleware — must respond to or call another function in the chain
- each functionis added to the middleware chain and is executed in order

## middleware
- objects that have access to req, res, and the next middleware function in the req-res cycle
- e.g.,
```
app.use()
app.METHOD()
router.use()
express.static
express.json
express.urlencoded
app.use(cookieParser())
```

- middleware can
	- execute code
	- change the req and response objects
	- end the req-res cycle
	- call next middleware function in stack

## forms
- in html — a  collection of elements inside <form></form> tags, containing a submit element
- used to collect user input
- flexible - can colect many different types of input
- secure - can send data in post requests with cross site request forgery protection

e.g., 
``` html
<form action="/login" method="post">
	<label for="username">Username</label>
	<input id="username" type="text" name="username_field" value="">
	<input tupe="submit" value="OK">
</form>
```

sequence
- display form
	- blank or prepopulated fields
- recieve data from user in HTTP post request
- validate and sanitze data
- if invalid - redisplay form with error messages, and user populated fields
- if valid - perform required actions
- redirect user to other page

### validation and sanitization
- required fields
- correct format etc
- remov/replace malicious input
- can use express-validator module

``` js
const {body, validationResult} = require('express-validator');

[
//...
 body('name', "Empty name")
  .trim() //remove whitespace
  .isLength({min: 1}) //check length
  .escape(), //escape potentially dangerous chars
]
```

### form routes
- router.get() - serve page
- router.post() - process request

![](https://i.imgur.com/H1BXggu.png)
