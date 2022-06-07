#cs240 
### Gradle (under the build directory)
 It's a lot like make. build.gradle is a config file, defining what gradle will do to build your app. 
 
### src directory
contains a java folder and a res folder. Res, short for resources, holds images and stuff that isn't a code file.
Res holds the .xml layout files as well. Every activity has one.
  
#### AndroidManifest.xml
Every app has it. It's the main configuration file. Every new activity has an entry there. The main activity is specified there, and the launcher is defined there.
- nested tree structure
- turns into java class with attributes at runtime (inflates the widget tree)
	- now the Activity object has a pointer to the root of the widget tree
- to interact with a widget (unit), you have to give it an id:
		`android:id="@+id/essay_text_view`
- Widget == View

##### Resource object "R"
`R.layout.activity_main
R.id.question_text_view`
each returns a simple integer that works as an id
It's a class that stores countless ids for resources. Colors, strings,  widgets, images, whatever.

#### values directory
strings.xml - put every hardcoded string there. It's good for supporting multiple languages.
colors.xml - name your hardcoded colors
styles.xml - package together certain settings for style

### Tests
There's a test folder, for tests that can run on your code independently, and an androidTest folder, for tests that depend on android libraries and need to be run in the emulator.

onCreate in your main activiy is like the main method.

### Logging 
[[Logger#Actual Logging]]
- you can filter for just error logs 
- writing your own logs looks like this:
		`Log.d("tag - MainActivity", msg - onCreate: before string manipulation");`
		
### Compatibility
AppCompat, AndroidX are both libraries for backwards compatability.

