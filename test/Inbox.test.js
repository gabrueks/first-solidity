const assert = require("assert");
const ganache = require("ganache-core");
const Web3 = require("web3");
const {
  abi,
  evm: {
    bytecode: { object },
  },
} = require("../compile");

const web3 = new Web3(ganache.provider());

let accounts;
let inbox;

const INITIAL_MESSAGE = "Hi there!";

beforeEach(async () => {
  // Get a list of all accounts
  accounts = await web3.eth.getAccounts();
  // Use one of these accounts to deploy the contract
  // .deploy creates a new transaction with no "to" field and bytecode as "data" but does not send yet
  // .send triggers the function that sends the transaction object to the network
  // inbox property has the options.address which indicates where the contract is deployed at the network
  inbox = await new web3.eth.Contract(abi)
    .deploy({
      data: object,
      arguments: [INITIAL_MESSAGE],
    })
    .send({ from: accounts[0], gas: "1000000", gasPrice: "20" });
});

describe("Inbox contract", () => {
  it("Should deploy inbox conctract and have an address", () => {
    assert.ok(inbox.options.address);
  });

  it("Should create the inbox contract with a initialMessage", async () => {
    const message = await inbox.methods.message().call();
    assert(message, INITIAL_MESSAGE);
  });

  it("Should update the message property correclty", async () => {
    const newMessage = "Hello everyone!";
    const hash = await inbox.methods
      .setMessage(newMessage)
      .send({ from: accounts[0] });
    const message = await inbox.methods.message().call();
    assert.ok(hash.transactionHash);
    assert(message, newMessage);
  });
});
