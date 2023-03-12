---
title: "scope-resolution-operator"
tags: 
- cpp
- cosc-342
---

from chat gpt:
The dot `.` operator is used to access the members of an object instance, which includes both non-static and static members. When you use the dot `.` operator, the left-hand side of the operator must be an instance of a class.

On the other hand, the scope resolution operator `::` is used to access the members of a class or namespace, which can be static or non-static. When you use the `::` operator, the left-hand side of the operator must be the name of a class or namespace.

If the member you are accessing is a static member, then you must use the scope resolution operator `::`. If the member is a non-static member, then you must use the dot `.` operator with an instance of the class.
