---
title: 'Looking at the DAO address distribution: Part 1'
description: What?!
date: '2016-05-17T14:35:59.535Z'
categories: []
keywords: []
slug: /@corpetty/looking-at-the-dao-address-distribution-part-1-f324e71381bf
---

So the first purchase ratio of The DAO creation phase is over. Gone are the days you can get the 100 DAO Tokens for 1 ETH. Due to the relatively high difficulty in understanding what The DAO actually is, and how to actually invest in it, I think that the majority of the potential investors have already “gone in.” I could be wrong, but either way, I think an analysis of the token distribution up to this point is in order.

#### Why?

Because it matters for how voting will go down. Each individual address that has invested into the DAO will have a single vote per proposal “yes” or “no”, but it is weighted by the amount of tokens that address has control of, as outlined in the [Whitepaper](https://download.slock.it/public/DAO/WhitePaper.pdf).

For simplicity’s sake, and to stay consistent for now, we will only look at the 1ETH/100Token rate blocks, so up to [block # 1520860](https://etherscan.io/block/1520860) (thanks @deskenny from the Slock.it slack). I will do an update including the remaining investments and its analysis later.

All data was retrieved from [EtherScan.io](http://www.EtherScan.io) APIs, using the Python scripting language in the [Jupyter Notebook](http://jupyter.org/) environment. All visualizations are made using the [Plot.ly](https://plot.ly/) APIs. A link to the interactive version can be found below all plots. Also, you can download the source here on my [GitHub](https://github.com/corpetty/TBP_metrics/tree/master/various_visualizations/dao_transactions) account. If you find a problem, let me know — I’ll fix it (or make a pull request).

#### Let’s dip our toes into the basics

Ok, so the first period is over, and in this timeframe, we’ve sourced quite a bit of chedda’:

ETH     10,264,539.20657231   
BTC        256,613.48016431  
USD    117,079,900.32496539

What is important to note is that this amount will only be constant in its ETH evaluation, which means if the price goes up with either ETH/BTC or BTC/USD, so will the (layman) evaluation of The DAO.

This was sourced from a total of 42,024 transactions from 14,611 unique addresses. What are the initial statistics one would first look at? (All amounts in ETH.)

mean        244.254217  
std        2250.690264  
min           0.000000  
25%           1.000000  
50%          10.000000  
75%          85.000000  
max      201911.999580

hm… that’s quite a range, the 75th percentile is 85 ETH, but the max is over 200k ETH?! I think we need to dive a bit deeper to see who is putting money into this thing, and how much. But first, let’s just take a look at how this thing has grown since its inception. Here is a chart of the amount of Ether invested as a function of block number:

![](/images/medium/1__OKXCm4Ywmu71kVghRuGw__w.png)

#### What kind of people are in The DAO?

There is quite a cross-section of people who have entered into the world’s very first DAO: speculators, visionaries, developers, wealthy, not-so-wealthy-but-hopeful. I’d reckon those who’ve invested into The DAO would make up a microcosm of the entire crypto-community itself. What does that mean? It means that there is probably a representation of everyone in the crypto-community voting on what _WE_ do with the money _WE’VE_ put into it.

Although we can’t really know exactly who put what in, through the beauty of the blockchain, we can at least get a good idea of the distribution of wealth. Let’s start with just a simple breakdown of the distribution of investors, based on the amount invested in Ether:

0      < % accounts < 1      :  23.8131593559134  
1      < % accounts < 10     :  12.8747917823431  
10     < % accounts < 100    :  26.3811771238201  
100    < % accounts < 1000   :  27.5610771793448  
1000   < % accounts < 10000  :  8.17601332593004  
10000  < % accounts < 100000 :  1.13131593559134  
100000 < % accounts          :  0.06246529705719

Interesting. A good portion of total investors have less than 1 Ether associated to their address. About half of all accounts are split (almost evenly) between addresses having between 10 and 100 Ether, and between 100 and 1,000 Ether associated with them. In a sense, the _vast_ majority of us contributed what we could to the cause. We want to be a part of something larger than us, and potentially make some money.

#### The Reality

Here is what is important. It is naive to think that the voting power comes from these large groups of accounts. Looking at the distribution of accounts above, one would initially think that this is good. The majority of people in the DAO are normal folks, who’ve invested a normal amount of money with a few people who’ve invested a lot, and an even smaller few more who’ve invested more than I’ll ever make (probably). Power with the people! Right?

Nope…

Let’s take a look at what these numbers look like when each address distribution is paired with how much of the total voting pool they have “control over.” That is to say, their portion of tokens have this much weight on votes, when compared with everyone else.

![](/images/medium/1__M9ZJPJUjS0EwW4yLDFZG4Q.png)

Think of this chart in this way: Each blue bar has control of the orange bar next to it when voting. This looks a bit more realistic, if we are to assume that the people who have invested into the DAO is a microcosm of real life. The wealthy few (top 1% of addresses) control over 55% of the voting power of proposals, while everyone who contributed 100 Ether or less (more than 66%) control barely over 2% of the total tokens.

Another illuminating example. Let’s say we have a proposal, and almost every single token holder is in the same boat, they vote “yes.” Now, Douchey McDouchFace comes in, and he holds a TON of tokens, and he doesn’t like the proposal. His single “no” could potentially nullify the _thousands_ of “yes” votes. Furthermore, if McDouchFace wants to +1 his douche-level, he can wait until the very last minute to vote, so that people assume a “yes.” This is quite an exaggerated example, but a very possible one, nonetheless.

To say the least, clear communication is going to be necessary.

#### The Silver Lining

This is to be expected, and isn’t automatically a problem. If it was irrespective of number of tokens, and 1 address = 1 vote, then it would be trivially easy to [Sybil attack](https://en.wikipedia.org/wiki/Sybil_attack) the DAO. Also, if you contribute a relatively small amount, you shouldn’t have a “huge swinging say” with what the entire organization does. You need to put your money where your mouth is. This is not unlike a lot of traditional organizations. Where the key difference lies is that you have a vote at all, and it is counted transparently and securely. Also, if you don’t like what those in voting power are doing, then leave, with your money, and continue to receive dividends from the proposals you were previously a part of, _AFTER YOU’VE LEFT_.

I, personally, am betting that those with large investments in The DAO will do whatever benefits them, which should also benefit The DAO. They can’t attack the organization, and then take their money out, due to the smart contract and the way it works. The DAO is a **_FOR PROFIT_** organization, so big players should work to make the entire organization flourish.

I’ve considered other interesting trends in the data and played with the transaction data quite a bit more. But for now, this is probably the best place to start, and other information may distract from the conversation. As a finisher, here are the addresses of who invested over 100000 Ether:

![](/images/medium/1__lm08mFCKoitTmPGF14zyfA.png)

Welcome to the future, let’s bring everyone with us.

UPDATE: It was brought to my attention that these large addresses are mostly, if not all, exchanges that are holding tokens for customers (credit to @colm of the slock.it slack). This has been confirmed by looking the number of transactions each of these addresses has with The DAO address.

This ultimately means that the distribution is more in favor of the many, and a bit less in favor of the few. How the tokens are dispersed, and subsequent decentralization is the topic of a near-future blog post.