require('@babel/register');
require('@babel/polyfill');
require('dotenv').config();
const HDWalletProvider = require('@truffle/hdwallet-provider');
const mnemonic = process.env.PRIVATE_KEY;
const infuraEndpoint = process.env.PROVIDER_URL;
module.exports = {
  /**
   * Networks define how you connect to your ethereum client and let you set the
   * defaults web3 uses to send transactions. If you don't specify one truffle
   * will spin up a managed Ganache instance for you on port 9545 when you
   * run `develop` or `test`. You can ask a truffle command to use a specific
   * network from the command line, e.g
   *
   * $ truffle test --network <network-name>
   */

  networks: {
    development: {
     host: "127.0.0.1",     // Localhost (default: none)
     port: 7545,            // Standard Ethereum port (default: none)
     network_id: "5777",       // Any network (default: none)
    },
    sepolia: {
      provider: () => new HDWalletProvider(mnemonic,infuraEndpoint),
      network_id: 11155111,
      timeout: 60000,
      gas: 8000000, // Specify the gas limit for transactions (adjust according to your requirements)
      gasPrice: 20000000000, // Specify the gas price (adjust according to current network conditions)
      confirmations: 1, // Set the number of confirmations required for a transaction to be considered finalized
      skipDryRun: true, // Skip the dry run when running migrations
      networkCheckTimeout: 10000, // Set the timeout for network checks during migrations
      from: "0xF08809d588bd1331c7C9c1D8B3fbCDC7acc57bb6",
    },
  },

  // Set default mocha options here, use special reporters, etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
 contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis/',
  compilers: {
    solc: {
      version: "0.8.17",
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
};
