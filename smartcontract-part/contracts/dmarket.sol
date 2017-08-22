pragma solidity ^0.4.11;

contract dmarket {

  struct product {
        string name; // Name of the product
        string description; // description of the product
        uint8 price; // Price of the product
        string image_adress; // URL of the image of the production
        uint8 id;
        bool buyed;
        address buyer;
    }

  struct seller {
        string name; // Name of the seller (opt)
        string description; // Short description of the seller
        uint mark; // Mark / 5 to describe the seller
        string[] comments; // Comment on the seller
        uint Size; // Number of transaction or size of tot transaction
        string email;
    }

  struct buyer {
        string name; // Name of the seller
        uint8 mark; // Mark for the buyer
        address[] adress_to_mark; // adress the buyer have to mark
        string email; //
  }

  // Current data about the user
	mapping (address => seller) sellers;
  mapping (address => buyer) buyers;
  mapping (address => product[]) products;

  // List of even (interesting stuff here)
  event seller_sub(
    address seller
    );

  event publish_product(
    address seller,
    uint8 id
    );

  event buyed_product(
    address buyer;
    address seller;
    uint8 id;
    );

  // Contructor
	function dmarket() {
    // nothing to do
	}

  function register_seller(string name,
      string description,
      string email){

        // registering the seller
        sellers[msg.sender].name = name;
        sellers[msg.sender].description = description;
        sellers[msg.sender].email = email;
        sellers[msg.sender].mark = 0;
        sellers[msg.sender].Size = 0;

        // broadcast to the blockchain
        seller_sub(msg.sender);
  }

  function publish_product(address seller_to,string name_, string description_,   uint8 price_, string image_adress_,uint8 id_){
        // Create the modifier for the seller
        // create pruduct
        // Adding the product for the seller
        products[msg.sender].push(product({name: name_, description: description_,   price: price_, image_adress: image_adress_,id: id_,buyed: false,buyer: address(0)}));
        // broadcast product to the blockchain
        publish_product(msg.sender,id_);
  }

  function buy_product (address seller_to,uint8 id) payable {

    // decrease the ether size (buy act)
    // get the product
    for(uint i =0;i<sellers[seller_to].selling.length;i++){
      if(sellers[seller_to].selling[i].id == id &&sellers[seller_to].selling[i].buyed == false){
        // transfert of money
        if(msg.value >= sellers[seller_to].selling[i].price){
          seller_to.transfer(sellers[seller_to].selling[i].price);
          // deleting the item
          sellers[seller_to].selling[i].buyed = true;
          sellers[seller_to].selling[i].buyer = msg.sender;
          buyed_product(seller_to,msg.sender,id);
        }
        break;
      }
    }
    // Give a point to note the product TODO later
  }

  function note_adress(address address_tonote,uint mark,string comment){

    // note the buyer with adress
    for(uint i=0;i<buyers[msg.sender].adress_to_mark.length;i++){

        if(address_tonote == buyers[msg.sender].adress_to_mark[i]){
          sellers[address_tonote].Size += 1;
          sellers[address_tonote].mark = mark / (sellers[address_tonote].Size + 1);
          // remove address_tonote
          sellers[address_tonote].comments.push(comment);
          // delete on point of mark for the buyer
        }
    }
  }

  function wakeUp() public returns (string){
  return "success" ;
}

function public get_item(address adress_){
  return seller[adress_];
}

function public get_product(uint8 id,address seller_to){
  for(uint i=0;i<products[seller_to].length;i++){
    if(products[seller_to][i] == id){
      return products[seller_to][i];
    }
  }
}
}
