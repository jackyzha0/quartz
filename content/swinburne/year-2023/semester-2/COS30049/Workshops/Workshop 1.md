---
title: "Workshop 1"
tags: 
- project-background
weight: -5
---
# Project Background

>[!important] Software Engineering and Mobile Development Background
>- This **decentralized trading platform** is built on blockchain technology, aiming to ensure transparency and security of user transaction information. Through the immutability and distributed nature of  blockchain, each transaction is recorded on the blockchain, making transaction data openly transparent and tamper-proof.  
>- The platform's website will be designed with a **responsive layout** to ensure a seamless browsing experience for users across different devices. The system's backend will be developed using Node.js, a popular server-side runtime environment known for its outstanding performance and scalability. Meanwhile, the functionality to interact with smart contracts and the blockchain network will be implemented using Ether.js, a specialized JavaScript library for Ethereum blockchain interactions.  
>- For students, they are required to design **smart contract** functions according to their specific needs. This means they can write smart contract functions based on the platform's specific business logic and requirements, such as implementing asset exchange, transfer functionalities, or adding other custom features to meet user demands. Safety and effectiveness should be thoroughly considered in the design of smart contracts to ensure reliable execution of transactions and protection of user data

# Concepts

>[!info] Blockchain
>
>a decentralized database system. Information is stored in a block and gets chained to other blocks.

>[!info] Bitcoin
>
>a cryptocurrency based on **blockchain** and uses p2p technology for instant payment

>[!info] Ethereum
>
>a global, open-source platform for decentralized applications.

---
# Quiz

1. **Which technology is Bitcoin based on?**  
	- [ ] Internet of Things (IoT)  
	- [ ] Artificial Intelligence (AI)  
	- [x] Blockchain  
	- [ ] Augmented Reality (AR)  
	
2. **What can Ethereum be used to build?**  
	- [ ] Decentralized Applications  
	- [ ] Smart Contracts  
	- [ ] Cryptocurrencies  
	- [x] All of the above
	
3. **Which of the following is the native cryptocurrency of the Ethereum platform?**  
	- [ ] Litecoin  
	- [ ] Ripple  
	- [x] Ether  
	- [ ] Bitcoin  
	
4. **What is the primary purpose of mining in Bitcoin?**  
	- [ ] To generate new Bitcoins  
	- [ ] To process and validate transactions  
	- [ ] To keep the network secure  
	- [x] All of the above  
	
5. **What is a "smart contract"?**  
	- [ ] A legal document for technology companies  
	- [x] A self-executing contract with the terms of the agreement directly written into code  
	- [ ] A contract signed between two cryptocurrency miners  
	- [ ] A software program that controls the transfer of digital currencies or assets between parties under certain conditions
	
6. **Which of the following is an advantage of blockchain technology?**  
	- [ ] High scalability  
	- [x] Immutability  
	- [ ] Centralization  
	- [ ] Low security
	
7. **What programming language is predominantly used to write Ethereum smart contracts?**  
	- [x] Solidity  
	- [ ] Python  
	- [ ] JavaScript  
	- [ ] C++
	
8. **Which of the following cryptographic algorithms is primarily used in the Bitcoin blockchain for the generation of public and private keys?**  
	- [ ] RSA (Rivest-Shamir-Adleman)  
	- [x] ECC (Elliptic Curve Cryptography)  
	- [ ] AES (Advanced Encryption Standard)  
	- [ ] DES (Data Encryption Standard)
	
9. **How does the Ethereum network handle "gas" in a transaction that runs out of gas before it's complete?**  
	- [ ] It stops the transaction and returns the remaining gas to the sender's account  
	- [x] It allows the transaction to complete but marks it as invalid  
	- [ ] It stops the transaction and consumes all the provided gas  
	- [ ] It pauses the transaction until the sender's account has enough gas  
	
10. **What is the primary role of Merkle trees in blockchain technology?**  
	- [ ] They are used to control the creation of new blocks.  
	- [x] They serve to confirm transaction validity within a block.  
	- [ ] They function as a random number generator for each transaction.  
	- [ ] They are used to keep track of the number of miners on the network

# Discussion

>[!question] How has blockchain technology impacted the financial industry?
>
>instant payment regardless of the physical distance.

>[!question] What are the potential advantages and challenges of cryptocurrencies like Bitcoin?  
>
>- **Advantages**: \$$
>- **Challenges**: legitimate and policies based on country

>[!question] How is Ethereum different from Bitcoin and what are its potential applications?
>
>**Ethereum**: applications in other field than just payment which is what Bitcoin 

# Remix

>[Remix Ethereum IDE](https://remix.ethereum.org)

## Creating a New File:  

On the left side of the screen, click on the second icon from the top to open the "File explorers" tab. Click on the "+" icon to create a new file. Give it a name ending with .sol, such as `MyContract.sol`.  
## Writing the Smart Contract:  

In the text editor area in the center of the screen, you can start writing your Solidity smart contract.
```sol
pragma solidity ^0.5.1;
contract MyContract {
    string public myString = "Hello, world!";
    function setMyString(string memory newString) public {
        myString = newString;
    }
}
```

## Compiling the Smart Contract:  

Click on the fourth icon from the top on the left side to open the "Solidity compiler" tab. Under the compiler section, select the appropriate compiler version that matches your contract (in  
this case 0.5.1+commit.c8a2cb62 or higher) and then click on the "Compile" button.  

## Deploying the Smart Contract:  

Click on the third icon from the top on the left side to open the "Deploy & run transactions" tab. Choose the correct contract from the "Contract" dropdown (if you have multiple in your file), then click "Deploy".  

## Interacting with the Smart Contract: 

Once deployed, the contract will appear under the "Deployed Contracts" section. Here you can interact with your contract's functions. For the example contract, you could change the greeting by entering a new string in the "setMyString" field and clicking the "Transact" button, and then see the updated greeting by clicking the "myString" button.

## Result

![](swinburne/year-2023/semester-2/COS30049/Resources/Pasted%20image%2020230802160852.png)