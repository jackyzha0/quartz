---
title: My Cloud
tags:
  - cloud
  - essay
  - difficulty-moderate
  - seedling
date: 9-08-23
---
A list of things that I do with cloud servers.

For security purposes, I'm not going to say much about my actual architecture, but I am going to tell you what I host and have hosted, and how and why you can and should start hosting your own!

[[#Why I Host|❗ I don't care about the tech, just take me to the essay -->]]
# What I Host
- [[Projects/memos|usememos/memos]]: The virtual bulletin board for you and your team written in Markdown with tag support.
- [[Projects/Obsidian/livesync|Obsidian LiveSync]]: free synchronization of Obsidian vaults. Not technically selfhosted in and of itself, but connects to a CouchDB instance that you need to set up.
- [[Projects/Obsidian/digital-garden|This Website]]: Not technically selfhosted? It's really just GitHub Pages (thanks for setting that up automatically, Quartz), but I didn't want to mess with my DNS records so I reverse proxy to Pages through the server which https://be-far.com really points to.
- [[Programs I Like/matrix|Matrix]]: There is no analytics-I mean spoon. It's a decentralized and federated (confusing, I know) chat server system with the option to selfhost your own homeserver (the thing that federates with other homeservers if you want it to). If you federate, an account created on your homeserver can access spaces created in other homeservers, and vice versa.
	- I don't have a project page on this because there's a really good configurable setup script with its own comprehensive documentation already. Those interested in hosting their own Matrix server, federated or not, should look (external link) [here](https://github.com/spantaleev/matrix-docker-ansible-deploy).

[[#How You can Host|❗ I don't care about the essay, just take me to the tech -->]]
# Why I Host
I am deeply concerned with how little control the modern consumer has over their most valuable export - data. The expertly crafted agreements that we digitally consent to on a day to day basis to function in a digital era serve to give the platforms we use the broadest possible dominion over our data.
## But what's all this fuss about Data?
It has to do with what that data is. Here is a long list of examples of data that websites, mobile apps, and other services will collect that I've aggregated over years of studying computer science and observing intrusive services. This is by no means a complete list. I have observed examples of each of these being collected by a program which has no justification for collecting them, so I'm not putting a maps app on blast for collecting location data or similar. **I am concerned when an app or service collects something that it has no functional reason to.**
- Location
- Keystrokes
- Timing of actions
	- How long between stopping scrolling and resuming scrolling
- Use history and patterns
	- What time of day you used a service
- Connections with others
	- Who you interact with on a service most frequently
	- What you say to others on a service
	- What content you tend to engage with most
- What causes you to leave the service temporarily
	- Redirects to other pages
	- An external link
	- Switching tasks to another application or service
- The broader context of your device
	- Its hardware, operating system, network parameters such as name and connection strength
	- What other applications or browser tabs are open
- The pictures in your device's camera roll
	- The metadata of pictures you upload to a service
		- Photo location
		- Camera model
		- Camera settings
	- The content of pictures you upload to a service
- Microphone input
- Accelerometer data, such as when your device is set down, picked up, or rotated
### What happens with this data?
All of this information is scattered about the back channels of the internet, and most shockingly: **it's for sale.**

This whole concept of massive data aggregation arises out of plain old commercial common sense. Companies wish to advertise their products to those who are most likely to engage with an advertisement, and in turn purchase that product. They do so by examining the user's habits to determine what the user would be most receptive to in an advertisement, whether that be content, style, or other subtle changes. As such, if a company has access to the data that a website collects about its users, it will be more easily able to "**target**" that user for advertisement.

But here's where it gets tricky. Companies don't just want to do that on one website. If you're advertising to somebody on CNN's website, why not advertise to them on a weather website as well? If a company buys and compares data from two sites, there will be subtle (and not-so-subtle, such as the same device info and network name) hints that some rando accessing a site on the internet is the same person. This allows the company to "**retarget**" that user across sites, and is the primary reason for all this myriad data being collected at the moment.

Previously, my concerns would stop there. I'd make some argument about why you shouldn't want your data to be commodified for economic and rights-based reasons. However, I want to address another concern that came to my attention recently.
## "I don't care who has my data, because I have nothing to hide."
First of all, see previous statement about economic and rights-based reasons for you to want some say in what companies do with your data. 
### But what about non-economic actors? I have nothing to hide from the government.
See, I used to agree with this argument. I live in the United States, and our national security and intelligence agencies unquestionably have the resources to find out everything about me if they want to. I was okay with this because I have nothing to hide: there is no justification that would make the full force of the FBI, NSA, CIA descend upon my online presence.

Let me say that again: **There is no justification for the United States Government to be using its resources to collect and store my data.** Remember, I am only concerned when something collects data without a functional reason.
### But they do it anyway.
The below is an excerpt from a document obtained through a Freedom of Information Act request showing that the FBI purchased tens of thousands of dollars' worth of internet traffic data (translation: your internet history) from an independent aggregator. 

![[Attachments/fbi-foia.png]]

**The average citizen has nothing to hide**: why would the US government be purchasing everyone's data? Surely, they have some non-commercial mechanism of determining who high-profile potential threat actors are that would warrant surveillance. It's not like they're trying to find such actors through these purchases, that would be a needle in a haystack. It's much easier and cheaper to find that kind of person through searches on social media sites and pay for everything about them later. That kind of surveillance, I agree with. This wholesale monitoring of the average citizen through commercially available channels? Unacceptable.

It's true that the very fact these commercial avenues for obtaining wholesale data exist is undesirable, and there's an argument that the government is just using every avenue legally available to them. But still: **to what end?**

{Section on generative AI and the ethics of training on human interaction or output, as well as a whack job theory on why consumer-available knowledge like Reddit and Twitter is getting less accessible, in progress.}

By reading all of this you have an awareness which is much greater than that of the average digital citizen. Go forth and be very scared of the future that is rapidly approaching. Or change it for the better. I'll be here, wearing my tinfoil hat.
# How You can Host
- What you can do right now:
	- Obtain a free tier account at a major cloud provider, or build your own infrastructure for use as a server.
		- Yes, I'm aware that said cloud provider could still access the data on the server. Look, if they're willing to brute-force the encrypted and sometimes obfuscated databases that contain the data stored in all of the applications that I self-host, they can have the contents. 
- What you can do going forward:
	- Peruse sites like this one to learn more about what's needed from a technical standpoint
	- Browse lists like [awesome-selfhosted](https://github.com/awesome-selfhosted/awesome-selfhosted) and see if any services within would replace a "cloud" feature of something you currently use
	- Most of all, be willing to change in your mindset and workflow for the purposes of minimizing your online footprint.