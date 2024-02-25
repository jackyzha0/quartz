---
publish: true
created: 2024-02-03
updated: 2024-02-25
---
## `float` vs. `double`
The **precision** of a floating point value indicates how many digits the value can have after the decimal point. The precision of `float` is only six or seven decimal digits, while `double` variables have a precision of about 15 digits. Therefore it is safer to use `double` for most calculations.

## Getting the length of an array
If you use the `sizeof()` function it WILL return the byte size of the array. To combat this you simply divide the `sizeof()` by the `sizeof()` the array's type.

```c++
  int myNumbers[5] = {10, 20, 30, 40, 50};
  int arrayLength = sizeof(myNumbers) / sizeof(myNumbers[0]);
```

## Struct
A *[[struct|struct]]* is like a class. You can use it to store multiple types of data in one object.
```c++
  struct person

  {
    int age;
    string name;
  };
  
  person adam;
  adam.age = 21;
  adam.name = "adam";

  person marisol;
  marisol.age = 20;
  marisol.name = "marisol";
```

## Default args in function
You can use the argument `function(string varName = "Valuse")` to have a default value if no value is passed to the function.
```c++
void foodFunc(string food = "Milk")
{
  cout << food << "\n";
}

int main()
{
  foodFunc("Cake");
  foodFunc("Beef");
  foodFunc();
  return 0;
}
```