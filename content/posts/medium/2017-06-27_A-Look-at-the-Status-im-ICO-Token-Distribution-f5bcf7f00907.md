---
title: A Look at the Status.im ICO Token Distribution
description: >-
  NOTE UP FRONT: I express my opinions here (at least at the end of the
  article). If you don’t like them and don’t have evidence to support…
date: '2017-06-27T03:47:04.662Z'
tags:
- ICO Analysis
- Status
slug: /@corpetty/a-look-at-the-status-im-ico-token-distribution-f5bcf7f00907
---

**NOTE UP FRONT:** I express my opinions here (at least at the end of the article). If you don’t like them and don’t have evidence to support your dislike, then go kick rocks.

Things are moving forward quite rapidly in this space; I simply don’t have time to look at all the ICOs (ya know, full time job, podcast, wife, and stuff), but this one struck me as different while also being wildly anticipated. This article digs into the [Status](https://medium.com/u/fbf3ec9c4a40) platform ICO model, how it differentiated itself from other models, and what the results were. If you aren’t sure what they do, go read about em [here](http://status.im/).

You might want to start by reading their recap of the ICO. Ya know, cause they wrote it.

[**Status Contribution Period: Recap**  
_On Block #3903900 on Tuesday of last week, the Status Contribution Period began. What followed was a flurry of almost…_blog.status.im](https://blog.status.im/status-contribution-period-recap-36e64d35d3e4 "https://blog.status.im/status-contribution-period-recap-36e64d35d3e4")[](https://blog.status.im/status-contribution-period-recap-36e64d35d3e4)

#### Quick Obligatory Methodology Section:

This was all done using [Project Jupyter](https://medium.com/u/9cdd90635810) notebooks and the Pandas package. The transactions were retrieved using [my Python bindings](https://github.com/corpetty/py-etherscan-api) to the [Etherscan.io](https://etherscan.io/) API (tagging [Matthew Tan](https://medium.com/u/9e71117bf4d7)). The methodology is very similar to my previous articles mentioned earlier, and the Jupyter notebooks of all of it can be found in a [new Github repo](https://github.com/corpetty/ICO_analysis).

In particular, I retrieved all transactions from the SNT Crowdsale [contract](https://etherscan.io/address/0x55d34b686aa8c04921397c5807db9ecedba00a4c) address from Etherscan.io, and parsed out the ones that had an error or had a value of 0 ETH, for both external and internal transactions. The values refunded by the internal transactions are removed from the corresponding external amounts when grouped together. **This is my dataset**. All conclusions and numbers are derived from that. I don’t do an errored transaction analysis on this one, one may come afterwards if no one else does it, but people like [CodeTract](https://medium.com/u/7d7671f0df95) have been doing an excellent job of this for other ICOs. Go check out their stuff.

I’m happy to see that others are doing analysis of this space, so we can see more of the trends developing.

#### Status.im ICO Summary:

The Status platform prides itself on really caring about their community, the Ethereum community, and learning from previous ICO models. By learning from previous ICO models, I mean attempting to widely distribute your token to those who are interested in its utility in the midst of a fever-pitched, FOMO induced, and irrationally exuberated (made that one up!) investor community ready to flip your ICO for profit.

What was their plan? Two-fold:

1.  They created a pool of “Genesis Tokens” (SGT) to give to early contributors that clearly showed they wanted to help the platform grow, which were given out at the discretion of the core devs. This token pool corresponded to a maximum of 10% of the total token supply. After the contribution period, SGT could be converted to the ICO token (SNT) so early contributors could “get in” on the ICO token for being a contributor early. Basically, early disbursement of tokens that map to a given percentage of the total.
2.  As for the crazy investors, they implemented a soft-cap, and subsequent “Dynamic Ceilings.” What is that? Well, you should read it from the people who implemented it [here](https://blog.status.im/distribution-dynamic-ceilings-e2f427f5cca) like a smart person, and then frown at my shitty explanation here. My explanation of Dynamic Ceilings, just imagine that as time went on, large investments only got a portion of their investment accepted, and the rest was refunded. This was an attempt to increase the time window for smaller investors, and slowly make it more difficult for large investments to get in. The effect of this was for every transaction that got an amount kicked back, there is one regular tx and two internal txs, for example ( numbers are for illustration ):

1.) User attempts to send 100 ETH  
2.) Over time, smart contract says "screw you big investor, give the little guys a chance!"  
   a.) Smart contract accepts 20 ETH  
   b.) Smart contract refunds 80 ETH  
3.) User gets 20 ETH worth of SNT and 80 ETH refund

\*\* Note that percentages changed as time went on. 

Here are the stats I pulled from various sources, as well as my personal analysis of the transactions themselves.

*   **Start Block:** 3,903,900
*   **End Block:** 3,908,029
*   **Investment Time Period:** 4,129 blocks or ~17.20 hrs
*   **Initial ETH Ceiling:** 12M CHF ([Franks](http://www.xe.com/currency/chf-swiss-franc), yo!)
*   **Total SNT Supply:** 6,804,870,174.88
*   **Total ETH Contributed:** 299,343.15177772392

So this one got a bit hairy when summing up investor amounts from the smart contracts. You’ll notice (you probably didn’t notice) that I’m off by ~559 ETH from the reported numbers by the smart contracts themselves. This is because of the dynamic ceilings they employed.

So my analysis got a few of these transactions mixed up when combining external and internal transactions, which make my numbers slightly off, sue me (don’t). This annoys the shit out of me, but I don’t have the time to fix what went wrong. The trends will be the same, which is the main point of this article.

#### Total Supply Distribution:

Below is the Status graphic from the previously linked Contribution article for your convenience.

![](/images/medium/1__CWHPHHV4o0IZDXST__YYzSQ.png)

Note that the Status Genesis Allocation is “up to 10%.” Well, they didn’t actually give all of their allocation out, so the real numbers are as follows:

Status Genesis Token Holders:  6.92894026 %  
Public Contribution:          44.07105974 %  
Status Core Dev:              20 %  
Reserved for Future:          29 %

#### Public Contributor Investment Distribution:

The remainder of this article is discussing that ~44% piece, **specifically on how much of the total supply these investors control, and their distribution**. In other words, we’d like to see how well the ICO did in “spreading their seed,” if you will. Were they premature like the majority of highly popular ICOs, or did they pace themselves well despite the crazy excitement?

Each unique address was summed up, giving its total contribution, and then placed into an “investor bin” that corresponds to how big of an investor they are. These bins are broken up by orders of magnitude of ETH, _i.e._:

Investment (ETH):         Bin:  
\-----------------------------------  
0 - 1                     0  
1 - 10                    1  
10 - 100                  2  
100 - 1,000               3  
1,000 - 10,000            4  
10,000 - 100,000          5

Important Note: These value percentages are relative to the TOTAL SNT SUPPLY, which shows what type of investor has what control over the entire Status platform. Also, it should be noted that these numbers are only good for showing the distribution at the moment the ICO ended. More on this later. Here is the table of investors:

![](/images/medium/1__YAtjNJO9cexbPg4TDktSOw.png)

and the plot:

*   click the pic to blow it up
*   click the link below to bring up an interactive version

![](/images/medium/1__Smc0y__TOL1XsofS1wxa3rg.jpeg)

We can see from the numbers that smaller amount investors have significantly more control of the token supply than previous ICOs that I’ve analyzed. This is a significant pullback from the trend of very few people controlling the vast majority of tokens, albeit the trend still exists.

It should also be noted that this does not take into account the extra ~7% of token holders that are early contributors to the platform.

#### Response Edit, thank you [Nick Johnson](https://medium.com/u/b070f640fe4a) and [David Henderson](https://medium.com/u/74241f8f48e9):

A few responses reminded me to point out that a unique address is not indicative of an individual, and such assumptions should not be made. I have discussed this in [my TokenCard article](https://medium.com/the-bitcoin-podcast-blog/a-look-at-the-tokencard-ico-investor-distribution-cddeb6f534f9), and did not include such a discussion. I guess it is prudent to say something.

Due to the way the ICO was structured, the savvy investor was incentivized to break up his desired large contribution amount into many smaller addresses, and spamming them into the ICO to try and see what sticks. If enough of this happens, then you basically sybil (not quite sybil, but you get it) the ICO into a DoS situation, which is what we saw. I don’t have enough data to say how much of the network congestion was due to this, maybe someone else will do a sweet analysis of that.

There are some indicators that this was not the entire case, which you can read about in my response to [Nick Johnson](https://medium.com/u/b070f640fe4a) below, if you’re interested. There is another simple plot in there, for the people who just want eye candy.

#### Ultra Massive Exoneration Time! (a.k.a. opinions section)

People are hating on Status for various reasons, which are mainly driven from garbage understanding of how the Ethereum network works, and misplacing blame.

It was clear the fervor was there. They were aware of it, and managed to raise a bunch money while still allowing “the little guys” _en masse._ You can’t really argue with that… look at the distribution.

So I believe that Status took steps in the right direction of both allowing smaller investors to contribute to an ICO, as well as being sure of putting tokens directly into the people that contributed early. This allowed people who actually helped build the system also take advantage of the ICO craze that is clearly going on. Full disclosure, I received SGT tokens for early contributions, which made me personally not inclined to participate in the ICO. I would predict that other SGT holders also felt this way, thus removing our would be transactions into the clusterfuck that was the contribution period.

The Dynamics Ceiling approach worked to keep a constant supply of incoming transactions of lower value over a longer period of time. The network congestion that people blame Status for is not their fault, unless you can blame them for building something MANY people wanted to contribute to.

I talk at length about these network congestion issues raised from the ICO craze with [MyEtherWallet](https://medium.com/u/a9af0d538df5)’s Taylor one of my recent podcasts, take a listen:

[**The Bitcoin Podcast: TBP133 - ICO Woes with MyEtherWallet**  
_Shortly after Ethereum launched, Taylor built MyEtherWallet.com with her partner because she wasn't confident with…_thebitcoinpodcast.libsyn.com](http://thebitcoinpodcast.libsyn.com/tbp133-ico-woes-with-myetherwallet "http://thebitcoinpodcast.libsyn.com/tbp133-ico-woes-with-myetherwallet")[](http://thebitcoinpodcast.libsyn.com/tbp133-ico-woes-with-myetherwallet)

Just as a side calculation:

> Of all the transactions that tried to participate, the smart contract refunded 111,161 attempts for a total of 347,154 ETH.

> Status refunded back more ETH than they raised.

I’m not sure you can call that “greedy.”

### Holla at ya Boi!

I do this because I’m curious, and feel this type of information is lacking. We need to keep an eye on “where the money comes from” as we build this community out.

As always, come listen to The Bitcoin Podcast and [BlockChannel](https://medium.com/u/211d5b924366) to hear me talk to people in the space about what they’re doing. Our slacks ([TBP](https://thebitcoinpodcast.signup.team/) and [BlockChannel](https://blockchannel.signup.team/)) are always welcome to the community as well. I’m always present in them to talk.

If you don’t like slack, hit me up on twitter at `@corpetty` or email me at petty _dot_ btc _at_ gmail _dot_ com

Throw me some duckets of you like what I’m doing, and have some to spare. The donations definitely help me stay motivated to do these:

![](/images/medium/1__7Yj8YalSMYmZJ5ALAzk__kg.png)

ETH and ERC20 tokens: 0x8F53781799515e5dc8f5D00C528940cAe99aC969

![](/images/medium/1__GaRyRFam9FLWhNikP8GDHw.png)

BTC: 1DXmuHMufPAUEuRUwKMNLqiMqmWQyKmZP6