#cs240  

Buttons and other Listeners are defined in the [[Android Studio#AndroidManifest xml]], and are usually implemented using an anonymous [[inner classes]]. In that, you must define an onClick method. 

	myButton = Button findViewById(R.id.true_button);
	myButton.setOnClickListener(new View.OnClickListener{
		// now define the new OnClickListener class
		@Override
		public void OnClick(View v){
			checkAnswer(true);// this method to be defined further along in the code
		}
	})
	
Of course this might be implemented more concisely using the [[lambda]].

	myButton.setOnClickListener((v) -> { checkAnswer(false); });