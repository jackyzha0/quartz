[![npm version](https://img.shields.io/npm/v/ts-enum-util.svg)](https://www.npmjs.com/package/ts-enum-util)
[![Join the chat at https://gitter.im/ts-enum-util/Lobby](https://badges.gitter.im/ts-enum-util/Lobby.svg)](https://gitter.im/ts-enum-util/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Build Status](https://travis-ci.org/UselessPickles/ts-enum-util.svg?branch=master)](https://travis-ci.org/UselessPickles/ts-enum-util)
[![Coverage Status](https://coveralls.io/repos/github/UselessPickles/ts-enum-util/badge.svg?branch=master)](https://coveralls.io/github/UselessPickles/ts-enum-util?branch=master)

# ts-enum-util

Strictly typed utilities for working with TypeScript enums (and string/number literal union types).

NOTE: Be sure to read about supported TypeScript versions in the [Requirements](#requirements) section.

# Contents

<!-- TOC depthFrom:2 -->

-   [What is it?](#what-is-it)
    -   [Enum Wrapper Utilities](#enum-wrapper-utilities)
    -   [Enum Value Visitor/Mapper](#enum-value-visitormapper)
-   [Installation](#installation)
-   [Getting Started](#getting-started)
-   [Usage Documentation/Examples](#usage-documentationexamples)
-   [Requirements](#requirements)
-   [Why is the main export named `$enum`?](#why-is-the-main-export-named-enum)

<!-- /TOC -->

## What is it?

`ts-enum-util` provides type-safe utilities to improve the usefulness of TypeScript enums.
There are two major and distinct aspects to `ts-enum-util`.

### Enum Wrapper Utilities

A wrapper around an enum, or "enum-like object", that provides a variety of type-safe
utilities in terms of the run-time representation fo the enum's keys/values. Some
examples include:

-   Get a list of an enum's keys, values, or key/value pairs.
-   Look up values by key with run-time key validation and optional result defaulting.
-   Reverse lookup of keys by value (for string enums too!) with run-time value validation and optional result defaulting.
-   Run-time validation that a specified value or key is valid for a given enum, with compile-time type guards.
-   Treat an enum similar to an Array of key/value tuples.
-   Treat an enum similar to a Map of values.

All of these utilities are very specifically typed for each enum via generics and type inference.

### Enum Value Visitor/Mapper

A visitor pattern for processing a single value whose type is an enum, or union of
string/number literals. It's like a switch statement that forces you to implement
every possible case (including `null` or `undefined`, if relevant), avoiding bugs
because you forgot to handle one of the enum's values, or because the enum
definition was updated with a new value and you forgot to update existing code to
handle the new value.

The more generalized "visit" functionallity has you associate a different function
with each possible value of an enum or string/number literal union.
The appropriate function is executed (and its return value returned) based on
which value the argument is at run-time.

A streamlined "map" functionality has you simply associate values (of any type)
with each possible value of an enum or string/number literal union.
The appropriate mapped value is returned based on which value the argument is at run-time.

## Installation

Install via [NPM](https://www.npmjs.com/package/ts-enum-util):

```
npm i -s ts-enum-util
```

## Getting Started

Import `$enum`:

```ts
import { $enum } from "ts-enum-util";
```

Define an `enum`:

```ts
enum Color {
    R,
    G,
    B
}
```

Use `$enum()` as a function to access [Enum Wrapper Utilities](./docs/EnumWrapper.md) for your `enum`:

```ts
// type of "values": Color[]
// value of "values": [0, 1, 2]
const values = $enum(Color).getValues();
```

Use `$enum.visitValue()` or `$enum.mapValue()` to access [Enum Value Visitor/Mapper](./docs/EnumValueVisitor.md) functionality:

```ts
function doColorAction(color: Color): void {
    $enum.visitValue(color).with({
        [Color.R]: () => {
            window.alert("Red Alert!");
        },
        [Color.G]: () => {
            window.location = "http://google.com";
        },
        [Color.B]: () => {
            console.log("Blue");
        }
    });
}

function getColorLabel(color: Color | undefined): string {
    return $enum.mapValue(color).with({
        [Color.R]: "Red",
        [Color.G]: "Green",
        [Color.B]: "Blue",
        [$enum.handleUndefined]: "Unspecified"
    });
}
```

## Usage Documentation/Examples

To keep the size of the README under control, usage documentation and examples have
been split out to separate files:

-   [Enum Wrapper Utilities](./docs/EnumWrapper.md)
-   [Enum Value Visitor/Mapper](./docs/EnumValueVisitor.md)
    -   [Migration Guide: from `ts-string-visitor`](./docs/migration_from_ts-string-visitor.md)

## Requirements

-   _TypeScript 2.9+_: `ts-enum-util` is all about strictly type-safe utilities
    around TypeScript enums, so it would be much less useful in a plain JavaScript
    project. More specifically, TypeScript 2.9 included advancements in handling
    number literals as property names of object types, which is necessary for
    implementing some `ts-enum-util` functionality consistently for both string and
    number enum types.
    -   _Stuck with an older version of TypeScript_?
        -   For Value Visitor/Mapper functionality, check out `ts-string-visitor`
            ([npm](https://www.npmjs.com/package/ts-string-visitor),
            [github](https://github.com/UselessPickles/ts-string-visitor)). NOTE:
            numeric value visiting/mapping not supported!
        -   For Enum Wrapper
            functionality, check out v3 or v2 of `ts-enum-util`.
-   _ES6 Features_: The following ES6 features are used by `ts-enum-util`, so they
    must exist (either natively or via polyfill) in the run-time environment:
    -   `Map`
    -   `WeakMap`
    -   `Symbol`
    -   `Symbol.iterator`
    -   `Symbol.toStringTag`

## Why is the main export named `$enum`?

I wanted something short, simple, and easy to remember that was unlikely to conflict with anything else so that no one would have to alias it when importing it. By exporting a clear, memorable, and uniquely named "thing", this allows you to simply start writing code that uses `$enum` and most IDEs can take care of inserting the import { \$enum } from "ts-enum-util"; for you (either automatically, or with a quick keyboard shortcut).

I ended up using inspiration from the naming of jquery's `$()` function. Many javascript developers are familiar with jquery, and the fact that `$()` gives you a wrapper around a raw DOM element to expose additional/simplified functionality around the DOM element.

Similarly, `$enum()` gives you a wrapper around a raw enum to expose additional/simplified functionality around the enum.
