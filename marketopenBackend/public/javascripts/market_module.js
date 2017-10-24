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


  get_productsFrom :function (blockId){
      // TODO
      /*
      Function to collect all the products selled on the market
      */
      var result = this.contract.getPastEvents('publish_product',{
          fromBlock: blockId,
          toBlock: 'latest'
      });
      return result;
  },


  get_sellersFrom: function (blockId){
    // TODO
    /*
    Function to collect all the sellers of the marketplace
    */
    var result = this.contract.getPastEvents('seller_sub',{
        fromBlock: blockId,
        toBlock: 'latest'
    });
    return result;

  },

  buy_product: function (product_id,value_){
    var transaction = "";
    console.log("publishing product")
    this.contract.methods.buy_product(id_).send({from: address_seller,value: value_,gas: gas_,
          gasPrice: 15000000}, function(error, transactionHash){
            if(error){
              console.log(error);
            }else{
              console.log("Transaction hash :");
              console.log(transactionHash);
              }
    });
  },

  register_seller: function (name,description,email,address_seller,gas_){
    var transaction = "";
    console.log("publishing product")
    this.contract.methods.register_seller(name,description,email).send({from: address_seller,gas: gas_,
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
    this.contract.methods.note_adress(address_tonote,mark,comment).send({from: address_seller,gas: gas_,
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
    this.contract.methods.publish_product_tomarket(name,description,price,image_adress).send({from: address_from,gas: gas_,
          gasPrice: 10000000}, function(error, transactionHash){
            if(error){
              console.log(error);
            }else{
              console.log("Transaction hash :");
              console.log(transactionHash);
              }
    });

  },
  set_contract: function(web3,address,abi){
    this.contract = new web3.eth.Contract(abi,address);
  },
  contract: null
,
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
      "inputs": [
        {
          "name": "address__",
          "type": "address"
        }
      ],
      "name": "getBuyer",
      "outputs": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "mark",
          "type": "uint8"
        },
        {
          "name": "adress_to_mark",
          "type": "address[]"
        },
        {
          "name": "email",
          "type": "string"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "name": "sellers",
      "outputs": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "description",
          "type": "string"
        },
        {
          "name": "mark",
          "type": "uint256"
        },
        {
          "name": "Size",
          "type": "uint256"
        },
        {
          "name": "email",
          "type": "string"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "products",
      "outputs": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "description",
          "type": "string"
        },
        {
          "name": "price",
          "type": "uint8"
        },
        {
          "name": "image_adress",
          "type": "string"
        },
        {
          "name": "seller",
          "type": "address"
        },
        {
          "name": "exist",
          "type": "bool"
        }
      ],
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
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "name": "buyers",
      "outputs": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "mark",
          "type": "uint8"
        },
        {
          "name": "email",
          "type": "string"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "id_tot",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "addressTO",
          "type": "address"
        }
      ],
      "name": "getSeller",
      "outputs": [
        {
          "name": "name_",
          "type": "string"
        },
        {
          "name": "description_",
          "type": "string"
        },
        {
          "name": "mark_",
          "type": "uint256"
        },
        {
          "name": "Size_",
          "type": "uint256"
        },
        {
          "name": "email_",
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
          "name": "id__",
          "type": "uint256"
        }
      ],
      "name": "getProduct",
      "outputs": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "description",
          "type": "string"
        },
        {
          "name": "price",
          "type": "uint8"
        },
        {
          "name": "image_adress",
          "type": "string"
        },
        {
          "name": "seller_",
          "type": "address"
        },
        {
          "name": "exist",
          "type": "bool"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "seller_",
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
          "name": "buyer_",
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
          "name": "buyer_",
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
  address_contract : "0x7b9453358fda1693f111ae31430a7ebfb588ba43"

};
