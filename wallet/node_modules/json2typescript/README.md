[![npm](https://img.shields.io/npm/v/json2typescript.svg)](https://www.npmjs.com/package/json2typescript)
![](https://img.shields.io/npm/dt/json2typescript.svg?style=flat)
![](https://img.shields.io/bundlephobia/minzip/json2typescript.svg?style=flat)
![](https://img.shields.io/npm/l/json2typescript.svg?style=flat)

# json2typescript

In Angular applications, everyone consumes JSON API's from an external source. Type checking and object mapping is only
possible in TypeScript, but not in the JavaScript runtime. As the API may change at any point, it is important for
larger projects to verify the consumed data.

**json2typescript** is a small package containing a helper class that maps JSON objects to an instance of a TypeScript
class. After compiling to JavaScript, the result will still be an instance of this class. One big advantage of this
approach is, that you can also use methods of this class.

With **json2typescript**, only a simple function call is necessary, as demonstrated in this TypeScript snippet:

```typescript
// Assume that you have a class named User defined at some point
// Assume that you get a JSON string from a webservice
let jsonStr: string = ...;
let jsonObj: any = JSON.parse(jsonStr);

// Now you can map the json object to the TypeScript object automatically
let jsonConvert: JsonConvert = new JsonConvert();
let user: User = jsonConvert.deserializeObject(jsonObj, User);
console.log(user); // prints User{ ... } in JavaScript runtime, not Object{ ... }
```

> Tip: All `serialize()` and `deserialize()` methods may throw an `Error` in case of failure. Make sure you catch errors in production!

---

# Changelog

See the changelog in the separate file for bug fixes, new features and breaking changes: [Changelog](CHANGELOG.md)

> Warning: If you are reading this document on GitHub, it might be ahead of the published NPM version.
> Please refer to the [ReadMe on NPM](https://www.npmjs.com/package/json2typescript) if in doubt.

> Warning: We earlier suggested to use the `@JsonObject(classId)` decorator, but did not enforce it. 
> Since v1.4.0, this is mandatory in order to make (de)serialization work properly with class inheritance. 
> In versions above v1.2.0 and below v1.4.0, it is possible to run into issues when not using the decorator.

---

# Getting started

## Requirements

We developed **json2typescript** for Angular 2+ and Ionic 2+. In this document, we only cover this use case. However,
you may use our package for pure TypeScript or even JavaScript applications.

## Setup a Test Application

We recommend to use the official **angular cli** tool in order to set up a new Angular project. Then, all you need to do
is type the following into your operating system's terminal:

```sh
ng new testApplication
cd testApplication

npm install json2typescript
```

Our package makes use of TypeScript decorators. If not done already, please activate them in your **tsconfig.json**
under `compilerOptions` as follows:

```json
{
  "compilerOptions": {
[
  ...
]
"experimentalDecorators": true,
"emitDecoratorMetadata": true,
[...]
}
```

> Tip: We have tried to make the compiler options of `json2typescript` to be as strict as possible. This enables you to use compiler options such as `"strictNullChecks": true` or `"noImplicitAny": true` in your own project.

Now you are ready to use the package.

## Mapping example

In order to use the **json2typescript** package, all you need to do is write decorators and import the package. The
following things need to be done if you would like to map JSON to existing classes:

* Classes need to be preceeded by `@JsonObject(classIdentifier)`
* Properties need to be preceeded by `@JsonProperty(jsonProperty, conversionOption, convertingMode)`
* Properties need to have a default value (or undefined), otherwise the mapper will not work

See below an example so you can learn from it how **json2typescript** works best.

Assuming that you have created the **testApplication** in the step before and installed **json2typescript** as
suggested, create a class in a new file **city.ts** with the following content:

```typescript
import { JsonObject, JsonProperty } from "json2typescript";

@JsonObject("City")
export class City {

    // This property has no @JsonProperty. 
    // It will not be mapped.
    id: number = 123;

    // This maps the value of the JSON key "name" to the class property "name".
    // If the JSON value is not of type string (or missing), there will be an exception.
    @JsonProperty("name", String)
    name: string = "";

    // This maps the JSON key "founded" to the private class property "_founded".
    // Note the use of public getter and setter.
    // If the JSON value is not of type number (or missing), there will be an exception.
    @JsonProperty("founded", Number)
    private _founded: number = 0;
    get founded() { return this._founded; }

    set founded(value: number) { this._founded = value; }

    // This maps the JSON key "beautiful" to the class property "beautiful".
    // If the JSON value is not of type boolean (or missing), there will be an exception.
    @JsonProperty("beautiful", Boolean)
    beautiful: boolean = false;

    // This maps the JSON key "data" to the class property "data".
    // We are not sure about the type, so we omit the second parameter.
    // There will be an exception if the JSON value is missing.
    @JsonProperty("data") // is the same as @JsonProperty("data", Any)
    data: any = undefined;

    // This maps the JSON key "keywords" to the class property "keywords".
    // This is an example of a string array. Note our syntax "[String]".
    // In the further examples at the end of this document, you can see how to nest complex arrays.
    @JsonProperty("keywords", [String])
    keywords: string[] = []; // or Array<string>

    printInfo() {
        if (this.beautiful)
            console.log(this.name + " was founded in " + this.founded + " and is really beautiful!");
        else
            console.log(this.name + " was founded in " + this.founded + ".");
    }

}
```

Now create a file **country.ts** with the following content:

```typescript
import { City } from "./city";
import { JsonObject, JsonProperty } from "json2typescript";

@JsonObject("Country")
export class Country {

    // This maps the value of the JSON key "countryName" to the class property "name".
    // If the JSON value is not of type string (or missing), there will be an exception.
    @JsonProperty("countryName", String)
    name: string = "";

    // This maps the value of the JSON key "cities" to the class property "cities".
    // If the JSON value is not of type array object (or missing), there will be an exception.
    // There will be an exception too if the objects in the array do not match the class "City".
    @JsonProperty("cities", [City])
    cities: City[] = [];

}
```

Then navigate to the file **app.component.ts** and add the following code:

```typescript
import { Component, OnInit } from '@angular/core';
import { JsonConvert, OperationMode, ValueCheckingMode } from "json2typescript"
import { Country } from "./country";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    ngOnInit() {
        // Define a JSON object (could come from a HTTP service, parsed with JSON.parse() if necessary)
        const jsonObject: any = { 
            "countryName": "Switzerland", 
            "cities": [
                {
                    "id": 1,
                    "name": "Basel",
                    "founded": -200,
                    "beautiful": true,
                    "data": 123,
                    "keywords": ["Rhine", "River"]
                },
                {
                    "id": 1,
                    "name": "Zurich",
                    "founded": 0,
                    "beautiful": false,
                    "data": "no",
                    "keywords": ["Limmat", "Lake"]
                }
            ]
        };

        // Choose your settings
        // Check the detailed reference in the chapter "JsonConvert class properties and methods"
        let jsonConvert: JsonConvert = new JsonConvert();
        jsonConvert.operationMode = OperationMode.LOGGING; // print some debug data
        jsonConvert.ignorePrimitiveChecks = false; // don't allow assigning number to string etc.
        jsonConvert.valueCheckingMode = ValueCheckingMode.DISALLOW_NULL; // never allow null

        // Map to the country class
        let country: Country;
        try {
            country = jsonConvert.deserializeObject(jsonObject, Country);
            country.cities[0].printInfo(); // prints: Basel was founded in -200 and is really beautiful!
        } catch (e) {
            console.log((<Error>e));
        }
    }
```

Play around with the JSON to provocate exceptions when deserializing the object.

## Important notes

Avoid circular dependencies on the classes that use `json2typescript`. Even if you don't have any errors in your
IDE, `json2typescript` will not properly work in this case.

---

# Detailed reference

## Class and property decorators

Decorators should be used whenever you would like to map JSON with TypeScript data. As of now, you must not use more
than one decorator per class or property.

### Class decorators

The class decorators are used infront of the class declaration and do support one parameter:

```typescript
@JsonObject("User")
export class User {}
```

> Warning: The class decorator uses the parameter to identify the class. Please use a unique identifier for each class in your project, for example simply the name of the class.

> Tip: Make sure you import `JsonObject` from `json2typescript`.

#### First parameter: classIdentifier

The first parameter of `@JsonObject` must be a unique class identifier, usually just the class name.

> Note: This class identifier may be used for automatic instantiation when enabling the discriminator feature.

### Property decorators

Property decorators are a vital part for type checking. It is important that the type in the decorator matches the
TypeScript type.

For class properties to be visible to the mapper they **must be initialized**, otherwise they are ignored. 
They can be initialized using any (valid) value or `undefined`.
See the example below for better understanding:

```typescript
@JsonObject("User")
export class User {
    
    // A correct example
    @JsonProperty("name", String, false)
    name: string = "";
    
    // An incorrect example
    @JsonProperty("alias", string, false) // Wrong type: Must use String instead.
    alias: string = "";
  
    // An incorrect example
    @JsonProperty("expertise", String, false)
    expertise: string; // No initialization: Property will be ignored without visible exception
    
}
```

> **Important note**: You must assign any (valid) value or `undefined` to your property at initialization, otherwise our mapper does **not** work and will simply ignore the property. Assigning no value is not the same as assigning `undefined` in context of `json2typescript`. Non-initialized properties will not trigger any exception, as **they are invisible to the mapper**.

> Tip: Make sure you import `JsonObject` and `JsonProperty` from `json2typescript`.

#### First parameter: jsonProperty

The first parameter of `@JsonProperty` is the JSON object property name. It happens that the property names given by the
server are very ugly. Here you can map any json property name to the `User` property `name`. In our
case, `json["jsonPropertyName"]` gets mapped to `user.name`.

#### Second parameter (optional): conversionOption

The second parameter of `@JsonProperty` describes what happens when doing the mapping between JSON and TypeScript
objects. This parameter is optional; the default value is `Any` (which means no type check is done when the mapping
happens).

##### Use of expected type

If you would like that `json2typescript` performs an automatic type check according to given TypeScript types, you can
pass a type you expect. Follow the following guide when doing that:

- Make sure you pass the class name and not an instance of the class.
- In case of primitive types, you have to use the upper case names.
- In case of `any` type, import from `json2typescript` the class `Any`.

See the following cheat sheet for reference:

| Expected type             | TypeScript type       |
| ---                       | ---                   |
| String                    | string                |
| Number                    | number                |
| Boolean                   | boolean               | 
| User                      | User                  |
| Any                       | any                   |
|                           |                       | 
| [String]                  | string[]              | 
| [Number]                  | number[]              |
| [Boolean]                 | boolean[]             | 
| [User]                    | User[]                | 
| [Any]                     | any[]                 | 

At first, our array notation on the left looks odd. But this notation allows you to define even nested arrays. See the
examples at the end of this document for more info about nesting arrays.

##### Adding a custom converter

More advanced users may need to use custom converters. If you want
`json2typescript` to use your custom converter, you need to follow these steps:

- Write a converter class that implements `JsonCustomConvert<T>` where
  `<T>` is the type resulting in the TypeScript class.
- Make sure you add the `@JsonConverter` decorator to this class (see next chapter how).
- Pass your converter class as second param in the `@JsonProperty` decorator

Assume you would like to transform `1893-11-15` (string from JSON) to a TypeScript
`Date` instance, then you would write a class `DateConverter` (see next chapter how)
and pass it as second param in `@JsonProperty` as below:

```typescript
@JsonObject("User")
export class User {
    @JsonProperty("birthdate", DateConverter)
    birthdate: Date = new Date();
}
```

#### Third parameter (optional): convertingMode

The third parameter of `@JsonProperty` determines how nullable property types should be serialized and deserialized.
Nullable types are either missing (in JSON), undefined (in TypeScript) or null (both). This parameter is optional; the
default value is `PropertyConvertingMode.MAP_NULLABLE`.

See also the property `propertyConvertingMode` of the `JsonConvert` instance.

The values should be used as follows:

- `PropertyConvertingMode.MAP_NULLABLE`: the mapper is applied, type is checked
- `PropertyConvertingMode.IGNORE_NULLABLE`: the mapper is not applied if the property is missing, undefined or null; the
  property is not added to the result
- `PropertyConvertingMode.PASS_NULLABLE`: the mapper is not applied if the property is missing, undefined or null; the
  property is added with its value to the result

> Tip: Make sure you import the `ENUM` `PropertyConvertingMode` when assigning a value to this property.

##### Handling null, undefined and absent values

Be careful when handling special values as `null`, `undefined` and `absent` properties.

By default, `json2typescript` throws an exception if a decorated class property cannot be found in the given JSON when
deserializing. If you set the third parameter to `IGNORE_NULLABLE` or `PASS_NULLABLE`, there will be no exception when
it is missing. The type of a property will only be checked if the property is present in the JSON and not `undefined`
or `null`.

The global setting of `valueCheckingMode` determines whether you want to allow `null` values for objects or properties.
We recommend to use the most strict option and also set your `TypeScript` compiler to the strict mode.

The following table explains the difference between the three property converting modes:

| **ALLOW_NULL** | `serialize(null)` | `serialize(undefined)` | `deserialize(null)` | `deserialize(undefined)` |
| ---                         | ---               | ---                    |  ---                | --- |
| `MAP_NULLABLE`              | `null` | error | `null` | error |
| `IGNORE_NULLABLE`           | `undefined` (missing) | `undefined` (missing) | default value | default value |
| `PASS_NULLABLE`             | `null` | `undefined` (missing) | `null` | `undefined` |
| |
| **DISALLOW_NULL** | `serialize(null)` | `serialize(undefined)` | `deserialize(null)` | `deserialize(undefined)` |
| `MAP_NULLABLE`              | error | error | error | error |
| `IGNORE_NULLABLE`           | `undefined` (missing) | `undefined` (missing) | default value | default value |
| `PASS_NULLABLE`             | `null` | `undefined` (missing) | `null` | `undefined` |

As shown in this table, a property with the default setting `MAP_NULLABLE` is never allowed to be `undefined` (or
missing). The `valueCheckingMode` determines, whether `null` is allowed.

> Tip: If you want `undefined` to be treated in the same way as `null` values, you may set the instance `mapUndefinedToNull` property to `true`.

#### Important notes

* Make sure you define the expected type as accurate as possible, even if you expect primitive types.
* By default, casting primitives into other primitives is not allowed. Check the public properties below in this
  document to change this behaviour.
* By default, primitives are not allowed to be null. Check the public properties below in this document to change this.
* If you don't know the type, you may use `Any` as expected type. You may also omit the second parameter
  of `@JsonProperty`.

#### More about the array syntax

* You can allow arrays by using the bracket notation combined with the types as seen above. For example: `[String]` for
  a string array
* Mixing arrays is allowed. For example: `[String, Number]` for an array where the first entry is a string, the second
  is a number.
* If the real array is longer than indicated here, the last type will be forced to the rest of the array entries (
  above: `Number`).
* This means, `[String, Number]` is equivalent to `[String, Number, Number]` and so on.
* Nesting arrays and objects are allowed. For example: `[[String, Number], User]`.
* This is equivalent to `[[String, Number, Number], User, User]` and so on.
* As further example, `[[String]]` is equal to `[[String],[String]]` which is equal
  to  `[[String,String], [String,String]]` and so on.
* If an array has less elements as given in the expected type, no exception is thrown.
* For example, if we define `[String]` or the equivalent `[String, String]` no exception is thrown - even if the JSON
  gives us an empty array.

> Tip: See the examples at the end of this document for advanced examples for nesting arrays.

### Custom converter decorators

In some cases, you may need to make custom conversion between JSON objects and TypeScript objects. You can define custom
converters like this:

```typescript
@JsonConverter
class DateConverter implements JsonCustomConvert<Date> {
    serialize(date: Date): any {
        return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    }

    deserialize(date: any): Date {
        return new Date(date);
    }
}
```

> Tip: Make sure that you import `JsonConverter` from `json2typescript`. Also don't forget to use the same type between the brackets `<>`, as the `serialize()` param and `deserialize()` return value.

Assume that in your JSON you have a date in a standardized format, such as `2017-07-19 10:00:00`. You could use the
custom converter class above to make sure it is stored as a real TypeScript `Date` in your class. For your property, you
simply have use the `@JsonProperty` decorator as follows:

```typescript
@JsonObject("User")
export class User {
    @JsonProperty("date", DateConverter)
    date: Date = new Date();
}
```

With this approach, you will achieve that your property `date` is going to be a real instance of `Date`.

## JsonConvert class properties and methods

### Public properties

#### Operation mode

`(number) JsonConvert.operationMode`

Determines how the JsonConvert class instance should operate.

You may assign three different values:

- `OperationMode.DISABLE`: json2typescript will be disabled, no type checking or mapping is done
- `OperationMode.ENABLE`: json2typescript is enabled, but only errors are logged
- `OperationMode.LOGGING`: json2typescript is enabled and detailed information is logged

The default value is `OperationMode.ENABLE`. It will only print errors to the console and is suited for production.

In some cases, you might consider disabling `json2typescript` in production by setting the `OperationMode.DISABLE` flag.
This only works in case you only use plain objects without functionality and no mapping. However,
disabling `json2typescript` might give you a performance advantage in heavy projects.

In case you have issues to find bugs, you can enable additional logging by setting the `OperationMode.LOGGING` flag.
Please note that every serializing and deserializing is heavily logged to the console and will make your application
slower. Never use this flag in production.

> Tip: Make sure you import the `ENUM` `OperationMode` when assigning a value to this property.

#### Value checking mode

`(number) JsonConvert.valueCheckingMode`

Determines which types are allowed to be null in the deserialization. You may assign three different values:

* `ValueCheckingMode.ALLOW_NULL`: All given values can be null
* `ValueCheckingMode.ALLOW_OBJECT_NULL`: Objects can be null, but primitive types cannot be null
* `ValueCheckingMode.DISALLOW_NULL`: No null values are tolerated

The default is `ValueCheckingMode.ALLOW_OBJECT_NULL`.

> Tip: Make sure you import the `ENUM` `ValueCheckingMode` when assigning a value to this property.

> Tip: The TypeScript documentation suggests to avoid null values. Compile your TypeScript code with `strictNullChecks=true` and set the `valueCheckingMode` to disallow null values. If your API returns `null` in some cases, simply mark these properties as optional in the corresponding `JsonProperty` decorator to avoid errors on runtime.

#### Map undefined to null

`(number) JsonConvert.mapUndefinedToNull`

Determines whether a missing or undefined property value should be considered as null or not.

If true, a missing JSON value will be added and set as null before deserialization. For serialization, undefined values
will be set to null before serialization.

> Note: ValueCheckingMode and PropertyConvertingMode determine whether an error will be thrown during serialization or deserialization.

#### Ignore primitive checks

`(bool) JsonConvert.ignorePrimitiveChecks`

Determines whether primitive types should be checked. If true, it will be allowed to assign primitive to other primitive
types.

The default is `false`.

#### Property matching rule

`(number) JsonConvert.propertyMatchingRule`

Determines the rule of how JSON properties shall be matched with class properties during deserialization. You may assign
the following two values:

* `PropertyMatchingRule.CASE_STRICT`: JSON properties need to match exactly the names in the decorators
* `PropertyMatchingRule.CASE_INSENSITIVE`: JSON properties need to match names in the decorators, but names they are not
  case sensitive

The default is `PropertyMatchingRule.CASE_STRICT`.

#### Property converting mode

`(number|undefined) JsonConvert.propertyConvertingMode`

Determines how nullable property types should be serialized and deserialized. Nullable types are either missing (in
JSON), undefined (in TypeScript) or null (both).

If the propertyConvertingMode has a non-undefined value, it overrides the individual settings of every property. See
also the third parameter of the `@JsonProperty` decorator.

The values should be used as follows:

- `PropertyConvertingMode.MAP_NULLABLE`: the mapper is applied, type is checked
- `PropertyConvertingMode.IGNORE_NULLABLE`: the mapper is not applied if the property is missing, undefined or null; the
  property is
    * not added to the result
- `PropertyConvertingMode.PASS_NULLABLE`: the mapper is not applied if the property is missing, undefined or null; the
  property is
    * added with its value to the result

The default is `PropertyMatchingRule.MAP_NULLABLE`.

> Note: This property is usually only temporarily set and should be used with caution.
> It replaces the deprecated property `ignoreRequiredCheck`.

#### Use discriminator

`(bool) JsonConvert.useDiscriminator`

Determines if discriminators should be used.
If this option is set to true, all registered classes will be serialized with an additional discriminator property (default: "$type"), which has the key of the class (given in the @JsonObject decorator) as value. 
When deserializing an object containing the discriminator property, json2typescript will attempt to automatically instantiate the correct type (by comparing the value of the discriminator property with the registered classes).

The default is `false`.

> Note: At the end of this document you may find an example on how to use the discriminator feature.

#### Discriminator property name

`(string) JsonConvert.discriminatorPropertyName`

Defines the name of the discriminator property.

The default is `"$type"`.


### Public methods

`json2typescript` allows you to map JSON objects (or arrays) to TypeScript objects (or arrays) and vice versa.

#### Serializing (TypeScript to JSON)

`(any|any[]) serialize<T extends object, U extends object = {}>(data: T | T[], classReference?: { new(): U })`

Tries to serialize a TypeScript object or array of objects to JSON.

The first parameter must be a TypeScript object or array, the second parameter is the optional class reference.

If you provide only one parameter, the class for serialization is inferred automatically. For example, if you
call `jsonConvert.serialize(user)` where `user` is an instance of the class `User`, `json2typescript` will automatically
use this class for serialization.

By providing two parameters, it will override the class for serialization. For example, this allows you to
call `jsonConvert.serialize(userObject, User)` where `userObject` is just a plain TypeScript `any` object.

The returned value will be `any` object or an array of `any` objects.

> Tip: The return value is not a string. In case you need a string as result, use `JSON.stringify()` after calling the serialize method.

You may optionally provide a class constructor to use the `@JsonProperty` mappings defined for that class to serialize
the data object(s), instead of mappings defined on the data class. Note that if the data is an array, the mappings from
the constructor class are used for *all* elements in the array. If no constructor is provided, the mappings from the
data object class are used to serialize the data object(s).

> Tip: This feature is helpful if you need to serialize an object that was not created using a class constructor, or if you want to serialize a subclass with only the properties of the superclass.

#### Deserializing (JSON to TypeScript)

`(T | T[]) deserialize<T extends object>(json: any, classReference: { new(): T })`

Tries to deserialize given JSON to a TypeScript object or array of objects.

The first parameter must be a Typescript object or array, the second parameter is the class reference.

The returned value will be an instance or an array of instances of the given class reference.

> Tip: The param `json` must not be a string, but an `object` or an `array`. Use `JSON.parse()` before applying the deserialize method in case you have a json string.

#### Registering and unregistering classes

`void registerClasses(...classReferences: { new(): any }[])`

Registers a list of classes to be used in the discriminator feature.

`void ungisterClasses(...classReferences: { new(): any }[])`

Unregisters a list of classes from the discriminator feature.

`void unregisterAllClasses()`

Unregisters all classes from the discriminator feature.

> Note: You only need to register and unregister classes if you use the discriminator feature. Otherwise, these methods are without any effect.

#### Other methods

The methods `serialize()` and `deserialize()` will automatically detect the dimension of your param (either object or
array). In case you would like to force `json2typescript` to use a specific way, you can use the following methods
instead:

- `(any) serializeObject<T extends object, U extends object = {}>(data: T, classReference?: { new(): U })`
- `(any[]) serializeArray<T extends object, U extends object = {}>(dataArray: T[], classReference?: { new(): U })`
- `(T) deserializeObject<T extends object>(jsonObject: any, classReference: { new(): T })`
- `(T[]) deserializeArray<T extends object>(jsonArray: any[], classReference: { new(): T })`



---

# Advanced strategies

In this section you will find additional examples.

## Nesting arrays

It is heavily discouraged to use nested arrays and use different types in a JSON API. If you need them anyway, here is
how you have to define the types:

### 1) Nested arrays with same type

In the following example, `jsonKeyOfWeirdKeywords` is a key in the JSON object defined like this:

```JSON
{
  "jsonKeyOfWeirdKeywords": [
    [
      "Hello",
      "World"
    ],
    [
      "Bye",
      "Earth"
    ]
  ]
}
```

As we have an array of array of strings, you can define the expected type like this:

```typescript
@JsonObject("User")
export class User {
    @JsonProperty("jsonKeyOfWeirdKeywords", [[String, String], [String, String]])
    keywords: (string[])[] = [];
}
```

> Tip: In our syntax, `[[String, String], [String, String]]` is equivalent to `[[String], [String]]` and `[[String]]`. That is because the last type in an array will be automatically repeated as much as needed.

### 2) Nested array with mixed depth and type

In the following example, `JSONKeyOfWeirdKeywords` is a key in the JSON object defined like this:

```JSON
{
  "jsonKeyOfWeirdKeywords": [
    [
      "FC",
      "Basel"
    ],
    1893
  ]
}
```

You can define the expected type in your class like this:

```typescript
@JsonObject("User")
export class User {
    @JsonProperty("jsonKeyOfWeirdKeywords", [[String, String], Number])
    keywords: (string[] | number)[] = [];
}
```

> Tip: In our syntax, `[[String, String], Number]` is equivalent to `[[String], Number]`.

## Automatic instantiation using the discriminator feature

If your server adds a discriminator property to every JSON object, `json2typescript` is able to automatically instantiate objects.

First, set up the discriminator feature for a class, for example

```typescript
@JsonObject("app.example.User")
export class User {
    @JsonProperty("name", String)
    name: string = "";
}
```

Now, set up a `JsonConvert` to enable the discriminator feature and activate it for the classes you like:

```typescript
// Set up json convert
let jsonConvert: JsonConvert = new JsonConvert();
jsonConvert.useDiscriminator = true; // enable the discriminator
jsonConvert.discriminatorPropertyName = "$type"; // this is the property name
jsonConvert.registerClasses(User); // register all classes

// Assume the following JSON object coming from your server
const jsonObject: any = {
    "name": "Walter",
    "$type": "app.example.User" // the value of $type matches the @JsonObject decorator above
}

// This is how you would traditionally map an object
// But we have enabled the discriminator functionality and registered the User class
// In that case, the second parameter (User) here is ignored
const user1: User = jsonConvert.deserialize(jsonObject, User);

// But now you may automatically map it thanks to the $type property
const user2: User = jsonConvert.deserialize<User>(jsonObject);
```

> Note: This feature is particularly useful when doing dynamic mapping. 
> Otherwise, you just may provide the type yourself (as done above with `user1`) and disable the discriminator feature.

A real-world example for the discriminator feature is the mapping of child classes.

Assume that you might have two classes `AdminUser` and `NormalUser` that inherit from `User`. 
The web client sometimes cannot know the type in advance. 
If you use the discriminator feature, the server can define the type in the JSON and `json2typescript` will properly instantiate the desired class.
This means, your property can be safely declared in TypeScript as union type of `AdminUser | NormalUser` instead of `User`.

> Warning: If you enable the discriminator feature and try to deserialize a JSON object to a registered class instance, the second parameter of the `deserialize` methods is always ignored.



---

# Tools

## Class decorator generator

Since version 1.4, `json2typescript` requires the `@JsonObject("ClassName")` decorator in front of the TypeScript class
definition. GitHub user `tlmurphy` created a Python script that automatically generates the decorator with the original
class name as parameter.

More: https://gist.github.com/tlmurphy/71b58c71e594899120da365159d7d40d

---

# Contributors

This NPM package was originally created in 2016 by **Andreas Aeschlimann**, founder of and software architect at **AppVision GmbH**.

## Special thanks

You are welcome to report issues and discuss enhancements to make this package even more useful. Thanks for the input
and all the pull requests from the community!
