---
title: "22-firewalls-NAT"
tags: 
- lecture
- cosc301
sr-due: 2023-08-03
sr-interval: 3
sr-ease: 250
---


Router/Gateway 
- Router 
	- Primary purpose is to forward packets (Layer 3). 
	- Demarcates a broadcast zone (e.g. Ethernet). 
	- May demarcate management borders. 
	- Used to shield the border of networks. 
	- Often some firewall capabilities. (Layer 4) 
- Gateway 
	- A very broad term. 
	- Application Layer Gateway: Email, Web 
	- A gateway can convert between two different types of network, e.g. VoIP / PSTN
	
Sample Large Network. A typical large network in a company
![Sample Large Networks](https://i.imgur.com/nnmv4NS.png)

> [!INFO] 
> border router can be subjectd to denial of service attack.  needs to be very fast and efficient to drop malicious traffic quickly
> firewall is a secondary barrier to filter illegitimate traffic. 

> [!INFO] demillitarized zone (DMZ)
> buffer zone, potentially some risk here. 
> little bit dangerous stuff from outside goes here.
> very highly security supported

Border Router 
- Coarse-grained inspection. 
- Block offensive networks from getting inside your network. 
	- Route to null(0) or drop at firewall. 
- Hide parts of interior network from outside. 
- Stop interior hosts from accessing internet directly. 
	- Force use of web proxy or e-mail gateway.
	
![](https://i.imgur.com/j1lKpYe.png)

Firewall 
- Commonly done on the router. 
- Used to implement a finer-grained access policy. 
- Protects against illegitimate packets. 
- Position 
	- Inside of router: Routers are faster, better equipped for simple dropping 
	- In front of infrastructure: Firewalls incur some delay, but it is usually negligible when compared with the Internet. 
- Individual hosts commonly have firewalls. 
	- Fast becoming the out-of-box configuration.
	
	Gateway 
	- Can be used to implement a Web Proxy. 
		- Use can be enforced by router / firewall. 
	- Can be used as e-mail filtering solution. 
		- e.g. all outgoing and incoming mail must go through a mailhub—only authorised hosts can be e-mail servers. 
		- All e-mail is scanned for viruses and SPAM.

1st : Packet-Filter Firewall 
- Forward or block packets based on the information in network-layer and transport-layer headers 
	- Source and destination addresses 
	- Source and destination port addresses 
	- Type of protocol (TCP or UDP)
![example table](https://i.imgur.com/c65P6A9.png)

> [!INFO] table
> doesn't say whether to drop or accept. just that there is some action.
> probably trafic to port 23 is dropped because this is telnet

Packet Filter Process 
- Think of a firewall as a set of inverted trees. 
	- Input, Output and Forward 
	- Create a chain for each combination of {in,out} 
	- Each packet starts at the top of its respective tree. 
- Packet is inspected one test at a time 
	- Accept or drop (processing stops) 
	- Jump into another rule-set (continue processing) 
	- Return from a rule-set (or fall-off a rule-set) 
	- Falling off the tree’s rule-set invokes the default policy for that tree.

> [!INFO] think of firewall as a set of inverted trees
> subtly different from what vyatta uses

Tree of chains
![Tree of chains](https://i.imgur.com/xsHQ2wB.png)

> [!INFO] input packets always have destination firewall. 
> in vyatta the two trees: (input to local or output from local), 

IP rules 
- To allow all incoming SSH 
	- iptables –A INPUT –p tcp –dport 22 –m conntrack –ctstate NEW,ESTABLISHED –j ACCEPT 
	- iptables –A OUTPUT –p tcp –sport 22 –m conntrack –ctstate ESTABLISHED –j ACCEPT 
- To allow all outgoing SSH 
	- iptables –A OUTPUT –p tcp –dport 22 –m conntrack –ctstate NEW,ESTABLISHED –j ACCEPT 
	- iptables –A INPUT –p tcp –sport 22 –m conntrack –ctstate ESTABLISHED –j ACCEPT

2nd: Stateful Firewall 
- Performs the work of the packet-filter firewall but operates up to layer 4 (transport layer) 
- Stateful packet inspection 
	- Keep track of the state of network connections 
		- SYN, SYN-ACK, ACK, ESTABLISHED, sequence number, port, IP, … 
	- Determines whether a packet is the start of a new connection, a part of an existing connection, or not part of any connection using the maintained states. 
	- UDP is connectionless, so tracking is a little less precise, but still good enough, so long as the source port is random. 
	- CPU intensive checking is performed at the time of setup of the connection. They may not be suitable for border routers on larger networks
	
	3rd: Proxy Firewall 
	- Filter message based on the information available in the message itself (application layer) 
		- Sometimes called application gateway 
		- To detect if an unwanted protocol is attempting to bypass the firewall on an allowed port, or detect if a protocol is being abused in any harmful way
	![](https://i.imgur.com/P5UX1u9.png)

Firewall can Guard Against 
- Near-local spoofing 
	- where packets come in on the wrong interface. 
- Ping-floods against internal hosts 
	- though the firewall still gets flooded. 
- Syn-Ack attacks 
	- Limit TCP half-open connections to say 20/min. 
- Fragment attacks 
	- stateful firewalls.
	
Firewall isn’t a Panacea 
- Spoofing internet hosts 
	- solved using tools such as SSL 
- Flooding your internet connection 
	- requires upstream co-operation. No protocol support for this, e.g. DoS and DDoS 
- Detecting network anomalies 
	- requires checking of logs, Intrusion Detection Systems 
- Poor policy will quickly degrade security.

Private Network 
- Private IP network is an IP network that is not directly connected to the Internet 
- IP addresses in a private network can be assigned arbitrarily. 
	- Not registered and not guaranteed to be globally unique 
- NAT is a way to conserve IP addresses 
	- hide a number of hosts behind a single IP address - A short term solution to IP address depletion 
	- Uses private addresses: 
		- 10.0.0.0-10.255.255.255, 
		- 172.16.0.0-172.32.255.255 or 
		- 192.168.0.0-192.168.255.255
		
SNAT and DNAT 
- Source NAT (SNAT) 
	- the destination IP address is maintained and the source IP address is changed. 
	- allows a host on the “inside” of the NAT to initiate a connection to a host on the “outside” of the NAT. 
- Destination NAT (DNAT) 
	- the destination address is changed and the source IP address is maintained. 
	- allows a host on the “outside” to connect to a host on the “inside”. 
- Port Address Translation (PAT) 
	- NAT overloading 
	- uses one IP address for all clients to multiple ports
	
NAT Table 
- The NAT table is the heart of the whole NAT operation, which takes place within the router (or any NAT-enabled device) as packets arrive and leave its interfaces

![](https://i.imgur.com/GBk3i67.png)

NAT Concerns 
- Performance 
	- Modifying the IP header by changing the IP address requires that NAT boxes recalculate the IP header checksum 
	- Modifying port number requires that NAT boxes recalculate TCP checksum 
- End-to-end connectivity 
	- NAT destroys universal end-to-end reachability of hosts on the Internet. 
	- A host in the public Internet often cannot initiate communication to a host in a private network. 
	- The problem is worse, when two hosts that are in a private network need to communicate with each other. 
		- Port forwarding 
		- TCP hole punching

