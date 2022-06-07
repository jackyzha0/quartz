Family Map Login Specification
________________


To help you get started early on the Family Map Client project, you are required to implement and pass off the Family Map login/register functionality on or before the published due date. Specifically, you should do the following:


1. Create your Family Map project in Android Studio.


2. Create your Main Activity class (see the Family Map specification for details on Main Activity).


3. Create your Login Fragment class including all of its GUI components (see the Family Map specification for more details on Login Fragment).


4. Embed your Login Fragment in your Main Activity’s GUI.


5. When the user clicks the “SIGN IN” button, create an AsyncTask that uses HttpURLConnection to send a login request to the Family Map server.


6. If the log in request fails, display an Android toast indicating that the log in failed.


7. If the log in request succeeds, create a second AsyncTask that uses HttpURLConnection to retrieve the logged-in user’s family data from the server. When the family data is received, display an Android toast containing the logged-in user’s first and last names.


8. Repeat steps 5 – 7 for new user registration and the “REGISTER” button.


9. Pass off your login/register functionality with a TA.