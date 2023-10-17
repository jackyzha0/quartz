---
title: The Role of Randomness in Proof of Work Mining
description: >-
  I hear people throw shade at idea of Proof of Stake (PoS) protocols quite
  often. I think that most of these comments are founded in false…
date: '2018-04-16T23:06:54.837Z'
categories: []
keywords: []
slug: /@corpetty/the-role-of-randomness-in-proof-of-work-mining-3827a809f745
---

![](/images/medium/1__nkwL8q__9Sz1PMMqT0XFGmg.png)

I hear people throw shade at idea of Proof of Stake (PoS) protocols quite often. I think that most of these comments are founded in false assumptions, which inevitably lead them to false conclusions. That’s a deep amount of work, which requires some groundwork first. This is some groundwork, so this is about abstracting away some of the roles Proof of Work (PoW) plays in blockchain protocols, and looking at how randomness is at the heart of them, and where that randomness comes from. Hopefully in later articles I can get into some PoS implementations and how they relate. Note: “Chaos” is probably a more apt technical definition than “Randomness” in the context of this article, but it is sufficient, and people are more comfortable with the idea of randomness, and not so much with chaos theory.

#### What you should take away from this article:

What role does randomness play in PoW blockchain’s consensus protocol, and how is it manifested.

I’d also like to thank [Bo](https://medium.com/u/dc39367e7049), Evan Van Ness from Week in Ethereum, [Rick Dudley,](https://medium.com/u/b7cdf738a6e1) and my amazing crew at The Bitcoin Podcast for reading through this and giving me comments.

#### Now let’s start

There are two fundamental parts of “blockchain technology.” I might argue myself that there is a more fundamental part, call it part 0, that is the users of the system, but let’s not dive down into that hole for right now.

1.  **The Blockchain Data Structure**  
    This is exactly how the data is put together on computers. When using a “blockchain” data structure, this typically refers to using cryptographic hashes to link the ordering of atomic units (usually called “transactions”). The key idea is that because all information is cryptographically linked, you can pass around the resultant hash ( a SMALL amount of data) of the current state of the blockchain for agreement (a LARGE amount of data), which is both efficient and tamper evident.
2.  **The Consensus Procedure**  
    This is exactly how a group of (potentially adversarial) entities in a network come to agreement on the same data structure, while also deciding on who gets to edit or add onto it.

“Mining” is the basis of 2. while also throwing in other things like validation, asset supply control, and incentivization. The fairness of mining is crucial to the network operating in a trustless manner, which is enabled by PoW. In a very short sense, a miner will apply real world computational resources to try and solve the PoW puzzle. If successful, they gain the right to submit the next block. If they followed all the rules (validated transactions properly), and submit their block to the network before every other miner, their block gets added by the entire network, they get rewarded with the native asset of the blockchain (and some transaction fees), and everyone starts over trying to add the next block.

That is, they use external scarcity for the chance to gain native scarcity in a provably fair way. PoW allows for the automatic democratization of who gets to add to the blockchain while simultaneously providing succinct proof that the submitter pre-allocated a non-trivial amount of resources to gain those rights of submission. This process is typically referred to as “leader selection.”

It is important to realize that PoW is solely based on a hash function, and our trust of this hash function acting as a source of randomness.

### It’s all about “Randomness”

Turns out, the trustlessness of PoW blockchain protocols comes from our trust in the effective psuedo-randomness of a cryptographic hash function, and our current computational inability to break it. Let’s start by defining some crucial properties of a cryptographic hash function:

*   **The hash size is fixed**  
    This means that no matter how big the piece of data to be hash is, the resultant hash is always the same size.
*   **It is a one-way function**  
    This means you can only get a hash from data, and not data from a hash. This is the part people would LOVE to break in cryptography. This is hard to break with current and near-future computers. Eventually, general purpose quantum computers will be able to crack this property, but that’s not for a long time.
*   **It is efficient**  
    This means that calculating a hash from data doesn’t take much computational time or effort. It doesn’t make sense to compare hashes if the time it takes to create the hashes for comparison is about the same time it would take just to compare the original data.
*   **The resultant hash is unique**  
    This means that if the data to be hashed is different, then so is the hash, always. This allows a hash to be like a fingerprint for a piece of data.
*   **It is chaotic**  
    This means that if you change the data, even in the slightest, minuscule way (like changing a single letter in an encyclopedia), the hash will be changed in a non-deterministic way and will be completely different.

The last property is where our randomness comes from in PoW. The chaotic nature of what a resultant hash looks like is solely what allows PoW to function properly. This assumption of randomness is why we can say if you throw more computational effort at calculating hashes, you have a better chance of “mining a block” in bitcoin, because your spending more energy to make more random guesses than the next guy.

PoW mining is adding a nonce (just a number) to the hash of their candidate block’s header, and seeing if the resultant hash is below a target number which is called the difficulty. At a surface level, this means the hash has (at least) a certain number of zeroes at the beginning of it. If it does, they’ve won! If it doesn’t they change the nonce and try again, on repeat, until they get it or someone else does. What is important here is if the resultant hash isn’t random or can be gamed, then the whole thing falls apart.

By increasing the difficulty (number of required zeroes at front of resultant hash), you increase the **average** number of attempts someone has to try to get the desired hash, which corresponds to a real world amount of energy and resources being applied. This amount of energy is basically an entry ticket to play the game of securing the network. If you aren’t following the rules, your energy is wasted.

Because we can now simply rely on the PoW proof when blocks are submitted, PoW blockchains apply the rule of “the longest chain wins.” It doesn’t matter who submitted what; As long as that chain spent the most external resources and follows all the rules, it is deemed the correct chain. **_This is a direct consequence of our trust on the randomness of the underlying hashing algorithm._** To reiterate, PoW blockchains like Bitcoin elect the first valid leader automatically, without question, because it is assumed they spent the appropriate amount of resources to incentivize them to play by the rules.

### Liberties granted because PoW has this trusted randomness:

Because we can reliably know that a block-submitter has also put forth a substantial amount of real world resources, it affords us a few other things (non-exhaustive):

*   Methods of Inflation/Incentivization
*   A completely open network
*   Automated leader election
*   Mitigating the issue of a dropped leader

### So let’s take that away:

This is where things get tricky for PoS protocols. They no longer have an **exterior** resource to put at stake up front to try and win the game. If we take the PoW puzzle away, PoS has to try and fulfill the following roles in consensus:

*   How to properly elect people to submit candidate blocks
*   How to weight the vote of validation
*   Agreeing on the “correct” chain

If a PoS protocol can sufficiently answer these problems through game theory, cryptography, and mathematics, then it could potentially drastically improve the efficiency in which blockchain consensus is done.

### What to do from here? Choose your own adventure!

There is a ton more to dive into from here, but I’ve been sitting on this draft for months not doing it. So let’s just get this out and see what people have to say. Leave comments on your agreements, vehement disagreements, confusions, questions, etc.

I will write more on what the general consensus is from YOU! So that means without feedback I probably won’t feel compelled to write more.

If you like it, you can also tip me at the following addresses, because I’m certainly not paid for this, and so I shall shill myself…. oh yeah, listen to me on [The Bitcoin Podcast](http://thebitcoinpodcast.com), [BlockChannel](https://medium.com/u/211d5b924366), and [Hashing It Out!](http://hashingitout.stream)

Here is my Binance affiliate link, I get a portion of your trade profits, so do good!  
[https://www.binance.com/?ref=15791278](https://www.binance.com/?ref=15791278)

![](/images/medium/1__7Yj8YalSMYmZJ5ALAzk__kg.png)

ETH and ERC20 tokens: 0x8F53781799515e5dc8f5D00C528940cAe99aC969

![](/images/medium/1__GaRyRFam9FLWhNikP8GDHw.png)

BTC: 1DXmuHMufPAUEuRUwKMNLqiMqmWQyKmZP6