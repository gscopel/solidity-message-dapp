const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3'); //contructor web3

const provider = ganache.provider();
const web3 = new Web3(provider);//instance of web3

const { interface, bytecode } = require('../compile');

//Example of mocha test suite

// class Car {
//   park() {
//     return 'stopped';
//   }
//
//   drive() {
//     return 'vroom';
//   }
// }
//
// let car;
//
// beforeEach(() => {
//   car = new Car();
// });
//
// describe('Car', () => {
//   it('can park', () => {
//     assert.equal(car.park(), 'stopped');
//   });
//
//   it('can drive', () => {
//     assert.equal(car.drive(), 'vroom');
//   })
// });

let accounts;
let inbox;
const INITIAL_STRING = 'Hello';
const SET_MESSAGE_STRING = 'Bye'

beforeEach(async () => {
  // Get list of accounts
  accounts = await web3.eth.getAccounts()
  //Use one account to deploy contract
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: [INITIAL_STRING] })
    .send({ from: accounts[0], gas: '1000000' });

    inbox.setProvider(provider);
});

describe('Inbox', () => {
  it('deploys contract', () => {
    assert.ok(inbox.options.address);
  });

  it('has default message', async () => {
    const message = await inbox.methods.message().call();
    assert.equal(message, INITIAL_STRING);
  });

  it('can change message', async () => {
    await inbox.methods.setMessage(SET_MESSAGE_STRING).send({ from: accounts[0] });
    const message = await inbox.methods.message().call();
    assert.equal(message, SET_MESSAGE_STRING);
  });
});
