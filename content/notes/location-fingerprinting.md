- method of mapping wifi APs to geographic/topological locations

**method**
- first phase: radio map creation example
	- joey is in a building with no gps connection
	- he goes on to google.com. a fingerprint of his connections is sent to google with a list of the WIFI APs he is close to
	- sammy in outside the building nearby to joey, and has a gps connection
	- sammy is within range of the same APs as joey. 
	- google can match sammy and joeys fingerprints and can guess where joey is
- second phase: radio map usage (offline)
	- now we have a big map with the location of all the access points.
**issues
- database can get confused if the APs move
- privacy issues, dont need password to send location of AP
- only work online