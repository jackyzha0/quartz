
Writing tests[](#writing-tests)

Writing a test is just like writing a function, with a few rules

- It needs to be in a file with a name like `xxx_test.go`
    

- The test function must start with the word `Test`
    

- The test function takes one argument only `t *testing.T`
    

- In order to use the `*testing.T` type, you need to `import "testing"`, like we did with `fmt` in the other file

```go
func TestHello(t *testing.T) {
	t.Run("saying hello to people", func(t *testing.T) {
		got := Hello("Chris")
		want := "Hello, Chris"
		assertCorrectMessage(t, got, want)
	})

	t.Run("empty string defaults to 'world'", func(t *testing.T) {
		got := Hello("")
		want := "Hello, World"
		assertCorrectMessage(t, got, want)
	})

}

func assertCorrectMessage(t testing.TB, got, want string) {
	t.Helper()
	if got != want {
		t.Errorf("got %q want %q", got, want)
	}
}
```
In your Go code, `t *testing.T` is used within your test function `TestHello` and the helper function `assertCorrectMessage` for several reasons related to writing tests in Go:

1. **Access to Testing Methods**: `t *testing.T` is a pointer to Go's testing framework's `T` type, which provides methods for controlling test execution and logging. By passing `t` into your test functions, you gain access to methods such as `t.Errorf`, `t.Fatalf`, `t.Run`, and `t.Helper`.

2. **Running Subtests**: The `t.Run` method allows you to define subtests or table-driven tests within your test function. This approach makes your tests more organized and can be useful for testing different scenarios or inputs for the same function. Each call to `t.Run` can be considered as a separate test case within the broader test function.

3. **Error Reporting and Logging**: The methods on `*testing.T` like `t.Errorf` are used for reporting errors. When you call `t.Errorf`, it logs the error message and marks the test as failed but continues execution. This is useful for running multiple checks within a single test and getting a report on all failures.

4. **Helper Function**: The `t.Helper` method in your `assertCorrectMessage` function is used to mark that function as a test helper. When this method is called, the function is skipped when reporting where an error occurred, making the error output more readable. It tells the test framework that the actual place of interest is where the helper function was called, not inside the helper function itself.

5. **Interface `testing.TB`**: In your `assertCorrectMessage` function, you use `testing.TB` instead of `*testing.T`. The `testing.TB` is an interface that is implemented by both `*testing.T` and `*testing.B` (where `B` is for benchmarks). Using `testing.TB` makes your helper function more flexible because it can be used with both testing and benchmarking.

In summary, `t *testing.T` and `testing.TB` are essential for structuring your tests, running subtests, reporting errors, and making your test code more maintainable and flexible in Go.


For helper functions, it's a good idea to accept a `testing.TB` which is an interface that `*testing.T` and `*testing.B` both satisfy, so you can call helper functions from a test, or a benchmark (don't worry if words like "interface" mean nothing to you right now, it will be covered later).

`t.Helper()` is needed to tell the test suite that this method is a helper. By doing this when it fails the line number reported will be in our _function call_ rather than inside our test helper. This will help other developers track down problems easier. If you still don't understand, comment it out, make a test fail and observe the test output. Comments in Go are a great way to add additional information to your code, or in this case, a quick way to tell the compiler to ignore a line. You can comment out the `t.Helper()` code by adding two forward slashes `//` at the beginning of the line. You should see that line turn grey or change to another color than the rest of your code to indicate it's now commented out.



### Check chapter 1 [here](https://quii.gitbook.io/learn-go-with-tests/go-fundamentals/hello-world)


[[Property Based Testing]]


[[examples in golang]] ==> can help you with test


# Benchmarking

https://quii.gitbook.io/learn-go-with-tests/go-fundamentals/iteration#benchmarking


run with test ==> `go test -bench=.`

Go's built-in testing toolkit features a [coverage tool](https://blog.golang.org/cover). Whilst striving for 100% coverage should not be your end goal, the coverage tool can help identify areas of your code not covered by tests. If you have been strict with TDD, it's quite likely you'll have close to 100% coverage anyway.

Try running

`go test -cover`

You should see

PASS

coverage: 100.0% of statements


Go does not let you use equality operators with slices. You _could_ write a function to iterate over each `got` and `want` slice and check their values but for convenience sake, we can use [`reflect.DeepEqual`](https://golang.org/pkg/reflect/#DeepEqual) which is useful for seeing if _any_ two variables are the same.



In Go, slices cannot be compared directly using the equality operator (`==`). This is because slices are reference types in Go, and comparing them directly would compare the references (addresses in memory), not the content of the slices. To compare the contents of two slices, you need to iterate over the elements and compare them individually, or use a convenience function like `reflect.DeepEqual` from the `reflect` package.

### Using `reflect.DeepEqual`

`reflect.DeepEqual` is a function that checks if two variables are deeply equal. It's a part of the `reflect` package in Go, which provides run-time reflection, allowing you to inspect and manipulate objects at run time. `reflect.DeepEqual` is useful for comparing complex types like slices, maps, structs, etc., where a simple `==` comparison is not possible or sufficient.

Here's an example of how you can use `reflect.DeepEqual` to compare two slices:

```go
package main

import (
    "fmt"
    "reflect"
)

func main() {
    slice1 := []int{1, 2, 3}
    slice2 := []int{1, 2, 3}
    slice3 := []int{4, 5, 6}

    fmt.Println("slice1 == slice2:", reflect.DeepEqual(slice1, slice2)) // true
    fmt.Println("slice1 == slice3:", reflect.DeepEqual(slice1, slice3)) // false
}
```

In this example, `reflect.DeepEqual` is used to compare `slice1` with `slice2` and `slice3`. It returns `true` when comparing `slice1` and `slice2` because their contents are identical, and `false` when comparing `slice1` and `slice3` as their contents differ.

### Writing Your Own Comparison Function

If you prefer not to use `reflect.DeepEqual` (for example, for performance reasons, as `reflect.DeepEqual` can be slower and more memory-intensive), you can write your own function to compare slices:

```go
package main

import "fmt"

func slicesEqual(a, b []int) bool {
    if len(a) != len(b) {
        return false
    }
    for i := range a {
        if a[i] != b[i] {
            return false
        }
    }
    return true
}

func main() {
    slice1 := []int{1, 2, 3}
    slice2 := []int{1, 2, 3}
    slice3 := []int{4, 5, 6}

    fmt.Println("slice1 == slice2:", slicesEqual(slice1, slice2)) // true
    fmt.Println("slice1 == slice3:", slicesEqual(slice1, slice3)) // false
}
```

This `slicesEqual` function first checks if the slices have the same length. If not, it returns `false`. Then it iterates over the slices, comparing each element. If any elements are different, it returns `false`. If all elements are the same, it returns `true`.

Using `reflect.DeepEqual` is more convenient and less error-prone, especially for complex types or deeply nested data structures. However, for simple cases or when performance is a concern, a custom comparison function may be more efficient.

## Table Driven Test in golang

Table-driven testing is a popular testing pattern in Go (Golang), particularly well-suited for scenarios where you want to run the same test logic across different inputs and expected outputs. This approach is efficient, readable, and makes it easy to add new test cases.

### Concept

In table-driven testing, you define a table (slice) of test cases. Each test case in the table is a struct that includes the input data for the test and the expected result. You then iterate over this slice, running the same test logic for each case.

This approach is especially useful for:

- Reducing code duplication.
- Making it easier to add new test cases.
- Improving test readability and maintenance.

### Example

Let's consider an example where we want to test a function `Add` that adds two integers.

```go
package main

import "testing"

// Add returns the sum of two integers
func Add(a, b int) int {
    return a + b
}

// TestAdd is a table-driven test for the Add function
func TestAdd(t *testing.T) {
    tests := []struct {
        name string
        a, b int
        want int
    }{
        {"add two positive numbers", 2, 3, 5},
        {"add positive and negative", 1, -1, 0},
        {"add two negative numbers", -1, -2, -3},
        // add more test cases here
    }

    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            got := Add(tt.a, tt.b)
            if got != tt.want {
                t.Errorf("Add(%d, %d) = %d; want %d", tt.a, tt.b, got, tt.want)
            }
        })
    }
}
```

### Explanation

- **Test Table**: The `tests` slice contains multiple test cases. Each case is defined by a struct with fields for inputs (`a` and `b`), the expected output (`want`), and a name (`name`) for the test case.
- **Iteration**: The `for _, tt := range tests` loop iterates over each test case.
- **Running the Test**: Inside the loop, `t.Run` is used to execute a subtest for each case. This allows each test case to be run independently, and it provides clearer test output, showing which cases pass or fail.
- **Assertions**: The actual function call (`Add(tt.a, tt.b)`) and the assertion (`if got != tt.want`) are inside the loop. If the function's output doesn't match the expected output, an error is reported with `t.Errorf`.

By using table-driven tests, you can easily see the different scenarios being tested and add new test cases by simply adding new entries to the `tests` slice. This pattern makes your tests more organized and easier to extend and maintain.


[[Dependency Injection]]
[[Mocking]]
[[Concurrency Testing in Golang]]

https://quii.gitbook.io/learn-go-with-tests/go-fundamentals/dependency-injection
https://quii.gitbook.io/learn-go-with-tests/go-fundamentals/mocking