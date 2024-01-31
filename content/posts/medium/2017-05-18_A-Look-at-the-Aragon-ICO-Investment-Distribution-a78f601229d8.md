---
title: A Look at the Aragon ICO Investment Distribution
description: >-
  Another ERC20 Initial Coin Offering (ICO), another ridiculous amount of money,
  in another ridiculously short period of time. This time…
date: '2017-05-18T17:45:33.765Z'
tags:
- ICO Analysis
- Aragon
slug: /@corpetty/a-look-at-the-aragon-ico-investment-distribution-a78f601229d8
---

Another ERC20 Initial Coin Offering (ICO), another ridiculous amount of money, in another ridiculously short period of time. This time around, it’s with the [Aragon Project](https://aragon.one/), a play at making “unstoppable organizations on the blockchain.”

Not gonna lie, I played with their Alpha release, and enjoyed it. It has potential to do some cool stuff. The goal of this article is not to critique the platform, but only to look at the distribution of Ethereum ICOs to help people see the trends of the space. You can draw your own conclusions and make your own speculations.

ICO Details:

*   Started May 17, ~6pm GMT
*   Started on block **3,723,000**
*   Ended on block **3,723,134** (Last successful valued tx)
*   Investment window **33.5 min** ((3723134–3723000) \* 15 / 60)
*   See [here](https://blog.aragon.one/final-token-sale-recap-1ac64ab7cfcd) for more specific details of how they plan to use the money and its vesting schedule, etc.

### How’d I do it?

This was all done using [Project Jupyter](https://medium.com/u/9cdd90635810) notebooks and the Pandas package. The transactions were retrieved using [my Python bindings](https://github.com/corpetty/py-etherscan-api) to the [Etherscan.io](https://etherscan.io/) API (tagging [Matthew Tan](https://medium.com/u/9e71117bf4d7)). The methodology is very similar to my previous articles on Gnosis and TokenCard, and the jupyter notebooks of all of it can be found in a [new Github repo](https://github.com/corpetty/ICO_analysis).

In particular, I retrieved all transactions from the [AragonContract](https://etherscan.io/address/0x960b236a07cf122663c4303350609a66a7b288c0) address from Etherscan.io, and parsed out the ones that had an error or had a value of 0 ETH. **This is my dataset**. All conclusions and numbers are derived from that. That being said, the plots include all transactions, included the ones that had an error. I find it interesting to see the behavior of the contract with those that try and interact with it.

### The Data!

Ok, from the dataset, we have the following:

*   Total ETH raised: 274,989.993538
*   Total Transactions: 6593
*   Total non-zero txs: 2915
*   Total zero txs: 1830
*   Total error txs: 2093
*   Total unique addresses: 2616
*   Total out of gas txs: 651 ( worth 30509.78876345497 ETH )

No need to do a token breakdown, because they only accepted ETH. Other tokens were pushed through [ShapeShift.io](https://medium.com/u/5ee4b8323e7a) first if someone desired to use them. In fact, there were two addresses that showed an abnormally high number of zero value transactions calling the `transfer` function of the Aragon contract, listed below:

| address  | num txs |
| -------- | ------- | 
| 0x5e575279bf9f4acf0a130c186861454247394c06  |  139 |  
| 0xfbb1b73c4f0bda4f67dca266ce6ef42f520fbb98   | 134 (Bittrex) |

The second address listed is the Bittrex exchange, and the first isn’t listed on Etherscan. It is plausible to assign this address to another exchange, my bet would be Shapeshift. A more detailed analysis would show what portion of people invested through these two addresses, I didn’t look much further than what you see here.

![](/images/medium/1__LkqTht____8RYxFmlPedTNzw.png)

As with my previous posts, I find it very interesting to group the investors in to bins relative to the size of their investment. That means if you are an investor and you donated between 0–1 ETH, you belong in bin 0. If you donated between 1–10 ETH, you belong in bin 1, etc. Here is a table of the bins and the stats associated with them:

![](/images/medium/1__gloTizTVFM68jXFXNr1yjA.png)

and as always, here is the bar chart plot of the same data:

![](/images/medium/1__NdEtTlAskkUB__3vEhQk__wA.png)

### **You Got Your Tin Foil Hats Ready, it’s Conclusion Time!**

Ok, here we go again. The trend of very few controlling the vast majority of tokens. I feel like we can eliminate these large address as being exchanges as well, due to one of the two large tx volume addresses being linked to Bittrex as discussed earlier. Furthermore, the [largest token holder](https://etherscan.io/address/0x83f04b8fd774a6474592e8670b9928a1344bbe38):

| address | ETH | num txs |
| ------  | --- | ------- |
|0x83f04b8fd774a6474592e8670b9928a1344bbe38 |  30000.0  |  2 |

has no association to anything public. I believe we have organizations buying up DRASTIC amounts of ICO tokens for various reasons. Your speculation is as good as mine (maybe better).

We are also implementing ICO’s that only let incredibly ready people participate, leaving the rest in the dust. Looking at the [very first large transaction](https://etherscan.io/address/0xf5285ace9107e8e40c57893b83281fb7840de1df), an investment of 17670 ETH was made almost immediately, with funds being pulled from both Kraken and Bittrex. This guy (girl/group/etc) knew what he was doing, and got in on the first block available.

Also note-worthy, despite the instructions specifically stating that you needed to include at least **200,000 gas,** there were 651 txs that errored out because they didn’t include enough, which accounted for over 30k ETH. Maybe the next ICO, and the functionality around interacting with them can learn from some of these lessons, making it easier for the little guy (like ME!) to have a reasonable time window to participate with relative ease.

All in due time I guess…

### Help a Brother Out

I do this because I’m curious, and feel this type of information is lacking. We need to keep an eye on “where the money comes from” as we build this community out.

As always, come listen to [The Bitcoin Podcast](http://www.thebitcoinpodcast.com) and [BlockChannel](https://medium.com/u/211d5b924366) to hear me talk to people in the space about what they’re doing. Our slacks ([TBP](https://thebitcoinpodcast.signup.team/) and [BlockChannel](https://blockchannel.signup.team/)) are always welcome to the community as well. I’m always present in them to talk.

I’ll also be at Consensus 2017 and the Token Summit next week. Email me at petty _dot_ btc _at_ gmail _dot_ com, or contact me on Twitter at @Corpetty to grab a beer. I drink a lot.

Quick shout out to [MyEtherWallet](https://medium.com/u/a9af0d538df5) for the donation on the last article. I greatly appreciate your donation, and even more so, appreciate all the wonderful work you do for our community. Please continue being bad ass. Also, you get a lot of love from Nick Johnson on the next The Bitcoin Podcast episode. ;)

Throw me some duckets of you like what I’m doing, and have some to spare:

![](/images/medium/1__7Yj8YalSMYmZJ5ALAzk__kg.png)

ETH and ERC20 tokens: 0x8F53781799515e5dc8f5D00C528940cAe99aC969

![](/images/medium/1__GaRyRFam9FLWhNikP8GDHw.png)

BTC: 1DXmuHMufPAUEuRUwKMNLqiMqmWQyKmZP6