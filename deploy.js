const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

const provider = new HDWalletProvider(
  'mountain loan midnight utility pupil motion loan select turtle fortune marble spell',
  'https://rinkeby.infura.io/v3/abb096d046064ea4bed72253c944b2d6'
);

const web3 = new Web3(provider);
let DEPLOY_ARGUMENT = 'Hello';

//Helper used for async
const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: [DEPLOY_ARGUMENT] })
    .send({ gas: '1000000', from: accounts[0] });

  console.log('Contract deployed to', result.options.address);
};
deploy();
