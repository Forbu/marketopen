var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

// mongodb stuff TODO later
var http = require('http');
var MongoClient = require('mongodb').MongoClient;
var url_mongo = "mongodb://@localhost:27017/marketopen";

var app = express();

// openmarket API
const openmarket_module = require('./public/javascripts/market_module');
var url = "http://localhost:8545";
var web3 = openmarket_module.init_web3(url);

// now we can try to call some functions
openmarket_module.set_contract(web3,openmarket_module.address_contract,openmarket_module.abi);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/init',function(req, res){
  // init the database
  console.log("initialisation");
  MongoClient.connect(url_mongo, function(err, db) {
    console.log("client connected");
  if (err) throw err;
  db.listCollections().toArray(function(err,result){
    console.log(result);
    for(i = 0;i< result.length;i++){
      if(result[i]['name'] == 'products'|| result[i]['name'] == 'sellers'){
        res.send("initialisation already done");
        return null;
      }
    }

    db.createCollection("sellers", function(err, collection){
      var sellers = openmarket_module.get_sellersFrom(0);
      sellers.then(function(result){
        console.log(result);
        // add to the mongodb database
        for(i=0;i<sellers.length;i++){
          // request on db
          openmarket_module.contract.methods.getSeller(result[i]['address']).call().then(
              function(result){
              // We look for the carac of the seller too
              console.log(result);
              collection.insert(result);
            });
        }
        res.send("finishing inserting sellers");
      });
    });

    db.createCollection("products", function(err, collection){
      var products = openmarket_module.get_productsFrom(0);
      products.then(function(result){
        console.log(result);
        // add to the mongodb database
        for(i=0;i<products.length;i++){
          // request on db
          // query HERE TODO
          openmarket_module.contract.methods.getProduct(result[i]['id_']).call().then(
              function(result){
              // We look for the carac of the seller too
              console.log(result);
              collection.insert(result);
            });
        }
        db.collection("products").createIndex({"name":"text","description":"text"})
        res.send("finishing inserting products");
      });
    });

  });
  });
});

app.get('/init_index',function(req, res){

MongoClient.connect(url_mongo, function(err, db) {
  db.collection("products").createIndex({"name":"text","description":"text"});
});
  res.send("init ok");
});

app.get('/publish_product_test',function(req, res){
  // clean all the data from the database
  // clean operation on the mongodb database (remove old data)
  var product_bis = req.param('product');
  console.log(product_bis);
  adress = "0x2341a26dc7ee0a4f5404a2429e81ba71726dde05"

  product = {"name" : "yolo",
            "description": "best yolo ever",
            "price" : 10,
            "image_adress": "mydearchocolate.choco",
            "address_from" : adress,
            "gas_": 4712388
              }
  product_1 = {"name" : "chocolate",
            "description": "best chocolate ever",
            "price" : 10,
            "image_adress": "mydearchocolate.choco",
            "address_from" : adress,
            "gas_": 4712388
              }
  product_2 = {"name" : "chocolatine",
            "description": "best chocolate ever",
            "price" : 10,
            "image_adress": "mydearchocolate.choco",
            "address_from" : adress,
            "gas_": 4712388
              }

  openmarket_module.publish_product(product["name"],product["description"],product["price"],product["image_adress"],product["address_from"],product["gas_"])
  openmarket_module.publish_product(product_1["name"],product_1["description"],product_1["price"],product_1["image_adress"],product_1["address_from"],product_1["gas_"])
  openmarket_module.publish_product(product_2["name"],product_2["description"],product_2["price"],product_2["image_adress"],product_2["address_from"],product_2["gas_"])

  console.log("product publish");
  res.send("product publish");
});

app.get('/publish_product',function(req, res){
  // clean all the data from the database
  // clean operation on the mongodb database (remove old data)
  var product_bis = req.param('product').json();
  console.log(product_bis);

  openmarket_module.publish_product(product["name"],product["description"],product["price"],product["image_adress"],product["address_from"],product["gas_"])

  console.log("product publish");
  res.send("product published");
});


app.get('/cleanAll',function(req, res){
  // clean all the data from the database
  // clean operation on the mongodb database (remove old data)
  var blockId = req.param('blockid');
  MongoClient.connect(url_mongo, function(err, db) {
  if (err) throw err;
    db.collection('sellers',function(err, collection){
      collection.remove({},function(err, removed){
      });
    });
    db.collection('products',function(err, collection){
      collection.remove({},function(err, removed){
      });
    });
  });
  res.send("clear all");
});

app.get('/clean',function(req, res){
  // clean all the data from the database
  // clean operation on the mongodb database (remove old data)
  var blockId = req.param('blockid');
  MongoClient.connect(url_mongo, function(err, db) {
    if (err) throw err;
  });
  res.send("clean partial");
});

app.get('/actualize',function(req, res){
  // actualize the database
  // get the last block to actualize -> actualize to this block
  // and register the data to mongodb database

  // get the id of the last actualization
  // then actualise from here

  // see first and last block and download from the last block
  MongoClient.connect(url_mongo, function(err, db) {
    var blockLast = 0;
    var blockFirst = 0;
    console.log("about the register");
    openmarket_module.get_productsFrom(blockLast).then(
        function(result){
          console.log(result);
        // We look for the carac of the seller too
        result.forEach(function(product, i) {

          var id = product["returnValues"]["id_"];
          // request to the id
          console.log("id : ",id);

          openmarket_module.contract.methods.getProduct(id).call().then(
            function(result_prod){
              console.log(i);
              var result_all = Object.assign({},result_prod, product["returnValues"]);
              console.log(result_all);
              db.collection("products").insert(result_all);
            });

          // we register all the data
        });

        res.send("registering all");
      });
  });

});

// Part where we see all the sellers
app.get('/get_seller',function(req, res){
  var address__ = req.param('address');

  // just call the database
  MongoClient.connect(url_mongo, function(err, db) {
  if (err) throw err;
  var query = { address: address__};
  db.collection("sellers").find(query).toArray(function(err, result) {
    if (err) throw err;
    res.json(result);
    db.close();
  });
});

});

// Part where we see all the buyers
app.get('/buyer',function(req, res){
  var address__ = req.param('address');
  // make the the request to see the buyer
  MongoClient.connect(url_mongo, function(err, db) {
  if (err) throw err;
  var query = { address: address__ };
  db.collection("buyer").find(query).toArray(function(err, result) {
    if (err) throw err;
    res.json(result);
    db.close();
  });
});
});

app.get('/products_search',function(req, res){
  // use mongodb database as search engine
  var keyword = req.param('keyword');
  // simple retrieve schema
  MongoClient.connect(url_mongo, function(err, db) {
    if (err) throw err;
    var query = {$text: {$search: keyword}}
    var opt = {score: {$meta: "textScore"}};

    db.collection("products").find(query,opt).sort({score:{$meta:"textScore"}}).toArray(function(err, result) {
      if (err) throw err;
      console.log(result)
      res.json(result);
      db.close();
    });
  });
});

app.get('/buy',function(req, res){
  // buy operation
  var price = req.param('price');
  var id_product = req.param('id_product');
  // call to the web3 data
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
