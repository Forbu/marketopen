// Importing the librairy
const myModule = require('./market_module');

// initialisation
var url = "http://localhost:8545";
var web3 = myModule.init_web3(url);

// now we can try to call some functions
myModule.set_contract(web3,myModule.address_contract,myModule.abi);
console.log("beginning the testing scession")
// exemple to publish products
console.log("products testing")
product = {"name" : "yolo",
          "description": "best chocolate ever",
          "price" : 10,
          "image_adress": "mydearchocolate.choco",
          "address_from" : "0x25e3efdbb36a6e73399e93ce7af093e9b933061d",
          "gas_": 4712388
            }

//myModule.publish_product(product["name"],product["description"],product["price"],product["image_adress"],product["address_from"],product["gas_"])
console.log("sellers testing")
seller = {
  "name": "strange guy at the pub",
  "description": "hey wanna some good stuff ?",
  "email": "silkroad@yolo.com",
  "address_seller": "0x288e71a3b4578a5cf190eae83087c46934005813",
  "gas_" : 4712388
}

//myModule.register_seller(seller["name"],seller["description"],seller["email"],seller["address_seller"],seller["gas_"]);

// ok let's test some event now :
//myModule.get_productsAll();
//myModule.get_sellers();

// Now we try to get the carac of our stuff
myModule.contract.methods.getProduct(0).call().then(console.log, console.error);
