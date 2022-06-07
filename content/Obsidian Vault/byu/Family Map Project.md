Keep UI code and Logic code in seperate classes or even packages, ideally.
[[Family Map Client Specifications]]

[[Widgets and Layouts used]]

# Activities and fragments
## MainActivity
Has 2 fragments, Map and login/register

Example code for switching between them:

	private void onCheckChanged() {
        FragmentManager fm = this.getSupportFragmentManager();

        if (checkBox.isChecked()) {
            // Remove the billingAddressFragment, because we no longer need it
            // (because the billing address is the same as the shipping address)

            fm.beginTransaction()
                .remove(billingAddressFragment)
                .commit();
        }
        else {
            // Create the billingAddressFragment, because the billing address is now
            // different than the shipping address

            //billingAddressFragment = AddressFragment.newInstance("BILLING ADDRESS");

            billingAddressFragment = new AddressFragment();
            Bundle args = new Bundle();
            args.putString(AddressFragment.ARG_TITLE, "BILLING ADDRESS");
            billingAddressFragment.setArguments(args);

            fm.beginTransaction()
                    .add(R.id.billingFrameLayout, billingAddressFragment)
                    .commit();
        }
    }

# Directory of model objects. 
The main model class: (It's a [[Singleton Design Pattern|singleton]])
- `Map<String`(id of person or event)`, Event/Person> variable;`
- settings object
- `List<String> eventTypes;`
- person object of the user
- list of each person's children
- Sets of the ids of each paternal and maternal ancestor of the user

Starting code from lecture:
	
	package model;
	
	public class DataCache {
		private static DataCache _instance = new DataCache();
		public static DataCache getInstance() {
			return _instance;
		}
		private Map<String, Person> people;
		private Map<String, Event> events;
		
		private DataCache(){ // private constructor because there can only be one
		}
	}
	
# Directory for Proxy
Starting/example code from lecture:

	package new;
	
	public LoginResult ServerProxy {
	
		public static String serverHostName; // variables gotten during login or registration screen
		pulic static Int serverPortNumber;
		
		public login(LoginRequest r) {
			// Serialize request as JSON styring
			// Make HTTP request to server 
			// Deserialize response body to LoginResult object
		}
		
		public RegisterResult register(RegisterRequest r){
			...
		}
		
		// other methods:
		// GetAllPeople
		// GetAllEvents
	}
	
Use the TicketToRide example code to see how to make HTTP requests. 
- http.setDoOutput() means tell whether there's a request body or not.

# Screen Rotation extra credit
Android will kill an activity upon reorientation, so we need to use a special method to persist some data that we may have been working on.

	@Override
	protected void onSaveInstance(Bundle savedInstanceState) {// a bundle is basically just a map
		super.onSaveInstanceState(savedInstanceState);
		Log.i(TAG, "onSaveInstanceState"); // just logging it, not necessary.
		savedInstanceState.putInt(DATA_CHOSEN, myIntegerData);
	}
	
Notice that the method that's called by the android system at the creation of an activity, `onCreate`, has a now familiar parameter:

	@Override
	protected void onCreate(Bundle savedInstanceState){ ... 
	
Within that method, you'll wanna check whether that state is null.

	if (savedInstanceState != null) {
		myIntegerData = savedInstanceState.getInt(DATA_CHOSEN, 0);
	}
	
Additionally, `super.onCreate(savedInstanceState)` let's your widgets in the ui save their data to the bundle.