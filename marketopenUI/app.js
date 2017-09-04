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
var url = "mongodb://localhost:27017/mydb";

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

app.get('/init',function(req, res){
  // init the database
  MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  db.collectionNames(function(err,result){
    for(i = 0;i< result.length;i++){
      if(result[i] == 'products'|| result[i] == 'sellers'){
        res.send("initialisation already done");
        return null;
      }
    }

    db.createCollection("sellers", function(err, collection){
      var sellers = openmarket_module.get_sellersFrom(0);
      sellers.then(function(result){
        console.log(result);
        // add to the mongodb database
        for(i=0:i<sellers.length:i++){
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
        for(i=0:i<products.length:i++){
          // request on db
          // query HERE TODO
          openmarket_module.contract.methods.getProduct(result[i]['id_']).call().then(
              function(result){
              // We look for the carac of the seller too
              console.log(result);
              collection.insert(result);
            });
        }
        res.send("finishing inserting products");
      });
    });

  });
  });
});

app.get('/cleanAll',function(req, res){
  // clean all the data from the database
  // clean operation on the mongodb database (remove old data)
  var blockId = req.param('blockid');
  MongoClient.connect(url, function(err, db) {
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
  MongoClient.connect(url, function(err, db) {
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
});

// Part where we see all the sellers
app.get('/seller',function(req, res){
  var address__ = req.param('address');

  // just call the database
  MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var query = { address: address__};
  db.collection("seller").find(query).toArray(function(err, result) {
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
  MongoClient.connect(url, function(err, db) {
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
  var address = req.param('keyword');
});

app.get('/buy',function(req, res){
  // buy operation
  var price = req.param('price');
  var id_product = req.param('id_product');



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
