// Importing the librairy
const myModule = require('./market_module');

// initialisation
var url = "http://localhost:8545";
var web3 = myModule.init_web3(url);

// now we can try to call some functions
myModule.set_contract(web3,myModule.address_contract,myModule.abi);

// exemple to publish products
product = {"name" : "yolo",
          "description": "best chocolate ever",
          "price" : 10,
          "image_adress": "mydearchocolate.choco",
          "address_from" : "0x67924f57959557cef8a515b248df12c2aaa1c264",
          "gas_": 4712388
            }

//myModule.publish_product(product["name"],product["description"],product["price"],product["image_adress"],product["address_from"],product["gas_"])

seller = {
  "name": "strange guy at the pub",
  "description": "hey wanna some good stuff ?",
  "email": "silkroad@yolo.com",
  "address_seller": "0x579fe83040136de20e4c8af4c745f5994ccfdcec",
  "gas_" : 4712388
}

//myModule.register_seller(seller["name"],seller["description"],seller["email"],seller["address_seller"],seller["gas_"]);

// ok let's test some event now :
//myModule.get_productsAll();
//myModule.get_sellers();

// Now we try to get the carac of our stuff
var getter_testing = myModule.contract.methods.id_tot.call(0);
getter_testing.then(console.log, console.error)
