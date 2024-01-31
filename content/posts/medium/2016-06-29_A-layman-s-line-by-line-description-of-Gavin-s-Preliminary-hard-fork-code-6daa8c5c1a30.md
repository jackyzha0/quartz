---
title: A layman’s line-by-line description of Gavin’s Preliminary hard-fork code
description: >-
  Here I will attempt to perform a line-by-line description of Gavin’s recent
  preliminary hard-fork code submitted to github, which can be…
date: '2016-06-29T17:08:25.239Z'
categories: []
keywords: []
slug: >-
  /@corpetty/a-laymens-line-by-line-description-of-gavin-s-preliminary-hard-fork-code-6daa8c5c1a30
---

Here I will attempt to perform a line-by-line description of Gavin’s recent preliminary hard-fork code submitted to github, which can be found [here](https://github.com/ethcore/parity/pull/1483/files). I am not a Rust coder, but I have experience with low-level programming languages (Fortran, C), and high-level scripting languages (Python, R, Bash), so I feel I have a pretty good idea what’s going on.

It is important that everyone understand what the code is doing, regardless of whether or not they can read code. If you catch a mistake, LET ME KNOW, so I can change it. This is an open invitation to code nazi’s to correct my description, something you people don’t get very often.

In all, Gavin submitted changes to 3 files in the Parity client: _account.rs_, _ethash.rs_, and _states.rs._ We’ll go through each one separately.

#### account.rs

![](/images/medium/1__S3HhwMykwyYAKvaCKPJLFg.png)

The account.rs file has two sections with additions to it. He creates a function, and then creates a test for that function (good programming practices) Let’s start with what that function does.

First off, we can see that this is inside the Account structure, which means that anything written here becomes a variable or function attributed to a created account. For example: \`account.balance\` would yield the account’s balance.

*   **Line 111:** A comment specifying what this function is supposed to do. This function is supposed to change a given account’s programming code with a given programming code.
*   **Line 112:** Here we actually make the function definition of \`reset\_code\` that takes all predefined variables and methods associated with the parent (Account) and the new code we want to implement, called \`code\`, as bytes.
*   **Line 113:** Here we essentially delete the hash of the account’s old code, by setting it to \`None\`
*   **Line 114–115:** Now we re-run the function \`init\_code\` with the new code we want to implement. \`init\_code\` is defined elsewhere in the Account struct, and is passed to this function through the \`self\` object. The end bracket just ends the definition of our new function \`reset\_code\`.

![](/images/medium/1__7EvfjOqLbqcBUb8ms8jODg.png)

This section of changes is a test function to test the above newly defined \`reset\_code\` function we’ve just talked about. I will skip the line-by-line definition of this part, because it isn’t adding new functionality. Please note that I am not discarding this as not important, **_it is incredibly important_**. It just isn’t new functionality, it is only checking to make sure the previously defined new functionality works as intended.

#### ethash.rs

![](/images/medium/1__TUSpqzZLCv07h1j4t__uJdw.png)

*   **Line 135:** This creates a new function called \`on\_new\_block\` which takes in all variables and methods previously set on the parent \`ethash\` referred to as \`self\`. It also takes in the new block, and all its respective variables and methods called \`block\`.
*   **Line 136:** This sets the block number in which the hard fork would take place in the future to a variable appropriately called \`dao\_fork\_blknum\`.
*   **Line 137:** This sets the variable \`main\_dao\` to the address of “TheDAO” for later use.
*   **Line 138:** This creates a vector (list of things) of child DAO addresses called \`child\_daos\`, which will be used later.
*   **Line 139:** This sets a new variable \`new\_dao\_code\` which will eventually be filled with the contract code that will replace TheDAO’s original bugged code, to allow people to only retrieve their ether.
*   **Line 140:** This line places a comment to remind people that something needs to be done here. In particular, a “check trigger function” needs to be placed here. Presumably to make sure everything has been set up correctly.  
    Please someone correct me here.
*   **Line 141:** Here, if the header number of the new block is equal to the dao fork block number, then continue. Otherwise, skip. This is saying essentially do nothing until the predefined \`dao\_fork\_blknum\` has been reached.
*   **Line 142:** Next, if you’ve reached \`dao\_fork\_blknum\`, check to see if the gas limit of the incoming block is less than or equal to 4,000,000. If so, continue to the next indented line.
*   **Line 143:** assuming the previous line was True, then we define the variable \`state\` to be the same as the incoming blocks \`state\`. Probably just a way to not have to type out all that for later use.
*   **Line 144:** This is the beginning of a loop, which incrementally goes through all child daos previously defined in \`child\_daos\` and assigns the current selection in the iteration to the variable \`child\`. All further indented code will apply to the variable \`child\` until the end of the loop. You can think of this saying “apply the indented code to all things in our list of child daos.”
*   **Line 145:** Here we define a new variable \`b\` set to the balance of the currently selected child dao, \`child\`.
*   **Line 146–147:** We then transfer whatever funds that are in the child dao \`child\` back into the “TheDAO” (\`main\_dao\`). The end bracket means its the end of the above loop, which means we’re finished with one iteration of the loop. We go back up to the definition, select the next child dao in the list, and do the same steps.   
       
    _The end effect of this loop is that all ether from all child daos are placed back into the main dao._
*   **Lines 148–151:** Now that all funds are back in the dao, this line changes the byte code of the main dao to some new code \`new\_dao\_code\`. This code has yet to be determined, so this is essentially the skeleton of the hard fork, with the real meat to be determined. We saw the definition of this function \`reset\_code\` previously.

#### state.rs

![](/images/medium/1__N1__V__WTCsPrswbtQFhrdGw.png)

*   Line 211: This just changes wording of comments to be consistent with other changes.
*   Line 217: This is a comment line letting us know what the new function is supposed to do. This new function is supposed to reset the code of account \`a\` (an input) to newly defined code \`code\` (also an input).
*   Line 218: New function definition line. Note that the \`self\` of this change is NOT the same as the \`self\` we saw earlier. It is all the variables and methods that are associated with it’s parent, which in this case is the State struct. The previous \`self\` we just finished discussing was associated with the Ethereum Engine implementation, and the first \`self\` was associated with the Account struct. If this is confusing, ask and I’ll explain more.
*   Line 219–220: This is a little more complicated of a line. This line will call the previously defined \`reset\_code\` function we have already discussed, but **_if and only if_** the account meets certainly criterion.   
       
    I would need a bit of help with this one. I have not dug deep enough before to understand the logic of what **_exactly_** \`require\_or\_from\` is doing. To speculate may lead to completely incorrect assumptions.

Despite the previous sentence, I will guess anyway. In essence, I believe this is simply making sure all things associated with the state of the EVM is properly checked and correct, before reseting the code of the account.

I’ll update this as I receive corrections, and then reference to it when the actual new contract code for TheDAO is submitted, and I write about that. Enjoy

Edits:

*   changed “Solidity coder” to “Rust coder.” These changes are to the Parity client, which is programed in Rust, a low-level language that can be compared to Fortran and C, and not in Solidity, one of the languages used for creating smart contracts. — credit to [/u/bernardoslr](https://www.reddit.com/user/bernardoslr) from reddit.

### About the author

![](/images/medium/1__J3UkG8G7GPGmiVm2iVawTA.png)

Corey Petty is a co-founder and host of [The Bitcoin Podcast](http://www.thebitcoinpodcast.com), an approachable conversation to the cryptocurrency revolution.

He holds a PhD in computational chemical physics and currently does research in Brazil, specifically studying rovibrational spectroscopy of ozone isotopologues (wordy).

As a hobby, he studies data science techniques and how they can be applied to the blockchain, specifically for visualizing complex information to help people understand what’s really going on.

TheDAO slack: @petty   
email: petty _dot_ btc _at_ gmail _dot_ com  
reddit: /u/pettyhoe   
twitter: @corpetty