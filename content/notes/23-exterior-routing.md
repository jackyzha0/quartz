---
title: "23-exterior-routing"
tags: 
- lecture
- cosc301
---

> [!INFO] for exam: general understanding for pass. for a+, detailed understanding.
> relate exam to labs.

Idealized View of the Internet
![|300](https://i.imgur.com/CT5aQA6.png)
- This abstraction is quite misleading 
- The TRUE story 
	- The Internet service is provided by a large number of commercial enterprises, generally in competition with each other. 
	- Global connectivity is achieved through cooperation between profitable commercial enterprises.

> [!INFO] routing between large organisations
> 

The Real Internet Structure
![|300](https://i.imgur.com/hgHUv9a.png)
- Internet is composed of over 50000 Autonomous Systems (ASs) 
	- Superlinear growth 
- Each public AS is identified a globally unique number 
	- IANA allocates AS Numbers to Regional Internet Registries (RIRs) 
	- The RIRs further allocate or assign AS Numbers to network operators 
	- 16 bit values

> [!INFO] e.g., devices in uni network are all managed by the university. externallly, 
> you dont want people to pass through your network without charging them or blocking them. 
> each AS gets a unique number from IANA. each AS can subdivide to other organisations. 
	
Inter-AS Relationships
- Peering: two or more ASs interconnect directly with each other to exchange traffic 
	- often done without charging for the interconnection or the traffic.
- Transit: one AS agrees to carry the traffic that flows between ASs 
	- The transit provider receives a “transit fee” for the service
![peering|300](https://i.imgur.com/TNFWg1z.png)
![transit|300](https://i.imgur.com/UFGJoW2.png)

> [!INFO] peering, two or more ASs connected directly to the same network. connect two countries, continents etc. 
> transit, One AS agrees to carry traffic between two other ASs, acts as a service. charges a transfer fee

Routing between ASs 
- Distance vector or link state? 
	- No universal routing metric 
- Problems with distance vector 
	- Bellman-Ford algorithm may not converge 
- Problems with link state 
	- Metric used by routers not the same 
	- loops 
	- LS database too large 
	- entire Internet 
	- May expose policies to other ASs

> [!INFO] no routing standard. hard to organise. distance vector not easy to converge. link state needs a very large database, this may expose internal structure which could be a security threat. 

BGP 
- Border Gateway Protocol 
	- Is a Policy-Based routing protocol 
	- Is the de facto inter-domain routing protocol of today’ s global Internet (current version BGP4) 
- BGP is classified as a** path vector routing protocol **
	- makes routing decisions based on paths, network policies, or rule-sets configured by a network administrator 
	- defines a route as a pairing between a destination and the attributes of the path to that destination.
![|300](https://i.imgur.com/QeA0Tpa.png)

> [!INFO] de facto standard for inter domain routing. exchange long path not link state. path contains ID's of 
> destination	next-hop	AS_id_of_as_that_gave_you_the_path	Path
> only need to know destiniatio and next hop. but with BGP you know the whole path.
> two way - you may reject the path a neighbor sends to you to follow. (selective adoption)
> need to check if neighor and path domains are trustworthy
> ASs have security certificates. each AS i the path could do a man in the middle attack.  e.g., govt can monitor traffic. 
> need to understand risk, and how much effort to put in to avoid it. 
> e.g., traffic between europe and USA dont want to go through China. 
> BGP only run on the border gateway routers. exchange routing information through TCP

BGP Operations
![BGP Operations|300](https://i.imgur.com/eIao7hW.png)

Four Types of BGP Messages 
- Open 
	- Establishes a peering session on port 179. 
- Keep Alive 
	- sends 19-byte keep-alive messages every 60 seconds to maintain the connection 
- Notification 
	- Used for error notification 
	- Shuts down a peering session 
- Update 
	- Announces new routes or withdraws previously announced routes.

Two Types of BGP Neighbour Relationships 
- eBGP: External Neighbor in a different AS 
- iBGP: Internal Neighbor in the same AS
- The main difference is the way to propagate routes 
	- New routes from an eBGP is typical redistributed all other iBGP and eBGP peers. 
	- New routes learned by an iBGP are advertised to only iBGP peers.
![|300](https://i.imgur.com/II3HeEM.png)

> [!INFO] 

BGP Route Processing
![BGP Route Processing|300](https://i.imgur.com/ZXrHu4P.png)

Import/Export Routes 
- Import Routes 
	- When a router hears many possible routes to a destination network, it needs to decide which route to install in its forwarding tables. 
	- Order of route preference: customer > peer > provider 
- Export Routes 
	- Each AS needs to make decisions on which routes to export to its neighboring ISPs using BGP. 
- No ISP wants to act as transit for packets that it isn’t somehow making money on. 
	- Transit customer routes: Highest priority 
	- Transit provider routes: Most likely not (no money earned) 
	- Peer routes: only selected routes to other peering ISPs.

Best Route Selection 
- Use BGP attributes
Given multiple routes to the same prefix, a BGP speaker must pick at most one best route
![|300](https://i.imgur.com/b1YMhwe.png)

BGP Attributes
![BGP Attributes|300](https://i.imgur.com/B11GmqN.png)

AS-Path and Loop Detection
- AS_PATH: sequence of AS identifiers that the route advertisement has traversed.
![|300](https://i.imgur.com/iRDCAwJ.png)

Next_Hop 
- IP address of the next-hop router along the path to the destination. 
	- On eBGP sessions, the next hop is set to the IP address of the border router of the neighbouring AS. 
	- On iBGP sessions, the next hop is not modified.
![|300](https://i.imgur.com/CTsG8xq.png)

Local Preference 
- The first criteria used to select routes 
- Not attached on routes learned via eBGP sessions, but assigned by the import policy of these sessions.
![|300](https://i.imgur.com/4UllIo0.png)

Multi-Exit Discriminator (MED) 
- Neighboring AS sets the MED values to indicate which router it prefers to receive traffic for destination. 
- Used for comparing two or more routes from the same neighboring AS.
![|300](https://i.imgur.com/gG9ayXF.png)

Best Route Selection Criteria
![|300](https://i.imgur.com/hpCBD0g.png)

BGP Problem and Migration 
- Internal BGP scalability 
	- Full mesh connectivity 
	- Route reflectors and confederations. 
- Instability 
	- The routing tables are adjusted continually to reflect actual changes 
	- Route flap damping 
- Routing table growth 
	- Route summarization 
- Load-balancing 
	- Locater/Identifier Separation Protocol

Summary 
- Inter-AS relationships 
	- Peering 
	- Transit 
- BGP 
	- eBGP and iBGP 
	- Route import and export 
	- Best route selection

Resources 
- Hari Balakrishnan, and Nick Feamster, Interdomain Internet Routing, http://nms.csail.mit.edu/6.829-f05/lectures/L4- routing.pdf 
- Mike Pennington, BGP Deployment & Scalability, www.pennington.net/tutorial/bgp_001/BGP_Overview.ppt