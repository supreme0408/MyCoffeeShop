# Getting Started with This project
This is starter project for creating DAPP 
Using frontend Reactjs and truffle framework.
Truffle is a world-class development environment, testing framework and asset pipeline for blockchains using the Ethereum Virtual Machine (EVM).

## For cloning
After cloning this project run `npm install` to install all dependencies
To add new dependency run `npm install --save-dev package-name`. Write name of package Name in place of package-name.

## For smart contract
The project has ./src/contracts where you can write smart contracts.
For deploying contracts write your .js code in ./migrations .
write test for smart contract in ./test .

## For Frontend
For working in Frontend start modifying ./src/App.js .

## Other
For making changes in solidity version, adding new network for deployment use /truffle-config.js . 

## Deploying details
### Starting migrations...
======================
> Network name:    'sepolia'<br>
> Network id:      11155111<br>
> Block gas limit: 30000000 (0x1c9c380)

### 2_deploy_contracts.js
=====================

#### Deploying 'CoffeeToken'
   -----------------------
   > transaction hash:    0x978979e2ddf11026d66353921456a343b3e86b2fcf35f9197fd0bcc1a4883ba0
   > Blocks: 1            Seconds: 13
   > contract address:    0x24C5d7325618383BF91B40591701B0F9781d63AE
   > block number:        3602828
   > block timestamp:     1685628936
   > account:             0xF08809d588bd1331c7C9c1D8B3fbCDC7acc57bb6
   > balance:             1.41576429193982663
   > gas used:            864756 (0xd31f4)
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.01729512 ETH<br>
   >Pausing for 1 confirmations...<br>
   > confirmation number: 1 (block: 3602829)

#### Deploying 'CoffeeShop'
   ----------------------
   > transaction hash:    0xea3129b2ce9d95b416d9bacff79b6b7a613eb08e98c45116f9451f486798b3a1
   > Blocks: 2            Seconds: 18
   > contract address:    0x383f96CE91Cfb3eBa91a72b0a04fdcE2D58C74FF
   > block number:        3602831
   > block timestamp:     1685628972
   > account:             0xF08809d588bd1331c7C9c1D8B3fbCDC7acc57bb6
   > balance:             1.37647707193982663
   > gas used:            1964361 (0x1df949)
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.03928722 ETH<br>
   >Pausing for 1 confirmations...<br>
   > confirmation number: 1 (block: 3602832)
   > Saving artifacts
   -------------------------------------
   > Total cost:          0.05658234 ETH
### Summary
===========
> Total deployments:   2<br>
> Final cost:          0.05658234 ETH