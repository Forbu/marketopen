// Main librairy web3 to interact with ethereum blockchain
var Web3 = require('web3');

// the abis :

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
        "name": "id_",
        "type": "uint256"
      }
    ],
    "name": "buy_product",
    "outputs": [],
    "payable": true,
    "type": "function"
  },
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
    "inputs": [
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
      }
    ],
    "name": "publish_product_tomarket",
    "outputs": [],
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
    "inputs": [],
    "name": "dmarket",
    "outputs": [],
    "payable": false,
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "register_buyer",
    "outputs": [],
    "payable": false,
    "type": "function"
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
    "name": "seller_sub",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "buyer",
        "type": "address"
      }
    ],
    "name": "buyer_sub",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "id_",
        "type": "uint256"
      }
    ],
    "name": "publish_product",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "buyer",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "id",
        "type": "uint256"
      }
    ],
    "name": "buyed_product",
    "type": "event"
  }
];

// web3 init
function init_web3(String url){
  if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
  } else {
    // set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

  }
  return web3;
}

function get_products(date_begin,date_end){
    // TODO
    /*
    Function to collect all the products selled on the market
    */
}

function get_sellers(date_begin,date_end){
  // TODO
  /*
  Function to collect all the sellers of the marketplace
  */
}

function buy_product(){

}

function register_seller(){

}

function note_seller(){

}

function publish_product(){

}
