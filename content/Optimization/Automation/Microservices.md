---
title: Microservices
---
## Generating graphics
Initially, for my own purposes, I designed a microservice that generates optimized creatives based on a special template. Later, the project was extended to a module in [[Optimization/Tools/MakeHQ]] and is now available to others under the name [[Projects/EasyBanner]].

With its help, I am able to create hundreds of graphics in a matter of minutes by uploading, for example, data from [[Optimization/Tools/Airtable]] or even directly from my computer (with the help of [[Optimization/Tools/Keyboard Maestro]] or [[Optimization/Tools/Raycast]]).

In addition to creating graphics based on an HTML template, it is also possible to generate them based on a [[Optimization/Tools/Webflow]] project, which, when shared, is passed to [[Projects/EasyBanner]].

## Counter for a website and email
I use counters in my campaigns to time the end of a sale or promotion. Initially, I used sendtric.com to generate a simple counter, but I needed to have more control over it and customize it to my needs.

This is how a microservice was created to generate timers in the form of a .gif file. It is currently available as [[Projects/EasyTimer]]

## Carbon.now.sh
A simple microservice to which I can upload a gist ID and based on it a graphic will be generated with a properly formatted code snippet. The alternative is [ray.so](https://ray.so)

## $AHOY
A microservice that simulates the blockchain, enabling the recording of transaction history, creation of wallets and their categories.
