var Web3 = require('web3');
var TestRPC = require("ethereumjs-testrpc");

const abi_test = [
  {
    "constant": false,
    "inputs": [
      {
        "name": "test",
        "type": "string"
      }
    ],
    "name": "event_testing",
    "outputs": [],
    "payable": false,
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "yolo",
        "type": "string"
      }
    ],
    "name": "Top",
    "type": "event"
  }
];

const abi = [
  {
    "constant": false,
    "inputs": [
      {
        "name": "address_tonote",
        "type": "address"
      },
      {
        "name": "mark",
        "type": "uint256"
      },
      {
        "name": "comment",
        "type": "string"
      }
    ],
    "name": "note_adress",
    "outputs": [],
    "payable": false,
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "wakeUp",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "name",
        "type": "string"
      },
      {
        "name": "description",
        "type": "string"
      },
      {
        "name": "email",
        "type": "string"
      }
    ],
    "name": "register_seller",
    "outputs": [],
    "payable": false,
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "seller_to",
        "type": "address"
      },
      {
        "name": "name_",
        "type": "string"
      },
      {
        "name": "description_",
        "type": "string"
      },
      {
        "name": "price_",
        "type": "uint8"
      },
      {
        "name": "image_adress_",
        "type": "string"
      },
      {
        "name": "id_",
        "type": "uint8"
      }
    ],
    "name": "publish_product",
    "outputs": [],
    "payable": false,
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "seller_to",
        "type": "address"
      },
      {
        "name": "id",
        "type": "uint8"
      }
    ],
    "name": "buy_product",
    "outputs": [],
    "payable": true,
    "type": "function"
  },
  {
    "inputs": [],
    "payable": false,
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "seller",
        "type": "address"
      }
    ],
    "name": "Seller_sub",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "seller",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "id",
        "type": "uint8"
      }
    ],
    "name": "Publish_product",
    "type": "event"
  }
];

if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

}
web3.eth.defaultAccount = web3.eth.accounts[0]
console.log(web3.version);
web3.eth.getAccounts(console.log);

var address_pers = "0x84e8b3fa1de73cc259072e2575de7b64ac4b5fe5";
web3.eth.getBalance(address_pers)
.then(console.log);

// Contract link
var address = "0x755083e0385547a99a5b985a579cf2107b83f298";
var contract = new web3.eth.Contract(abi, address);

// event watching
contract.events.Seller_sub({
    fromBlock: 0
}, function(error, event){
console.log("event : ");
  console.log(event); }).on('data', function(event){
    console.log(event); // same results as the optional callback above
});


  // First function testing wakeUp function
  var reply = "false";
  contract.methods.wakeUp().call().then(function(result){
      reply = result;
      console.log("test wake up call");
  });
  var name = "Adrien";
  var description = "Best programmer ever";
  var email = "adrien.bufort@isae.fr";

var transaction = "";
console.log("beginning registration")
contract.methods.register_seller(name,description,email).send({from: address_pers,gas: 1500000,
      gasPrice: 15000000}, function(error, transactionHash){
        if(error){
          console.log(e);
        }else{
          console.log("Transaction hash :");
          console.log(transactionHash)

          var result = web3.eth.getTransactionReceipt(transactionHash);
          result.then(console.log, console.error);


        }
});


// test
console.log("event for testing");


var address = "0x7c24221e0ceec1e8a9b3ce08c469f4b89fe2ce50";
var contract_event = new web3.eth.Contract(abi_test, address);

contract_event.methods.event_testing("tessssst").send({from: address_pers,gas: 1500000,
      gasPrice: 15000000});

var event_sub = contract_event.events.Top({
    fromBlock: 0,
    toBlock: 'latest'
}, function(error, event){
console.log("event : ",event);
});
event_sub.subscribe();


/*
var result = contract_event.getPastEvents('Top',{
    fromBlock: 0,
    toBlock: 'latest'
});
result.then(console.log, console.error);
*/
