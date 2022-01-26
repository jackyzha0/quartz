---
title: Login Functionality
---

Contents:
- [Login scene](#login-scene)
  - [Meta](#meta)
  - [Plan](#plan)
- [Database & API](#database--api)

# Login scene
## Meta
[Notion Page](https://skinetics.notion.site/Login-Scene-699322f197b449099b837b636f942dcc)
[Public docs](https://docs.skinetics.tech/699322f197b449099b837b636f942dcc)
[Unity-Demo#5](https://github.com/signal-k/unity-demo/issues/5); [Unity-Demo#6](https://github.com/signal-k/unity-demo/issues/6)

## Plan
Plan: let’s create a bit of a scene (after the player finishes the “orientation” or tutorial mission) where they log in to their wallet. Let’s also allow them to connect to an email address (as a backup).

Start by integrating with Metamask before moving it to Moralis, allowing users to input an email address, username, and then a “profile” [(what they look like)](https://assetstore.unity.com/publishers/40050).

Connecting email accounts to game wallet: [Fortmatic](https://betterprogramming.pub/enable-your-dapp-users-to-log-in-using-their-email-address-or-phone-number-c6d3b03a5b62)

Some other questions we need to think about:

- What happens if someone’s account is compromised? To transfer assets and progress, will we require proof of ID?
    - How does this work in relation to email account signups → do we only allow from 99% safe providers?
- Can we use smart contracts for quests? Look more into some of the JS/Solidity game projects

Note: I’ve removed the Moralis SDK for now as it was causing compile issues with the current Unity scene (metamask setup)

# Database & API
(How does this integrate with the login function?)

I’m setting up a scriptable objects db, using the current player controller (with camera attached) (I’ll create a new character later).

I don’t know if the current one works for multiplayer, but either way let’s look into a [node & python api for this later integration](https://www.youtube.com/watch?v=zd0pBsmJI8s).

<script src="https://giscus.app/client.js"
        data-repo="signal-k/unity-demo"
        data-repo-id="R_kgDOGGIbwA"
        data-category-id="DIC_kwDOGGIbwM4CAz-P"
        data-mapping="pathname"
        data-reactions-enabled="1"
        data-emit-metadata="0"
        data-theme="light"
        data-lang="en"
        crossorigin="anonymous"
        async>
</script>