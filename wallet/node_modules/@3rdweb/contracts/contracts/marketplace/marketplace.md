# Marketplace

This is a live document that explains what the [thirdweb](https://thirdweb.com/) `Marketplace` smart contract is, and how it works and can be used, and why it is written the way it is. 

The document is written for technical and non-technical readers. To ask further questions about `Marketplace`, please join the [thirdweb discord](https://discord.gg/thirdweb) or create a github issue.

---
## Background

The [thirdweb](https://thirdweb.com/) `Marketplace` is a market where where people can either sell NFTs — [ERC 721](https://eips.ethereum.org/EIPS/eip-721) or [ERC 1155](https://eips.ethereum.org/EIPS/eip-1155) tokens — at a fixed price ( what we'll refer to as a "Direct listing"), or auction them (what we'll refer to as an "Auction listing").

### Direct Listings
An NFT owner (or 'lister') can list their NFTs for sale at a fixed price. A potential buyer can buy the NFT for the specified price, or make an offer to buy the listed NFTs at a different price, which the lister can choose to accept.

To list NFTs for sale, the lister specifies —

| Parameter | Description |
| --- | --- |
| `assetContract` | The contract address of the NFTs being listed for sale |
| `tokenId` | The token ID on the 'assetContract' of the NFTs to list for sale. |
| `startTime` | The unix timestamp after which NFTs can be bought from the listing. |
| `secondsUntilEndTime` | The number of seconds after which NFTs can no longer be bought from the listing. |
| `quantityToList` | The amount of NFTs of the given 'assetContract' and 'tokenId' to list for sale. For ERC721 NFTs, this is always 1.  |
| `currencyToAccept` | The address of the currency accepted by the listing. Either an ERC20 token or the chain's native token (e.g. ether on Ethereum mainnet). |
| `buyoutPricePerToken` | The price per unit of NFT listed for sale. |

To make an offer to a direct listing, a buyer specifies —

| Parameter | Description |
| --- | --- |
| `listingId` | The unique identifier of the listing to buy NFTs from. |
| `quantityWanted` | The quantity of NFTs from the listing for which the offer is made. For ERC721 NFTs, this is always 1.  |
| `pricePerToken` | The offered price per token. |
| `currency` | The currency in which the offer is made. |

The listed NFTs do not leave the wallet of the lister until a sale is executed with the seller and buyer's consent. To list NFTs for sale, the lister must own the NFTs being listed, and approve the market to transfer the NFTs. The latter lets the market transfer NFTs to a buyer who buys the NFTs for the accepted price.

When making an offer to a direct listing, the offer amount is not escrowed in the Marketplace. Instead, making an offer requires the buyer to approve Marketplace to transfer the appropriate amount of currency, to let Marketplace transfer the offer amount from the buyer to the lister, in case the lister accepts the buyer's offer.

A sale is executed when either a buyer pays the fixed price, or the seller accepts an offer made to the listing.

### Auction listings

An NFT owner (or 'lister') can auction their NFTs. Potential buyers make bids in the auction. At the closing of the auction, the buyer with the wining bid gets the auctioned NFTs, and the lister gets the winning bid amount.

To list NFTs in an auction, a lister specifies —

| Parameter | Description |
| --- | --- |
| `assetContract` | The contract address of the NFTs being auctioned. |
| `tokenId` | The token ID on the 'assetContract' of the NFTs being auctioned. |
| `startTime` | The unix timestamp after which NFTs can be bought from the listing. |
| `secondsUntilEndTime` | The number of seconds after which buyers can no longer make bids to the auction. |
| `quantityToList` | The amount of NFTs of the given 'assetContract' and 'tokenId' to put up for auction. For ERC721 NFTs, this is always 1.  |
| `currencyToAccept` | The address of the currency accepted by the auction. Either an ERC20 token or the chain's native token (e.g. ether on Ethereum mainnet). |
| `rerservePricePerToken` | All bids made to this auction must be at least as great as the reserve price per unit of NFTs auctioned, times the total number of NFTs put up for auction. |
| `buyoutPricePerToken` | An optional parameter. If a buyer bids an amount greater than or equal to the buyout price per unit of NFTs auctioned, times the total number of NFTs put up for auction, the auction is considered closed and the buyer wins the auctioned items. |

Every auction listing obeys two 'buffers' to make it a fair auction:

1. **Time buffer**: this is measured in seconds (e.g. 15 minutes or 900 seconds). If a winning bid is made within the buffer of the auction closing (e.g. 15 minutes within the auction closing), the auction's closing time is increased by the buffer to prevent buyers from making last minute winning bids, and to give time to other buyers to make a higher bid if they wish to.
2. **Bid buffer**: this is a percentage (e.g. 5%). A new bid is considered to be a winning bid only if its bid amount is at least the bid buffer (e.g. 5%) greater than the previous winning bid. This prevents buyers from making *very slightly* higher bids to win the auctioned items.

These buffer values are contract-wide, which means every auction conduction in the Marketplace obeys, at any given moment, the same buffers. These buffers can be configured by accounts with the `DEFAULT_ADMIN_ROLE` role.

The NFTs to list in an auction *do* leave the wallet of the lister, and are escrowed in the market until the closing of the auction. Whenever a new winning bid is made by a buyer, the buyer deposits this bid amount into the market; this bid amount is escrowed in the market until a new winning bid is made. The previous winning bid amount is automatically refunded to the respective bidder. 

**Note:** As a result, the new winning bidder pays for the gas used in refunding the previous winning bidder. This trade-off is made for better UX for bidders — a bidder that has been outbid is automatically refunded, and does not need to pull out their deposited bid manually. This reduces bidding to a single action, instead of two actions — bidding, and pulling out the bid on being outbid.

Once the auction window ends, the seller collects the highest bid, and the buyer collects the auctioned NFT.

### Main difference in treatment: Direct vs Auction listings

The main difference in how we treat 'direct listings' versus 'auction listings' concerns the level of commitment from the seller and buyers.

- **Direct listings** are *low commitment*, high frequency listings; people constantly list and de-list their NFTs based on market trends. So, the listed NFTs and offer amounts are *not* escrowed in the Marketplace to keep the seller's NFTs and the buyer's currency liquid. Allowing users to list NFTs for sale just by approvals gives them the freedom to list the same NFT in multiple marketplaces, e.g. this `Marketplace` contract, OpenSea, etc. at the same time.
- **Auction listings** are *high commitment*, low frequency listings. The seller and bidders respect the auction window, recognize that their NFTs / bid amounts will be illiquid for the auction duration, and expect a guaranteed payout at auction closing — the auctioned items for the bidder, and the winning bid amount for the seller. So, tokens listed for sale in an auction, and the highest bid at any given moment *are* escrowed in the market.

### Why we're building this Marketplace

The current [thirdweb Market contract](https://github.com/nftlabs/nftlabs-protocols/blob/main/contracts/Market.sol) has the following critical pitfalls -

- Sellers cannot conduct auctions.
- NFTs listed for sale in a direct listings are locked in the contract.
- Buyers cannot make offers to direct listings.

These are features that are already offered by popular marketplaces like [OpenSea](https://opensea.io/) and [OurZora](https://zora.co/). We have an opportunity to consolidate all these features into a single smart contract, so thirdweb's users can *truly* have their own OpenSea and more.

We're building this for customers who want to list their NFTs for sale on their *own* market that lives within the thirdweb stack, rather than use an external market, which adds to their stack and becomes one additional headache to handle.

[https://twitter.com/chriscantino/status/1463186059437568001?s=20](https://twitter.com/chriscantino/status/1463186059437568001?s=20)

### What the Marketplace will look like to users

There are two groups of users — (1) thirdweb's customers who'll set up the marketplace, and (2) the end users of thirdweb customers' marketplaces.

To thirdweb customers, the `Marketplace` can be set up like any of the other thirdweb module (e.g. 'NFT Collection') through the thirdweb dashboard, the thirdweb SDK, or by directly consuming the open sourced marketplace smart contract.

To the end users of thirdweb customers, the experience of using the marketplace will feel familiar to popular marketplace platforms like OpenSea and Zora. The biggest difference in user experience will be that performing any action on the marketplace requires gas fees.

- Thirdweb's customers
    - Deploy the market like any other thirdweb module.
    - Can set a % 'market fee'. This % is collected on every sale — when a buyer buys tokens from a direct listing, and when a seller collects the highest bid on auction closing. This market fee is distributed to the royalty treasury of the Marketplace, which is set in the project (the top level [`ProtocolControl`](https://github.com/nftlabs/nftlabs-protocols/blob/main/contracts/ProtocolControl.sol) contract) that the Marketplace belongs to.
    - Can set auction buffers. These auction buffers apply to all auctions being conducted in the market.
- End users of thirdweb customers
    - Can list NFTs for sale at a fixed price.
    - Can edit an existing listing's parameters, e.g. the currency accepted. An auction's parameters cannot be edited once it has started.
    - Can make offers to NFTs listed for a fixed price.
    - Can auction NFTs.
    - Can make bids to auctions.
    - Must pay gas fees to perform any actions, including the actions just listed.

## Technical details

At a high level, we want `Marketplace` to be a single, compact smart contract that supports all features related to both direct listings *and* auction listings.

To write the feature-rich Marketplace contract without exceeding the code size limit of smart contracts, we leverage the similarity in the concepts required by direct and auction listings.

| Listing type | Concepts for a listing on the market |  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
|  | start time | end time | quantity of tokens listed | currency accepted by listing | reserve price: minimum bid amount | buyout price: price to pay to directly buy the token listed | limit for the amount of tokens a single buyer can buy from the listing | Type of token listed: ERC721 or ERC1155 |
| Direct | ✅ | ✅ | ✅ | ✅ | ❌ | ✅ | ✅ | ✅ |
| Auction | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ✅ |

As we can see, the parameters that make up a direct listing and an auction listing are highly similar. So, we use common data structures and functions to handle direct listing and auction listing features. This means e.g. a single function can have multiple behaviors based on which actor calls it, when they call it, and the listing type of the listing in question.

The same goes for offers to direct listings, and bids made in an auction. The parameters for offers to direct listings and bids made in an auction are identical.

| Offer type | Concepts for an offer |  |  |  |
| --- | --- | --- | --- | --- |
|  | Offeror: the account making the offer | quantity wanted from the listing | total offer amount | currency in which the offer is made |
| Bid | ✅ | ✅ | ✅ | ✅ |
| Offer to direct listing | ✅ | ✅ | ✅ | ✅ |

An so, we use common data structures and functions to handle offers to direct listings and bids to auctions. Though the two types of offers share the same concepts, they require different logic. This again means e.g. a single function can have multiple behaviors based on which actor calls it, when they call it, and the listing type of the listing in question.

### Design strategy for `Marketplace`

The `Marketplace` smart contract works with two main concepts — (1) direct listings + offers, and (2) auctions + bids.

We use common functions and data structures wherever an (1) action is common to both concepts and (2) the data to manage for that action is common to both concepts.

**Example**: Common action and data handled.

- Action: creating a listing | Data: `ListingParameters` ([code](https://github.com/nftlabs/nftlabs-protocols/blob/v2-market/contracts/v2/IMarket.sol#L26))
- There is a single [`createListing`](https://github.com/nftlabs/nftlabs-protocols/blob/v2-market/contracts/v2/MarketWithAuction.sol#L131) function to create both a direct listing, or an auction.

Although the concepts used for (1) direct listings + offers, and (2) auctions + bids is similar, the logic required to the two is generally different. For example —

- One calls the *same* `offer` function to make an offer to a direct listing, or to make a bid in an auction. Internally, the smart contract uses different logic to handle each of the two cases.
- An auction has the concept of formally being closed whereas a direct listing does not. On auction closing, both the lister and winning bidder call can call `closeAuction` to collect the winning bid, and the auctioned items, respectively. There is no such corollary in the case of direct listings.

### EIPs implemented / supported

To be able to escrow NFTs in the case of auctions, Marketplace implements the receiver interfaces for [ERC1155](https://eips.ethereum.org/EIPS/eip-1155) and [ERC721](https://eips.ethereum.org/EIPS/eip-721) tokens. 

To enable meta-transactions (gasless) for all external+public functions of the contract, Marketplace implements [ERC2771](https://eips.ethereum.org/EIPS/eip-2771). 

Marketplace also implements [ERC2981](https://eips.ethereum.org/EIPS/eip-2981) for the distribution of royalties on direct and auction listings.

### Events emitted

All events emitted by the contract, as well as when they're emitted, can be found in the interface of the contract, [here](https://github.com/nftlabs/nftlabs-protocols/blob/main/contracts/marketplace/IMarketplace.sol). In general, events are emitted whenever there is a state change in the contract.

### Currency transfers

The `Marketplace` contract supports both ERC20 currencies, and a chain's native token (e.g. ether for Ethereum mainnet). This means that any action that involves transferring currency (e.g. buying a token from a direct listing) can be performed with either an ERC20 token or the chain's native token.


💡 **Note**: The only exception is offers to direct listings — these can only be made with ERC20 tokens, since Marketplace needs to transfer the offer amount from the buyer to the lister, in case the lister accepts the buyer's offer. This cannot be done with native tokens.

The contract wraps all native tokens deposited into it as the canonical ERC20 wrapped version of the native token (e.g. WETH for ether). The contract unwraps the wrapped native token when transferring native tokens to a given address. 

If the contract fails to transfer out native tokens, it wraps them back to wrapped native tokens, and transfers the wrapped native tokens to the concerned address. The contract may fail to transfer out native tokens to an address, if the address represents a smart contract that cannot accept native tokens transferred to it directly.

### Alternative designs and trade-offs

**Two contracts instead of one:**

The main alternative design considered for the `Marketplace` was to split the smart contract into two smart contracts, where each handles (1) only direct listings + offers, or (2) only auction listings + bids. 

Such a design gives us two 'lean' contracts instead of one large one, and the cost for deploying just one of these two contracts is less than deploying the single, large `Marketplace` contract. Having two separate contracts positions the thirdweb system to be more modular, where a thirdweb customer can only deploy the smart contract that gives them the specific functionality they want.

Ultimately, we've written a single, large `Marketplace` smart contracts since thirdweb customers have generally wanted a fleshed out marketplace with both direct and auction listing features, and customers rarely intend to use just one of those two kinds of listings, and not the other. And so, offering a single `Marketplace` contract results in less pieces of code to manage, at large.

**Trade-off of having a single `Marketplace` contract**

Having a single, large contract gives us less room to add the ability for the marketplace and its users to conduct 'off-chain actions'.

Marketplace platforms like OpenSea make actions like making an offer to a direct listing, gasless. End users of the marketplace sign messages expressing intent to perform an action (e.g. list *x* NFT for sale at the price of 10 ETH), and a centralized order-book infrastructure matches two seller-buyer intents, and send the respective signed messages by the seller and buyer to their market smart contract for the sale to be executed.

We're working on sizing down and optimizing the `Marketplace` contract to accommodate such off-chain actions, and coming up with a central order-book infrastructure that each thirdweb customer can run on their own.