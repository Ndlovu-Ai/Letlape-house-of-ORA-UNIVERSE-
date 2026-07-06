// OTCoin Integration with Neuro AI Treasury API

const Web3 = require('web3');

// Web3 setup (Specify Ethereum Provider)
const web3 = new Web3('https://goerli.infura.io/v3/YOUR_INFURA_PROJECT_ID');

// OTCoin Contract ABI and Address
const OTCoinABI = [
  {
    "constant": true,
    "inputs": [{ "name": "account", "type": "address" }],
    "name": "balanceOf",
    "outputs": [{ "name": "", "type": "uint256" }],
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      { "name": "recipient", "type": "address" },
      { "name": "amount", "type": "uint256" }
    ],
    "name": "transfer",
    "outputs": [{ "name": "", "type": "bool" }],
    "type": "function"
  }
];
const OTCoinAddress = '0xYourOTCoinContractAddress';
const OTCoinContract = new web3.eth.Contract(OTCoinABI, OTCoinAddress);

// Functions to interact with OTCoin

const OTCoinIntegration = {
  getBalance: async (address) => {
    try {
      const balance = await OTCoinContract.methods.balanceOf(address).call();
      return web3.utils.fromWei(balance, 'ether'); // Convert to Ether units
    } catch (error) {
      console.error('Error fetching balance: ', error);
      throw error;
    }
  },

  transferTokens: async (fromAddress, privateKey, toAddress, amount) => {
    try {
      const tx = {
        to: OTCoinAddress,
        gas: 2000000,
        data: OTCoinContract.methods.transfer(toAddress, web3.utils.toWei(amount, 'ether')).encodeABI()
      };

      const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
      const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
      console.log('Transaction receipt: ', receipt);
      return receipt;
    } catch (error) {
      console.error('Error transferring tokens: ', error);
      throw error;
    }
  }
};

module.exports = OTCoinIntegration; // Export for use in Treasury API