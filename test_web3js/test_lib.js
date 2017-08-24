// Importing the librairy
var fs = require('fs');
function include(file_) {
    with (global) {
        eval(fs.readFileSync(file_) + '');
    };
};
// we include the variable from the librairy and the function
include('librairy.js');
const myModule = require('./market_module');

// initialisation
var url = "http://localhost:8545"
var web3 = myModule.init_web3(url)

// now we can try to call some functions
var contract = new web3.eth.Contract(myModule.abi, myModule.address_contract);

// exemple to publish products
