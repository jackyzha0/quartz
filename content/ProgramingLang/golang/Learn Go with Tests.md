
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


[[examples in golang]]