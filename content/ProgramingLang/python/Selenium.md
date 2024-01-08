---
tags:
  - "#python"
  - test
  - selenium
---
```python
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By

driver = webdriver.Firefox()
driver.get("http://www.python.org")
assert "Python" in driver.title
elem = driver.find_element(By.NAME, "q")
elem.clear()
elem.send_keys("pycon")
elem.send_keys(Keys.RETURN)
assert "No results found." not in driver.page_source
driver.close()
```

[[Locating Elemetens in Selenium]]

Certainly! This script is a basic example of using Selenium with Python to automate web browsing, specifically for interacting with the Python.org website. Let's break it down step by step:

1. **Import Statements**:
    ```python
    from selenium import webdriver
    from selenium.webdriver.common.keys import Keys
    from selenium.webdriver.common.by import By
    ```
    - This imports the necessary modules from the Selenium package:
      - `webdriver` is used to control the browser.
      - `Keys` contains special keys for keyboard interaction.
      - `By` provides methods to locate items on a page (like by name, ID, etc.).

2. **Launching the Browser**:
    ```python
    driver = webdriver.Firefox()
    ```
    - This line creates an instance of the Firefox WebDriver. It will open a Firefox browser window when executed.

3. **Navigating to a Website**:
    ```python
    driver.get("http://www.python.org")
    ```
    - This command tells the WebDriver to navigate to the specified URL, in this case, `http://www.python.org`.

4. **Checking the Page Title**:
    ```python
    assert "Python" in driver.title
    ```
    - This line is a simple check (assertion) to confirm that the title of the page contains the word "Python". It's a way to ensure that the page has loaded correctly and is indeed the Python homepage.

5. **Finding an Element**:
    ```python
    elem = driver.find_element(By.NAME, "q")
    ```
    - This finds an element on the page with the name attribute "q" (which is the search box on the Python website).

6. **Interacting with the Element**:
    ```python
    elem.clear()
    ```
    - This clears any pre-existing text from the search box.

    ```python
    elem.send_keys("pycon")
    ```
    - This simulates typing "pycon" into the search box.

    ```python
    elem.send_keys(Keys.RETURN)
    ```
    - This simulates pressing the Enter key, which submits the search.

7. **Checking Page Contents**:
    ```python
    assert "No results found." not in driver.page_source
    ```
    - After searching, this line checks that the phrase "No results found." is not present in the page source, indicating that the search yielded results.

8. **Closing the Browser**:
    ```python
    driver.close()
    ```
    - Finally, this line closes the browser window.

This script demonstrates basic Selenium operations like opening a website, finding elements, interacting with them (like entering text and submitting forms), and performing simple checks. It's a foundational script for web automation and testing.



```python
import unittest
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By

class PythonOrgSearch(unittest.TestCase):

    def setUp(self):
        self.driver = webdriver.Firefox()

    def test_search_in_python_org(self):
        driver = self.driver
        driver.get("http://www.python.org")
        self.assertIn("Python", driver.title)
        elem = driver.find_element(By.NAME, "q")
        elem.send_keys("pycon")
        elem.send_keys(Keys.RETURN)
        self.assertNotIn("No results found.", driver.page_source)

    def tearDown(self):
        self.driver.close()

if __name__ == "__main__":
    unittest.main()
```

Sure, let's break down this Python script which is using the Selenium library along with the `unittest` framework for testing. The script is structured to test the functionality of searching on the Python.org website.

1. **Import Statements**:
    ```python
    import unittest
    from selenium import webdriver
    from selenium.webdriver.common.keys import Keys
    from selenium.webdriver.common.by import By
    ```
    - `unittest`: This module is Python's standard library for writing and running tests.
    - `webdriver`: This is part of Selenium, used to control the browser.
    - `Keys`: A Selenium module to simulate keyboard keys.
    - `By`: Used to locate elements within a page.

2. **Class Definition**:
    ```python
    class PythonOrgSearch(unittest.TestCase):
    ```
    - This line defines a test case class `PythonOrgSearch` that inherits from `unittest.TestCase`. This is the base class for all tests in `unittest`.

3. **setUp Method**:
    ```python
    def setUp(self):
        self.driver = webdriver.Firefox()
    ```
    - `setUp` is a special method in `unittest`. It is called before each test method starts. It's typically used to set up the environment before running the tests.
    - `self.driver = webdriver.Firefox()`: This line initializes the Firefox WebDriver and opens the Firefox browser. The `self.driver` variable is used to refer to the browser throughout the class.

4. **Test Method**:
    ```python
    def test_search_in_python_org(self):
    ```
    - This method, named `test_search_in_python_org`, is the actual test case. In `unittest`, any method that starts with `test` is considered a test case.
    - Inside this method, various steps are performed to conduct the test:
      - `driver.get("http://www.python.org")`: Opens the Python.org website.
      - `self.assertIn("Python", driver.title)`: Checks if "Python" is in the page title.
      - `elem = driver.find_element(By.NAME, "q")`: Finds the search box element.
      - `elem.send_keys("pycon")`: Types "pycon" in the search box.
      - `elem.send_keys(Keys.RETURN)`: Simulates pressing the Enter key to submit the search.
      - `self.assertNotIn("No results found.", driver.page_source)`: Ensures "No results found." is not present in the page source.

5. **tearDown Method**:
    ```python
    def tearDown(self):
        self.driver.close()
    ```
    - `tearDown` is another special method in `unittest`, called after each test method completes.
    - `self.driver.close()`: Closes the browser window.

6. **Running the Test**:
    ```python
    if __name__ == "__main__":
        unittest.main()
    ```
    - This conditional checks if the script is being run directly (as opposed to being imported as a module). If it is, it calls `unittest.main()`, which runs the test case (i.e., the `PythonOrgSearch` class).

This script is a basic example of a functional test: it automates a web browser to simulate a user searching for "pycon" on Python.org and checks that the search works as expected. The use of the `unittest` framework helps organize the test structure and provides easy-to-understand results.

# Drag and Drop

```python
element = driver.find_element(By.NAME, "source")
target = driver.find_element(By.NAME, "target")

from selenium.webdriver import ActionChains
action_chains = ActionChains(driver)
action_chains.drag_and_drop(element, target).perform()
```


## 3.6. Navigation: history and location[](https://selenium-python.readthedocs.io/navigating.html#navigation-history-and-location "Link to this heading")

Earlier, we covered navigating to a page using the “get” command ( `driver.get("http://www.example.com")`). As you’ve seen, WebDriver has a number of smaller, task-focused interfaces, and navigation is a useful task. To navigate to a page, you can use get method:

driver.get("http://www.example.com")

To move backward and forward in your browser’s history:

driver.forward()
driver.back()

Please be aware that this functionality depends entirely on the underlying driver. It’s just possible that something unexpected may happen when you call these methods if you’re used to the behavior of one browser over another.


## 3.7. Cookies[](https://selenium-python.readthedocs.io/navigating.html#cookies "Link to this heading")

Before moving to the next section of the tutorial, you may be interested in understanding how to use cookies. First of all, you need to be on the domain that the cookie will be valid for:

# Go to the correct domain
driver.get("http://www.example.com")

# Now set the cookie. This one's valid for the entire domain
cookie = {'name' : 'foo', 'value' : 'bar'}
driver.add_cookie(cookie)

# And now output all the available cookies for the current URL
driver.get_cookies()

