#cs240
Example file given from teacher's files and lecture:

	private static Logger logger;
	
	static { // static initializer block - sorta like a constructor for static members of a class
		try {
			initLog();
		}
		catch (IOException e){
			System.out.println("Could not initialize log: " + e.getMessage());
			e.printStackTrace();
			}
	}

You'll want an initLog function, to set the whole thing up

	private static void initLog() throws IOException {

        Level logLevel = Level.FINEST;

        logger = Logger.getLogger("tickettoride"); 
        logger.setLevel(logLevel);
        logger.setUseParentHandlers(false);\
	
### Actual Logging:
To log to the console:

        Handler consoleHandler = new ConsoleHandler();
        consoleHandler.setLevel(logLevel);
        consoleHandler.setFormatter(new SimpleFormatter());
        logger.addHandler(consoleHandler);
		
To log to a file:

        FileHandler fileHandler = new FileHandler("log.txt", false);
        fileHandler.setLevel(logLevel);
        fileHandler.setFormatter(new SimpleFormatter());
        logger.addHandler(fileHandler);
    }
		// NON-STATIC MEMBERS
    private HttpServer server;

    private void run(String portNumber) {

        logger.info("Initializing HTTP Server");
        try {
            server = HttpServer.create(
					new InetSocketAddress(Integer.parseInt(portNumber)),
                    MAX_WAITING_CONNECTIONS);
        }
		
It's important to log any exceptions.

        catch (IOException e) {
            logger.log(Level.SEVERE, e.getMessage(), e);
            return;
        }

        server.setExecutor(null); // use the default executor

        logger.info("Creating contexts");
        server.createContext("/games/list", new ListGamesHandler());
		server.createContext("/routes/claim", new ClaimRouteHandler());
		
        logger.info("Starting HTTP server");
        server.start();
    }

There are entering and exiting methods available, too.

	        logger.entering("ListGamesHandler", "handle");