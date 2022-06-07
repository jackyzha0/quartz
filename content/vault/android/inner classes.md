
#cs240 

inner class - when you define a class inside of another class or method.
*yes* you can do it inside of a method. in which case it's called a **local** inner class.
when you put **static** on the inner class, it becomes independent of any particular implementation of the class. 
* it cannot access members of the outer class.
* you can even create an *anonymous* inner class
	
		return new Iterator() {
		private variable or whatever;
			public boolean hasNext() {

			}
		}

