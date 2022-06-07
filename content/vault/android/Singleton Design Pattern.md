#cs240 
When you want to have only one instance of an object in all of your code, you define its constructor as private, and create a public static getInstance method.
The *single* instance is put into a private static variable. 

	public class DataCache {
		private static DataCache instance;
		
		public static DataCache getInstance() {
			if(instance == null) {
				instance = new DataCache();
				}
			
				return instance;
			}
		
		private DataCache(){
		
		}
	}