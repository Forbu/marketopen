pragma solidity ^0.4.11;

contract openmarket_v2 {

  struct product {
        string name; // Name of the product
        string description; // description of the product
        uint8 price; // Price of the product
        string image_adress; // URL of the image of the production
        address seller;
        bool exist;
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
  mapping (address => seller) public sellers;
  mapping (address => buyer) public buyers;
  mapping (uint256 => product) public products;
  uint256 public id_tot;

  // List of even (interesting stuff here)
  event seller_sub(
    address seller_
    );

  event buyer_sub(
    address buyer_
    );

  event publish_product(
    uint256 id_
    );

  event buyed_product(
    address buyer_,
    uint256 id
    );

  // Contructor
	function dmarket() {
    // nothing to do
    id_tot = 0;
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

  function register_buyer(){
      // TODO later
  }

  function publish_product_tomarket(string name_, string description_,uint8 price_, string image_adress_){
        // Create the modifier for the seller
        // create pruduct
        // Adding the product for the seller
        var product_tosell = product({name: name_, description: description_,   price: price_, image_adress: image_adress_,seller: msg.sender,exist: true});
        products[id_tot] = product_tosell;
        id_tot += 1;
        // broadcast product to the blockchain
        publish_product(id_tot);
  }

  function buy_product (uint256 id_) payable {

    if(msg.value >= products[id_].price){

        products[id_].seller.transfer(products[id_].price);
        buyed_product(msg.sender,id_);
        // add point
        buyers[msg.sender].adress_to_mark.push(products[id_].seller);
        // destroyed the item in the market

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
          break;
          // delete on point of mark for the buyer
        }
    }
  }

  // the getter function

  function getSeller(address addressTO) public returns(string name_,string description_,uint mark_,uint Size_,string email_) {
    name_ = sellers[addressTO].name;
    description_ = sellers[addressTO].description;
    mark_ = sellers[addressTO].mark;
    Size_ = sellers[addressTO].Size;
    email_ = sellers[addressTO].email;
  }




  function getBuyer(address address__) public returns(string name,
          uint8 mark,
          address[] adress_to_mark,
          string email){
    // TODO
    name = buyers[address__].name;
    mark = buyers[address__].mark;
    adress_to_mark = buyers[address__].adress_to_mark;
    email = buyers[address__].email;

  }

  function getProduct(uint256 id__) public returns(string name,
          string description,
          uint8 price,
          string image_adress,
          address seller_,
          bool exist){
            name = products[id__].name;
            description = products[id__].description;
            price = products[id__].price;
            image_adress = products[id__].image_adress;
            seller_ = products[id__].seller;
            exist = products[id__].exist;
  }

}
