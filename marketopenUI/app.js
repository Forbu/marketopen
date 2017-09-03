var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

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

app.get('/',function(req, res){
   var products = openmarket_module.get_productsAll();
   products.then(function(result){
     console.log(result);
     res.render('products', {products_all: result});
   });

});

// Part where we see all the product
app.get('/product',function(req, res){
  var product_id = req.param('id');
  console.log(product_id);
  // make the request for the product in question
  openmarket_module.contract.methods.getProduct(product_id).call().then(
    function(result){
    // We look for the carac of the seller too
    console.log(result);
    res.render('product', {product: result});
  });
});

// Part where we see all the sellers
app.post('/seller',function(req, res){
  var address = req.body.address;

  // make the request for the stuff about the seller
  openmarket_module.contract.methods.getSeller(address).call().then(
    function(result){
    // We look for the carac of the seller too
    console.log(result);
    res.render('seller', {seller: result});
  });

});

// Part where we see all the buyers
app.post('/buyer',function(req, res){
  var address = req.body.address;
  // make the the request to see the buyer
  openmarket_module.contract.methods.getBuyer(address).call().then(
    function(result){
    // We look for the carac of the seller too
    console.log(result);
    res.render('buyer', {buyer: result});
  });
});



app.post('/products_search',function(req, res){


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
