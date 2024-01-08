https://selenium-python.readthedocs.io/locating-elements.html#locating-elements


# 4. Locating Elements[](https://selenium-python.readthedocs.io/locating-elements.html#locating-elements "Link to this heading")

There are various strategies to locate elements in a page. You can use the most appropriate one for your case. Selenium provides the following method to locate elements in a page:

- find_element
    

**To find multiple elements (these methods will return a list):**

- find_elements
    

Example usage:

from selenium.webdriver.common.by import By

driver.find_element(By.XPATH, '//button[text()="Some text"]')
driver.find_elements(By.XPATH, '//button')

The attributes available for the By class are used to locate elements on a page. These are the attributes available for By class:

ID = "id"
NAME = "name"
XPATH = "xpath"
LINK_TEXT = "link text"
PARTIAL_LINK_TEXT = "partial link text"
TAG_NAME = "tag name"
CLASS_NAME = "class name"
CSS_SELECTOR = "css selector"

The ‘By’ class is used to specify which attribute is used to locate elements on a page. These are the various ways the attributes are used to locate elements on a page:

find_element(By.ID, "id")
find_element(By.NAME, "name")
find_element(By.XPATH, "xpath")
find_element(By.LINK_TEXT, "link text")
find_element(By.PARTIAL_LINK_TEXT, "partial link text")
find_element(By.TAG_NAME, "tag name")
find_element(By.CLASS_NAME, "class name")
find_element(By.CSS_SELECTOR, "css selector")

If you want to locate several elements with the same attribute replace find_element with find_elements.

## 4.1. Locating by Id[](https://selenium-python.readthedocs.io/locating-elements.html#locating-by-id "Link to this heading")

Use this when you know the id attribute of an element. With this strategy, the first element with a matching id attribute will be returned. If no element has a matching id attribute, a `NoSuchElementException` will be raised.

For instance, consider this page source:

<html>
 <body>
  <form id="loginForm">
   <input name="username" type="text" />
   <input name="password" type="password" />
   <input name="continue" type="submit" value="Login" />
  </form>
 </body>
</html>

The form element can be located like this:

login_form = driver.find_element(By.ID, 'loginForm')

## 4.2. Locating by Name[](https://selenium-python.readthedocs.io/locating-elements.html#locating-by-name "Link to this heading")

Use this when you know the name attribute of an element. With this strategy, the first element with a matching name attribute will be returned. If no element has a matching name attribute, a `NoSuchElementException` will be raised.

For instance, consider this page source:

<html>
 <body>
  <form id="loginForm">
   <input name="username" type="text" />
   <input name="password" type="password" />
   <input name="continue" type="submit" value="Login" />
   <input name="continue" type="button" value="Clear" />
  </form>
</body>
</html>

The username & password elements can be located like this:

username = driver.find_element(By.NAME, 'username')
password = driver.find_element(By.NAME, 'password')

This will give the “Login” button as it occurs before the “Clear” button:

continue = driver.find_element(By.NAME, 'continue')

## 4.3. Locating by XPath[](https://selenium-python.readthedocs.io/locating-elements.html#locating-by-xpath "Link to this heading")

XPath is the language used for locating nodes in an XML document. As HTML can be an implementation of XML (XHTML), Selenium users can leverage this powerful language to target elements in their web applications. XPath supports the simple methods of locating by id or name attributes and extends them by opening up all sorts of new possibilities such as locating the third checkbox on the page.

One of the main reasons for using XPath is when you don’t have a suitable id or name attribute for the element you wish to locate. You can use XPath to either locate the element in absolute terms (not advised), or relative to an element that does have an id or name attribute. XPath locators can also be used to specify elements via attributes other than id and name.

Absolute XPaths contain the location of all elements from the root (html) and as a result are likely to fail with only the slightest adjustment to the application. By finding a nearby element with an id or name attribute (ideally a parent element) you can locate your target element based on the relationship. This is much less likely to change and can make your tests more robust.

For instance, consider this page source:

<html>
 <body>
  <form id="loginForm">
   <input name="username" type="text" />
   <input name="password" type="password" />
   <input name="continue" type="submit" value="Login" />
   <input name="continue" type="button" value="Clear" />
  </form>
</body>
</html>

The form elements can be located like this:

login_form = driver.find_element(By.XPATH, "/html/body/form[1]")
login_form = driver.find_element(By.XPATH, "//form[1]")
login_form = driver.find_element(By.XPATH, "//form[@id='loginForm']")

1. Absolute path (would break if the HTML was changed only slightly)
    
2. First form element in the HTML
    
3. The form element with attribute id set to loginForm
    

The username element can be located like this:

username = driver.find_element(By.XPATH, "//form[input/@name='username']")
username = driver.find_element(By.XPATH, "//form[@id='loginForm']/input[1]")
username = driver.find_element(By.XPATH, "//input[@name='username']")

1. First form element with an input child element with name set to username
    
2. First input child element of the form element with attribute id set to loginForm
    
3. First input element with attribute name set to username
    

The “Clear” button element can be located like this:

clear_button = driver.find_element(By.XPATH, "//input[@name='continue'][@type='button']")
clear_button = driver.find_element(By.XPATH, "//form[@id='loginForm']/input[4]")

1. Input with attribute name set to continue and attribute type set to button
    
2. Fourth input child element of the form element with attribute id set to loginForm
    

These examples cover some basics, but in order to learn more, the following references are recommended:

- [W3Schools XPath Tutorial](https://www.w3schools.com/xml/xpath_intro.asp)
    
- [W3C XPath Recommendation](http://www.w3.org/TR/xpath)
    
- [XPath Tutorial](http://www.zvon.org/comp/r/tut-XPath_1.html) - with interactive examples.
    

Here is a couple of very useful Add-ons that can assist in discovering the XPath of an element:

- [xPath Finder](https://addons.mozilla.org/en-US/firefox/addon/xpath_finder) - Plugin to get the elements xPath.
    
- [XPath Helper](https://chrome.google.com/webstore/detail/hgimnogjllphhhkhlmebbmlgjoejdpjl) - for Google Chrome
    

## 4.4. Locating Hyperlinks by Link Text[](https://selenium-python.readthedocs.io/locating-elements.html#locating-hyperlinks-by-link-text "Link to this heading")

Use this when you know the link text used within an anchor tag. With this strategy, the first element with the link text matching the provided value will be returned. If no element has a matching link text attribute, a `NoSuchElementException` will be raised.

For instance, consider this page source:

<html>
 <body>
  <p>Are you sure you want to do this?</p>
  <a href="continue.html">Continue</a>
  <a href="cancel.html">Cancel</a>
</body>
</html>

The continue.html link can be located like this:

continue_link = driver.find_element(By.LINK_TEXT, 'Continue')
continue_link = driver.find_element(By.PARTIAL_LINK_TEXT, 'Conti')

## 4.5. Locating Elements by Tag Name[](https://selenium-python.readthedocs.io/locating-elements.html#locating-elements-by-tag-name "Link to this heading")

Use this when you want to locate an element by tag name. With this strategy, the first element with the given tag name will be returned. If no element has a matching tag name, a `NoSuchElementException` will be raised.

For instance, consider this page source:

<html>
 <body>
  <h1>Welcome</h1>
  <p>Site content goes here.</p>
</body>
</html>

The heading (h1) element can be located like this:

heading1 = driver.find_element(By.TAG_NAME, 'h1')

## 4.6. Locating Elements by Class Name[](https://selenium-python.readthedocs.io/locating-elements.html#locating-elements-by-class-name "Link to this heading")

Use this when you want to locate an element by class name. With this strategy, the first element with the matching class name attribute will be returned. If no element has a matching class name attribute, a `NoSuchElementException` will be raised.

For instance, consider this page source:

<html>
 <body>
  <p class="content">Site content goes here.</p>
</body>
</html>

The “p” element can be located like this:

content = driver.find_element(By.CLASS_NAME, 'content')

## 4.7. Locating Elements by CSS Selectors[](https://selenium-python.readthedocs.io/locating-elements.html#locating-elements-by-css-selectors "Link to this heading")

Use this when you want to locate an element using [CSS selector](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Selectors) syntax. With this strategy, the first element matching the given CSS selector will be returned. If no element matches the provided CSS selector, a `NoSuchElementException` will be raised.

For instance, consider this page source:

<html>
 <body>
  <p class="content">Site content goes here.</p>
</body>
</html>

The “p” element can be located like this:

content = driver.find_element(By.CSS_SELECTOR, 'p.content')

[Sauce Labs has good documentation](https://saucelabs.com/resources/articles/selenium-tips-css-selectors) on CSS selectors.



# 5. Waits[](https://selenium-python.readthedocs.io/waits.html#waits "Link to this heading")

These days, most of the web apps are using AJAX techniques. When a page is loaded by the browser, the elements within that page may load at different time intervals. This makes locating elements difficult: if an element is not yet present in the DOM, a locate function will raise an ElementNotVisibleException exception. Using waits, we can solve this issue. Waiting provides some slack between actions performed - mostly locating an element or any other operation with the element.

Selenium Webdriver provides two types of waits - implicit & explicit. An explicit wait makes WebDriver wait for a certain condition to occur before proceeding further with execution. An implicit wait makes WebDriver poll the DOM for a certain amount of time when trying to locate an element.

## 5.1. Explicit Waits[](https://selenium-python.readthedocs.io/waits.html#explicit-waits "Link to this heading")

An explicit wait is a code you define to wait for a certain condition to occur before proceeding further in the code. The extreme case of this is time.sleep(), which sets the condition to an exact time period to wait. There are some convenience methods provided that help you write code that will wait only as long as required. WebDriverWait in combination with ExpectedCondition is one way this can be accomplished.

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

driver = webdriver.Firefox()
driver.get("http://somedomain/url_that_delays_loading")
try:
    element = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.ID, "myDynamicElement"))
    )
finally:
    driver.quit()

In the code above, Selenium will wait for a maximum of 10 seconds for an element matching the given criteria to be found. If no element is found in that time, a TimeoutException is thrown. By default, WebDriverWait calls the ExpectedCondition every 500 milliseconds until it returns success. ExpectedCondition will return true (Boolean) in case of success or not null if it fails to locate an element.

**Expected Conditions**

There are some common conditions that are frequently of use when automating web browsers. Listed below are the names of each. Selenium Python binding provides some [convenience methods](http://selenium-python.readthedocs.io/api.html#module-selenium.webdriver.support.expected_conditions) so you don’t have to code an expected_condition class yourself or create your own utility package for them.

- title_is
    
- title_contains
    
- presence_of_element_located
    
- visibility_of_element_located
    
- visibility_of
    
- presence_of_all_elements_located
    
- text_to_be_present_in_element
    
- text_to_be_present_in_element_value
    
- frame_to_be_available_and_switch_to_it
    
- invisibility_of_element_located
    
- element_to_be_clickable
    
- staleness_of
    
- element_to_be_selected
    
- element_located_to_be_selected
    
- element_selection_state_to_be
    
- element_located_selection_state_to_be
    
- alert_is_present
    

from selenium.webdriver.support import expected_conditions as EC

wait = WebDriverWait(driver, 10)
element = wait.until(EC.element_to_be_clickable((By.ID, 'someid')))

The expected_conditions module contains a set of predefined conditions to use with WebDriverWait.

**Custom Wait Conditions**

You can also create custom wait conditions when none of the previous convenience methods fit your requirements. A custom wait condition can be created using a class with __call__ method which returns False when the condition doesn’t match.

class element_has_css_class(object):
  """An expectation for checking that an element has a particular css class.

  locator - used to find the element
  returns the WebElement once it has the particular css class
  """
  def __init__(self, locator, css_class):
    self.locator = locator
    self.css_class = css_class

  def __call__(self, driver):
    element = driver.find_element(*self.locator)   # Finding the referenced element
    if self.css_class in element.get_attribute("class"):
        return element
    else:
        return False

# Wait until an element with id='myNewInput' has class 'myCSSClass'
wait = WebDriverWait(driver, 10)
element = wait.until(element_has_css_class((By.ID, 'myNewInput'), "myCSSClass"))

Note

**polling2 Library**

You may also consider using [polling2](https://polling2.readthedocs.io/en/latest/examples.html#polling-for-selenium-webdriver-elements) library which you need to install separately.

## 5.2. Implicit Waits[](https://selenium-python.readthedocs.io/waits.html#implicit-waits "Link to this heading")

An implicit wait tells WebDriver to poll the DOM for a certain amount of time when trying to find any element (or elements) not immediately available. The default setting is 0 (zero). Once set, the implicit wait is set for the life of the WebDriver object.

from selenium import webdriver

driver = webdriver.Firefox()
driver.implicitly_wait(10) # seconds
driver.get("http://somedomain/url_that_delays_loading")
myDynamicElement = driver.find_element_by_id("myDynamicElement")



