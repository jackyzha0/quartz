---
public: true
tags:
  - dart
  - flutter
  - class
  - example
  - data
created: 2024-02-03
updated: 2024-02-25
---
``` Dart
class ClassName {
  String name;
  int followerCount;
  bool isFriend;
  Prayer({
    required this.name,
    required this.followerCount,
    required this.isFriend,
  });
```
___
This is a basic example of a data model. I usually use these as a template and make a file called something like `userDB.dart` and it's a file with a List (Array) of type  `ClassName` (or whatever the class is named) then you tell [[Flutter|Flutter]] to read the list.