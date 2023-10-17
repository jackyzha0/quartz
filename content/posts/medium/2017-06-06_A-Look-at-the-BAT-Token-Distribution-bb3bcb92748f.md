---
title: A Look at the BAT Token Distribution
description: >-
  Jesus H. Christ folks. I’ve put off doing this one a little bit, in part
  because I’m a bit depressed/disappointed/confused/? in the…
date: '2017-06-06T01:35:25.855Z'
categories: []
keywords: []
slug: /@corpetty/a-look-at-the-bat-token-distribution-bb3bcb92748f
---

Jesus H. Christ folks. I’ve put off doing this one a little bit, in part because I’m a bit depressed/disappointed/confused/? in the direction this is headed. As always, I’ll leave my opinions until the end, so those of you who are strictly reading for the data herein can click “close” when I start ranting.

The [Basic Attention Token](https://basicattentiontoken.org/index.html) ICO, lead by Brendan Eich, is an attempt to tokenize human attention on the internet. The ICO was certainly highly anticipated by the community, which I believe exacerbated the trends we’ve been seeing from the ICO space, as shown by my previous articles covering the [Gnosis](https://keepingstock.net/a-look-at-the-gnosis-dutch-auction-distribution-25c2ccac2d9d), [TokenCard](https://medium.com/the-bitcoin-podcast-blog/a-look-at-the-tokencard-ico-investor-distribution-cddeb6f534f9), and [Aragon](https://medium.com/blockchannel/a-look-at-the-aragon-ico-investment-distribution-a78f601229d8) ICOs. Go read them, this one will cover that same information, and a bit more.

Here is the summary on the ICO specifics:

*   **Desired Cap:** 156,250 ETH
*   **Start Date:** Block 3,798,640, approx. May 31, 2017, 8 am PDT
*   **Potential Investment Window:** 30 days or until cap met
*   **Practical End Date:** Block 3,798,642 (timeframe of **3 blocks**)
*   **Technical End Date:** Block 3,798,720 (small fry txs to get to cap)
*   **Total Supply of BAT:** 1.5 billion
*   **Total BAT for Sale:** 1 billion
*   **BAT Development Pool:** 200 million
*   **User Growth Pool:** 300 million

### How’d I Do It?

This was all done using [Project Jupyter](https://medium.com/u/9cdd90635810) notebooks and the Pandas package. The transactions were retrieved using [my Python bindings](https://github.com/corpetty/py-etherscan-api) to the [Etherscan.io](https://etherscan.io/) API (tagging [Matthew Tan](https://medium.com/u/9e71117bf4d7)). The methodology is very similar to my previous articles mentioned earlier, and the Jupyter notebooks of all of it can be found in a [new Github repo](https://github.com/corpetty/ICO_analysis).

In particular, I retrieved all transactions from the [BAT contract](https://etherscan.io/token/BAT) address from Etherscan.io, and parsed out the ones that had an error or had a value of 0 ETH. **This is my dataset**. All conclusions and numbers are derived from that. That being said, the plots include all transactions, included the ones that had an error. I find it interesting to see the behavior of the contract with those that try and interact with it.

### The Data!

Let’s look at some stats from ICO:

*   **Total non-zero successful txs:** 185
*   **Total unique addresses:** 184
*   **Total tx fees paid:** 70.15489 ETH
*   **Current num BAT holders:** 2222 (as of June 5, 2017, 8:40 PM EST)

Practically speaking, the ICO was finished after 3 blocks. 99.9996% of the desired 156,250 ETH was put in by then. Below is a list of the top 10 contributors. The remaining successful txs are just people who asked for a small enough amount to get their transaction in.

Note that some have said the large transactions were the team itself that were the reserved pools. **THIS IS NOT CORRECT**. These are investors buying from the Token sale. The reserved pool amounts are outside of the tokens that were for sale. Go look at the website, it clearly states the breakdown.

![](/images/medium/1__q4C1XP7__Y0PsIMQ02LRCzA.png)

Some lucky/smart bastard got two transactions in! His address is [0x001934d46ef025ec18f292f4c5f42ec85f2deb26](https://etherscan.io/address/0x001934d46ef025ec18f292f4c5f42ec85f2deb26) and here are the deets:

![](/images/medium/1__f9BHXXLiqNbpDZnEWCVG6A.png)

Ok, let’s look at the investor distribution, like we’ve done in the other breakdowns. Even though its a bit of a misnomer this time, it’s kinda my thing now, I guess. The first is the table, the second is the plot:

![](/images/medium/1__b6eyWYYiDeTxRZUaNPDbJg.png)

![](/images/medium/1__CFFNZXTqlov4R6AYYIYFOg.png)

With only a few people getting into the ICO, its quite clear the vast majority of people who actually got to invest were large ETH amount contributors, and they were prepared.

Before I start my rants, if there is more data that you’d like to see in particular, leave a comment and I’ll try and add it. It isn’t that difficult for me to produce information from the raw data. If you’re capable, I invite you to do it yourself. You have access to what I’ve done and how I’ve done it through my github, use it, and answer your own questions! If you don’t know how, ask. I’d like to think this community has a strong desire to help others understand what we’re trying to build.

### Thoughts on Trends in the Space, Some Warnings:

Guys… what the fuck are we doing?

It’s quite clear that the trends of the ICO space are getting a bit out of hand. Yes, I’ve only done analysis on the largest ones, and it can be said that BAT is one of the most legitimate ones. Brendan Eich’s track record, the Brave Browser actually exists and is in use (I personally use it for about 30% of my internet browsing), The amount of press, time, and instruction the team gave investors. All of these helped contribute to its quick sell out.

> Selling all of your tokens to a few individuals is not the point.

I think we can safely assume anyone that got into the BAT ICO isn’t planning on actually using BAT. I’m going to go out on a limb and guess that almost every single person who participated successfully is attempting to distribute the BAT they bought in order to make profits when they hit exchanges, taking advantage of the FOMO of these times.

I’m cool with making a buck and smart investment strategy. I can’t really blame the people who are doing it here, it was clear that was going happen if anyone cared to look at past ICO results. I blame those creating the ICO terms. The number one rule of blockchains that involve value transfer is that if it can be gamed, it will be. If your goal is to distribute your token to those who are interested in what you’re trying to do, then it is your responsibility to structure your platform so that the people you’re trying to reach are able to reach you.

Something else of note. We have no idea if the people actually doing the ICO aren’t investing in their own platform and making a profit off themselves twice. I don’t see why they wouldn’t. (pure conjecture, but clearly a possibility)

There are negative consequences if we continue along this road, namely:

*   The FOMO associated with very short window, high value ICOs will artificially inflate the value of the underlying project, and fund a project with far too much money as a start-up. This doesn’t align incentives to provide a quality product to the end-user. If you raise that much money as a start-up, you’ve won. What do you care? You are required to have an extraordinary amount of ethics to continue to the best of your ability.
*   This artificially inflated sense of scarcity boosts the price, and thus the underlying valuation of the project which they can’t operate it. It strangles them.
*   If the standard moves towards this behavior, we won’t allow people to do enough due diligence. Investors will just throw money at every project, hoping one will stick. This creates an environment that’s ripe for scamming or poor quality ideas getting funded. A shitty white paper is not enough for millions of dollars of an investment.
*   Eventually, some of these projects will fail miserably, and people will lose a significant amount of money. More than likely, the majority of these projects will not be able to produce what the set out to, leaving their community holding a depreciating bag of shit.

I love the idea of a token that represents the API key to your platform, and as your platform grows, those that add value to it get rewarded. There are plenty of ways this new model of business is going to change the world, but we’ve started off on the wrong foot, and the investors and scammers are going to do everything in their power to ruin it for us. This road can potentially ruin us at the very worst, or just set us back for a long time when something inevitably goes wrong.

Maybe I’m just being cynical, but I doubt it. Hit me with your thoughts.

### Holla at ya Boi!

I do this because I’m curious, and feel this type of information is lacking. We need to keep an eye on “where the money comes from” as we build this community out.

As always, come listen to The Bitcoin Podcast and [BlockChannel](https://medium.com/u/211d5b924366) to hear me talk to people in the space about what they’re doing. Our slacks ([TBP](https://thebitcoinpodcast.signup.team/) and [BlockChannel](https://blockchannel.signup.team/)) are always welcome to the community as well. I’m always present in them to talk.

If you don’t like slack, hit me up on twitter at `@corpetty` or email me at petty.btc@gmail.com

Throw me some duckets of you like what I’m doing, and have some to spare. The donations definitely help me stay motivated to do these:

![](/images/medium/1__7Yj8YalSMYmZJ5ALAzk__kg.png)

ETH and ERC20 tokens: 0x8F53781799515e5dc8f5D00C528940cAe99aC969

![](/images/medium/1__GaRyRFam9FLWhNikP8GDHw.png)

BTC: 1DXmuHMufPAUEuRUwKMNLqiMqmWQyKmZP6