#cs240 #android 

Sometimes the back button in the app bar is for going to a *parent* activity, not just the last one. Define that in the AndroidManifest.xml:
	
	<activity
		name..
		label..
		android:parentActivityName=".ui.MainActivity"
		
Use the following code right after setting up the app bar:

	getSupportActionBar().setDisplayHomeAsUpEnabled(true);
	
To make sure that the main activity isn't restarted upon return, write the following in the main activity's manifest entry.

	<activity
		name...
		label...
		android:launchMode="singleTop">