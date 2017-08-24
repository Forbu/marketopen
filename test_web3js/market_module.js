var Web3 = require("web3");
module.exports = {
  init_web3: function (url){
    if (typeof web3 !== 'undefined') {
      web3 = new Web3(web3.currentProvider);
    } else {
      // set the provider you want from Web3.providers
      web3 = new Web3(new Web3.providers.HttpProvider(url));
    }
    return web3;
  },

  get_productsAll :function (date_begin,date_end){
      // TODO
      /*
      Function to collect all the products selled on the market
      */
      var result = contract_event.getPastEvents('publish_product',{
          fromBlock: 0,
          toBlock: 'latest'
      });
      result.then(console.log, console.error);
  },

  get_sellers: function (date_begin,date_end){
    // TODO
    /*
    Function to collect all the sellers of the marketplace
    */
    var result = contract_event.getPastEvents('seller_sub',{
        fromBlock: 0,
        toBlock: 'latest'
    });
    result.then(console.log, console.error);

  },

  buy_product: function (){

  },

  register_seller: function (name,description,email,address_seller,gas_){
    var transaction = "";
    console.log("publishing product")
    contract.methods.register_seller(name,description,email).send({from: address_seller,gas: gas_,
          gasPrice: 15000000}, function(error, transactionHash){
            if(error){
              console.log(error);
            }else{
              console.log("Transaction hash :");
              console.log(transactionHash);
              }
    });
  },

  note_seller: function (address_tonote,mark,comment,address_seller,gas_){
    var transaction = "";
    console.log("publishing product")
    contract.methods.note_adress(address_tonote,mark,comment).send({from: address_seller,gas: gas_,
          gasPrice: 15000000}, function(error, transactionHash){
            if(error){
              console.log(error);
            }else{
              console.log("Transaction hash :");
              console.log(transactionHash);
              }
    });
  },

  publish_product: function(name,description,price,image_adress,address_from,gas_){
    var transaction = "";
    console.log("publishing product")
    contract.methods.publish_product_tomarket(name,description,price,image_adress).send({from: address_from,gas: gas_,
          gasPrice: 15000000}, function(error, transactionHash){
            if(error){
              console.log(error);
            }else{
              console.log("Transaction hash :");
              console.log(transactionHash);
              }
    });

  },

  abi_test : [
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
  ],

  abi : [
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
  ],

  // to change a lot
  address_contract : "0x4c1ddb5a371813ef9382c7f7e5add035a13c115e"


};