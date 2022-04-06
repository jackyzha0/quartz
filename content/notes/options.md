---
title: Options
---
# Options
#### Terms
- Strikeprice
- Premium
- In the money
- out of the money
- underlying asset

#### Calls
- a contract
	- for which you pay a premium
- gives you the opportunity (not obligation) to **buy**
	- 100 shares (stock bond commodity or other financial asset) -> underlying asset
	- at a specific price (strike price)
	- by a specific date (expiration date)
- You profit when the price of underlying asset **increases**

##### Examples
You buy a $100 call option for AMD that expires on July 10th. With this call option, you have the right to buy 100 shares of AMD at $100 per share before end-of-day on July 10th. If the price increases to $120 before your expiration date, you can still buy the contract at your original $100 per share price.

Your $100 AMD call has a $3 premium. This means, that for each of the 100 shares in the contract, you owe $3 to the seller. $3 x 100 = $300. In exchange for this premium, the seller gives you the call option. Therefore, in order to breakeven, you now need $103 share price for AMD because if it were to only go up to $100, you’d still be out of pocket due to the $300 premium paid. If the stock price goes to $104, you have made a profit, as it is higher than your $103 cost per share.


#### Puts
- a contract
	- for which you pay a premium
- gives you the opportunity (not obligation) to **sell**
	- 100 shares (stock bond commodity or other financial asset) -> underlying asset
	- at a specific price (strike price)
	- by a specific date (expiration date)
- You profit when the price of underlying asset **decreases**

##### Examples
You buy a $100 put option on AMD with a $2 premium that expires on July 10th. Every dollar decrease below the strike price earns you $100 profit, since each contract is made up of 100 shares. Your breakeven point (the point at which your put option becomes profitable) is $98 (strike _minus_ premium). If the underlying asset price increases above $100 by your expiration date, your put option expires worthless and your maximum loss is $200 ($2 premium x 100 shares).

You write (sell) a $100 put option on AMD with a $2 premium that expires on July 10th. Every dollar decrease below the strike price increases the writer (seller) cost by $100. The breakeven point (the point at which your put option becomes profitable) is $98 (strike _minus_ premium). The maximum profit for the put writer (seller) is the $200 premium ($2 premium x 100 shares).
On the other hand, if the buyer exercises the put option, then the writer (seller) must by the 100 shares at the strike price, which depending on the price of the underlying asset could result in a potential loss larger then the value of the underlying asset.

You own 100 shares of AMD, the current price per share is $100. You're bullish, expecting the price to increase in the future but you'd like to protect yourself against any unexpected price dips. You do this by purchasing a protective put contract with a strike price of $100 with a $10 premium.