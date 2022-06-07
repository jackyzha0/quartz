#cs240 

Sometimes we need to take an object as a parameter, and we want to build the method on the spot.

	interface Runnable {
		
		void run();
	}
	
	void someMethod(Runnable r) {
		...
		r.run();
		...
	}
	
So we might want to do it like this:

	x.someMethod(new Runnable() {
		public run() {
			// do your thing
		}
	});
	
but instead, use a **lambda**:

	x.someMethod(() -> {
		// do some stuff
	});