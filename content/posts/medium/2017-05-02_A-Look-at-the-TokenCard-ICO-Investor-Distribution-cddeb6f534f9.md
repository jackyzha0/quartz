---
title: A Look at the TokenCard ICO Investor Distribution
description: >-
  This is another look at the distribution of an ICO in the Ethereum space,
  because I think its important to see the overall trends of how…
date: '2017-05-02T22:44:57.830Z'
lastmod: 2024-01-31
tags:
- ICO Analysis
- TokenCard
slug: /@corpetty/a-look-at-the-tokencard-ico-investor-distribution-cddeb6f534f9
---

This is another look at the distribution of an ICO in the Ethereum space, because I think its important to see the overall trends of how these projects are getting funded so we can draw rational conclusions from evidence, instead of just saying stuff that we feel without any real backing.

### What’s TokenCard?

[Monolith Studio](https://medium.com/u/fb0b7e32b7a5)’s [TokenCard](http://tokencard.io) is a platform to hold your ERC20 tokens, as well as spend them using a visa debit card. Their whitepaper can be found [here](http://tokencard.io/tokencard_whitepaper.pdf). We at The Bitcoin Podcast did a highlight of them a while back ([found here](http://thebitcoinpodcast.com/episode-117/)). This post is not an evaluation of the platform, but more of a look at the public perception of the platform, and how the TKN digital asset will be distributed amongst the community (initially).

TokenCard ICO contract address: [0x49edf201c1e139282643d5e7c6fb0c7219ad1db7](https://etherscan.io/address/0x49edf201c1e139282643d5e7c6fb0c7219ad1db7)

[Here](https://medium.com/@MonolithStudio/definitive-tkn-creation-event-guide-b39096840baf) is the Medium post detailing the ICO details and instructions.

### My Methodology

I used my [python bindings to Etherscan.io API](https://etherscan.io/apis#misc), together with Pandas DataFrames, [plotly](https://medium.com/u/5fdd6522cd45)’s API, and [Project Jupyter](https://medium.com/u/9cdd90635810) notebooks to create this information.

~~I’ll send you the notebook upon request.~~
The notebook is located with the rest of the #ico-analysis article notebooks in [Github](https://gitub.com/corpetty/ICO_analysis).

I looked at the ICO address given above, and pulled all external transactions using into a Pandas Dataframe. These transactions can be viewed online if you click the Etherscan.io link provided above.

I did not do an analysis for each token, **only on the ETH transactions**. This means that the actual numbers in terms of total investment and distribution will be a bit skewed from the ones reported here. It is assumed that the overall behavior is similar for all token investments. This subset makes up the lion’s share of the total investment, so the behavior established by this analysis is extrapolated to other coins as well.

Holler at me if you have a problem with my methodology. I’m not getting paid for any of this, so if you want a breakdown across all tokens and their relative differences… incentivize me (ETH and BTC addresses at the bottom ).

### The Data

#### Over All Tokens:

Below is a table showing the relative contributions from each digital asset accepted. The `value` column is the amount of the respective token invested, and the `evaluated` column is the USD valuation of the token amount (at 78.36 USD/ETH).:

![](/images/medium/1__V2z7oFZnwFBIpxy2__jPpaQ.png)

This information in bar chart form is as follows:

![](/images/medium/1__xuOyY8uiekTWk7SUhsaPiw.png)

From the above information, we can see that TokenCard raised a total of 16,722,425.36 USD, with ETH accounting for **77.91%** of the total.

As stated in the Methodology section, we now move on to only look at the ETH bar from the above information. One can make a case that because ETH makes up such a large percentage, its distribution can be seen as a representative subset of the total distribution. One can also argue to the accuracy of this assumption, but this post is to give a quick look at the distribution of investors (and Etherscan.io doesn’t expose the token transactions in their API, yet, making getting at them slightly more difficult).

#### A Time-series Look at the ICO:

Below is a plot of the individual investments as a function of time, broken up by successful and failed transactions.

![](/images/medium/1__TnkDBRvIWZ1yvXo7YsYqlg.png)

Note that the interactive version contains the successful transactions and failed transactions. You are also capable of zooming and spanning the plot for a better view. I’d love it if I could embed these in [Medium](https://medium.com/u/504c7870fdb6) sometime.

Like the other breakdowns I’ve done, I’ve found it useful to break up the transactions into groups of investors, with each larger group bin being an order of magnitude larger than the previous. In other words:

*   group 0: 0–1 ETH
*   group 1: 1–10 ETH
*   group 2: 10–100 ETH
*   group 3: 100–1,000 ETH
*   group 4: 1,000–10,000 ETH
*   group 5: 10,000–100,000 ETH

Here is the breakdown of the individual groups, `exp_group` is the group number as defined above, `value` is the amount of ETH in the group, `size` is the number of **unique** addresses in the group, and the other two are the respective percentages.

![](/images/medium/1__o__8FnZz68rlQ7OStPbjtQQ.png)

And of course, the bar chart version of this information:

![](/images/medium/1__5LsqDSV9jIGfjqsSOu3NMQ.png)

Although this is not as drastic as what we saw in the [Gnosis auction](https://keepingstock.net/a-look-at-the-gnosis-dutch-auction-distribution-25c2ccac2d9d), we still see a large percentage of TKN sold to only a few investors.

### Some Conclusions Drawn

This is where I discuss what I think, based on the numbers above. Agree with me or not? Cool.

#### What this doesn’t show:

*   This shows only unique addresses, not the identity of the people or people’s associated with them. That means that multiple individual addresses could be a single person or persons, or a single address could be a single person or a very large company. It is more likely that the latter is the case, considering there is no immediately perceived incentive to spreading out the TKNs across multiple addresses (like there would have been for TheDAO). In fact, you increased your chances of failure if you attempted multiple investment transactions, considering the small timeframe in which it was finished.
*   Exchange participation. I have not made an attempt to identify the large addresses, and cross reference them against a known list of exchange addresses. If one were interested, Etherscan.io has address tagging, and keeps a record of most large exchange addresses. One could do this within a small timeframe, but I didn’t. Knowing that a few of the large participants in the ICO are exchange addresses further decentralizes the investor distribution, giving more control to smaller investors than what is immediately perceived by the charts above.

Based on the information above, we can see a continuation of the trend in ICO behavior. That is, the majority chunks going to a few participants, barring availability to many potential investors. If one were to click on the interactive link of the timeseries plot, they’d notice the long tail of failed transactions from would-be investors that got there too late.

From the failed transactions, we can also see that even the incredibly large investors don’t quite get the tech right the first time too, which is a scary thought. We see two failed transactions of the same quantity. This hints that the tech is still difficult to get at, further isolating the pool of would-be investors to people who have a high-threshold level of knowledge about participating using this tech. We’re still growing, building infrastructure to make this available to the general public, but as we do so, we are still a small community of people who actually get this stuff.

The short time windows of the recent ICOs show that they are a hot commodity, but its at the cost of allowing everyone interested to participate. 30 minutes of participation availability is quite small. Yeah, its great to the ICO holders, but at the cost of some of the ideals in the space, namely decentralization.

I have a feeling that the people who build these platforms and have ICOs to fund themselves have a certain vision for how things progress, but are ultimately under the control of large capital investors and market manipulation. These trends could be seen as people with money making artificial scarcity and desire of a platform during early ICOs in order to make a profit when the tokens go into market via exchanges. This could lead to a disregard of actual fundamentals in the platform, giving people false belief in the actual viability of a platform’s ability to do the things they say they want to do.

I’m not saying TokenCard can’t do what they want to do. I actually enjoyed talking to Mel Gelderman in our interview, and am very excited to see TokenCard succeed in the future. I’m only nervous about the trends we’re seeing in the ICOs being done in our ecosystem, and their overall effect of adoption blockchain technology.

### Help a Brother Out

I do this because I’m curious, and feel this type of information is lacking. We need to keep an eye on “where the money comes from” as we build this community out.

As always, come listen to The Bitcoin Podcast and [BlockChannel](https://medium.com/u/211d5b924366) to hear me talk to people in the space about what they’re doing. Our slacks ([TBP](https://thebitcoinpodcast.signup.team/) and [BlockChannel](https://blockchannel.signup.team/)) are always welcome to the community as well. I’m always present in them to talk.

Throw me some duckets of you like what I’m doing, and have some to spare:

![](/images/medium/1__7Yj8YalSMYmZJ5ALAzk__kg.png)

ETH and ERC20 tokens: 0x8F53781799515e5dc8f5D00C528940cAe99aC969

![](/images/medium/1__GaRyRFam9FLWhNikP8GDHw.png)

BTC: 1DXmuHMufPAUEuRUwKMNLqiMqmWQyKmZP6