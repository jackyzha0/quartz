---
title: 'The DAO: What happened, Who did it, Where do we go?'
description: >-
  It’s clear something tremendous has happened to the cryptocurrency
  environment, and it’s not the good kind of something. You’re about to be…
date: '2016-06-19T02:09:37.668Z'
categories: []
keywords: []
slug: /@corpetty/the-dao-what-happened-who-did-it-where-do-we-go-4897d7864e
---

It’s clear something tremendous has happened to the cryptocurrency environment, and it’s not the good kind of something. You’re about to be inundated with a large amount of coverage about all things crypto from many sources, and a lot of it will probably be garbage.

> An opinion is only worth the facts that are used to form it.

In other words, if nothing concrete is backing the things coming out of your mouth, then you’re spewing bullshit, and your opinion doesn’t matter. I spend the majority of my time vetting the information I receive and trying to get to the bottom of things from a purely factual standpoint.

Since raw data simply can’t be wrong, but the opinions that are derived from it can, we’ve created the #dao\_data channel in The DAO slack to try and answer peoples’ questions about facts and dig deep into the blockchain to figure out what’s going on. If you care about these things, join us — we need more people who care.

If anything, those of us who are attempting to get to the bottom of this should coordinate so that we are not too redundant with our efforts.

#### What happened?

For those who haven’t quite figured out what happened, a known bug was taken advantage of to continuously extract more ether from the DAO than what the caller’s address has control of. The bug was labeled the “race-to-empty” bug (described in detail [here](http://vessenes.com/more-ethereum-attacks-race-to-empty-is-the-real-deal/)) and The DAO noted and started working on it immediately (detailed [here](https://forum.daohub.org/t/bug-discovered-in-mkr-token-contract-also-affects-thedao-would-allow-users-to-steal-rewards-from-thedao-by-calling-recursively/4947)). They had already implemented a fix for DAO v1.1, but nothing was done to mitigate the risk until then, which is way more difficult than it sounds (probably, I’m not sure).

If you don’t feel like mucking through the weeds, this is a very subtle bug that presents itself between the translation step of someone writing in the “high-level” Solidity code that turns human-readable smart-contracts into the language that the computer wants, bleeps-and-bloops. If the human-readable code isn’t written VERY carefully, then the order in which things are done after that point may be handled slightly incorrectly, resulting in a very terrible accounting error.

If performed once, you can extract double what your address says you hold. But what if you nest the function calls inside of one another, so a function call essentially calls itself? You can create a loop that continues to extract the amount of money associated with your account before the contract ever gets a chance to zero-out your account balance and until you run out of gas (this is called recursion, look it up, it can be quite brain-racking).

If you DO want some weeds, [here](https://redd.it/4onbkj) is an article describing things in more detail (with code). Make sure to read the comment section for any discrepancy between the article and possible typos.

#### Who did it?

For now, since it’s quite difficult to put a name or identity to a cryptocurrency address, I’ll just call the attacker(s) Mr. Fuckface (I chose Mr. cause I’m sexist, and women are awesome). Before I go into the details of Mr. Fuckface, I’d like to point out that other people are also looking deeply into this, including all actions leading up to the attack, as well as subsequent movement. [Johannes Pfeffer](https://medium.com/u/5e39a537d496), for one, is doing a fantastic job of visualizing this information, and his recent blog post (linked below) will be continuously updated as he learns more.

[**The rise of the Dark DAO**  
_Today a new force has risen: “The Dark DAO”. Here, I will visually analyze what happened after 2016–06–17 03:34:48 UTC._medium.com](https://medium.com/@oaeee/the-rise-of-the-dark-dao-72b21a2212e3 "https://medium.com/@oaeee/the-rise-of-the-dark-dao-72b21a2212e3")[](https://medium.com/@oaeee/the-rise-of-the-dark-dao-72b21a2212e3)

More of us are coordinating in the #dao\_data slack channel to learn as much as we can.

[Here](http://etherscan.io/token/thedao-proposal/59) is the split proposal that was used to do the attack. You can find all addresses associated with the attack, who voted on it, etc, there. For those of you who don’t like clicking on things while reading an article, here is a list of the things you can find in just about every other “DAO attack article.”

*   Creator of the childDAO (attacker): [0x4a574510c7014e4ae985403536074abe582adfc8](https://etherscan.io/address/0x4a574510c7014e4ae985403536074abe582adfc8)
*   childDAO address:   
    [0x304a554a310c7e546dfe434669c62820b7d83490](http://etherscan.io/address/0x304a554a310c7e546dfe434669c62820b7d83490)
*   Two controllers of the childDAO:  
    [0xc0ee9db1a9e07ca63e4ff0d5fb6f86bf68d47b89](http://etherscan.io/address/0xc0ee9db1a9e07ca63e4ff0d5fb6f86bf68d47b89)  
    [0xf835a0247b0063c04ef22006ebe57c5f11977cc4](http://etherscan.io/address/0xf835a0247b0063c04ef22006ebe57c5f11977cc4)

There are a few other addresses, one of which has sent a signed notice to the community threatening legal action if his “legitimate ether” is taken away from him (douche)… You can find that [here](https://www.reddit.com/r/TheDao/comments/4opba6/apparently_open_letter_from_an_attacker_was/).

#### Where do we go?

There seem to be two main camps of solutions for going forward: A soft-fork solution or a soft-then-hard-fork solution. Let’s be clear here — these two solutions are talking about **changing the Ethereum blockchain/mining software to fix The DAO’s problem.**

**Soft Fork:**

The soft-fork solution proposes to essentially lock the stolen funds so that they simply can’t be spent. It is a small update to the mining software in the Geth client that includes a flag which ignores submitted blocks with any trace of interacting with these funds. More specific details can be found [here](https://github.com/ethereum/go-ethereum/pull/2715). The community (of miners) then decides whether or not they support this by enabling or disabling the flag. It should be noted that **_ALL_** ether are frozen, not just the stolen ones. This is an effort to at least stop any further threat to occur, and to give more time to discuss further options.

**Hard Fork:**

The hard-fork solution is a proposed next-step after the soft-fork to return all Ether in The DAO to its original owner. Essentially, it would hardcode all associated ether from the end of the DAO creation phase into a new contract which has only a single function: withdrawal. This, in essence, dissolves The DAO, wipes the slate clean, and moves forward, with almost zero-harm done (directly) to those who participated in The DAO experiment. Below is EthCore’s initial response and description, as well as Slock.it’s recent blog post describing the same things (as well as their opinions).

[**Attack on The DAO: What will be your response?**  
_Two days ago a flaw was spotted in the contract code of theDAO - specifically a recursive call issue that exists in the…_blog.ethcore.io](https://blog.ethcore.io/attack-on-thedao-what-will-be-your-response/ "https://blog.ethcore.io/attack-on-thedao-what-will-be-your-response/")[](https://blog.ethcore.io/attack-on-thedao-what-will-be-your-response/)

[**What the ‘Fork’ Really Means**  
_In the last 36 hours we have witnessed an attack on The DAO._blog.slock.it](https://blog.slock.it/what-the-fork-really-means-6fe573ac31dd "https://blog.slock.it/what-the-fork-really-means-6fe573ac31dd")[](https://blog.slock.it/what-the-fork-really-means-6fe573ac31dd)

Others have said we should do nothing because the underlying protocol should be agnostic to the applications that are built on top. Under this line of reasoning, if you build something that isn’t secure, you will suffer the consequences and pay for the resulting lessons. If you feel that way, either of these options still allows you to express that sentiment.

You can stop reading now if you don’t care what I think about any of this. I’ve tried to present everything so far without too much personal bias. Now I’ll tell you how I feel about it based on everything I’ve read and found.

#### Personal Opinions:

Let’s start with the obvious: the attacker can go fuck himself. If you side with him, send me a link explaining why you think he’s right, and then I’ll actually go into detail on why you can go fuck yourself as well.

It appears Ethereum has grown up a bit, considering it has now found itself with a large problem and multiple roads to take for fixing it. The governance model of Ethereum will be tested here, and how things proceed will shape the view of Ethereum stability as a whole, which will, of course, be extrapolated to cryptocurrency as a whole by on-lookers.

We should tread carefully here.

The soft-fork “stop-gap” solution is elegant, and the proposed hard-fork solution is incredibly simple and straight forward as far as hard-forks go. It doesn’t rollback anything; it doesn’t change any way in which Ethereum fundamentally works; it doesn’t change anything that people on the Ethereum network have done, except with those who have interacted with The DAO.

On the other hand, doing a hard-fork sets a precedent for saving bad code. I am a token holder, and I want my money back, personally, but I also don’t want the message of Ethereum to be “write terrible code, don’t worry, we got you.” This is a valuable lesson in security, which should not be taken lightly. I put money into something I believed (and still do) will be the future of money. It had a fault, someone took advantage of it, and now we move on.

For the record, I still support the hard-fork solution simply because it is an elegant solution that ONLY thwarts Mr. Fuckface, and I’m for that. But from now on, we need to be MUCH more careful in how we go about the next DAO, because there most certainly will be one, and I will be part of it.

Dr. Emin Gün Sirer has recently written on the attack and how it relates to the concept of programming smart-contracts:

> “I believe that Ethereum, overall, will emerge from this in a few weeks, having been made much stronger as a result. It will have a newfound direction and charter that involves a slight pivot, away from “let’s get DApps at all costs, let’s make front-end programmers into smart contract writers,” towards “let’s build up the science of secure, smart contracts.”

[**Thoughts on The DAO Hack**  
_We just lived through the nightmare scenario we were worried about as we called for a moratorium on The DAO: someone…_hackingdistributed.com](http://hackingdistributed.com/2016/06/17/thoughts-on-the-dao-hack/ "http://hackingdistributed.com/2016/06/17/thoughts-on-the-dao-hack/")[](http://hackingdistributed.com/2016/06/17/thoughts-on-the-dao-hack/)

This idea, the “science of secure, smart contracts,” is what I find to be incredibly important. The current culture of programming is to not worry about the details, but to create things that are pretty while using someone else’s framework. When dealing with multiple millions of dollars, **_we’ve got to do better._** If anything, The DAO has shown us that subtle details must be taken into account when programming things that handle money, and we have to be sure that the contracts we create are doing the things we intend and nothing else.

#### Things to Consider:

*   We need to look for abnormally large Ether shorts placed on exchanges around the time of the attack. The attackers underlying motivation could have been to simply short the price of ether. If he was smart enough to perform the attack, he was also smart enough to know he’d make huge waves, and not be able to touch his money quickly.
*   We need to watch for abnormally large amounts of DAO tokens being gobbled up if The DAO stays alive. This seems to not be one of the current options, but if it does end up being one, the attacker’s initial motivation could have been to shake confidence, and then accumulate large amounts of a seriously large fund. It is shown in the history of the attacker’s addresses that they already controlled a large amount of ether.
*   We need to watch the known addresses associated with the attack, and who they’re interacting with. Any interaction with known addresses gives us more information on Mr. Fuckface.

#### Some “No Shit” Things

1.  Putting so much ether into a single contract was a risk.
2.  The outcome of this single event will affect Ethereum and cryptocurrency as a whole, forever.
3.  Some people are probably gonna lose some money because assholes exist.

### About the author

![](/images/medium/1__J3UkG8G7GPGmiVm2iVawTA.png)

Corey Petty is a co-founder and host of [The Bitcoin Podcast](http://www.thebitcoinpodcast.com), an approachable conversation to the cryptocurrency revolution.

He holds a PhD in computational chemical physics and currently does research in Brazil, specifically studying rovibrational spectroscopy of ozone isotopologues (wordy).

As a hobby, he studies data science techniques and how they can be applied to the blockchain, specifically for visualizing complex information to help people understand what’s really going on.

TheDAO slack: @petty   
email: petty _dot_ btc _at_ gmail _dot_ com  
reddit: /u/pettyhoe