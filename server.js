// Dépendances
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var request = require('request');

// Démarre express
var app = express();

// Connecte et configure mongo
var Database = mongoose.connect('mongodb://localhost/actionsmarket');
var Schema = mongoose.Schema;
var StockSchema = new Schema({
  reference: String,
  description: String,
  price: Number
});
var StockModel = mongoose.model('Stock', StockSchema);
var SaleSchema = new Schema({
  reference: String,
  description: String,
  value: Number,
  quantity: Number,
  date: Date
});
var SaleModel = mongoose.model('Sale', SaleSchema);

// Fichiers statiques
app.use(express.static(__dirname + '/public'));
app.use('/node_modules',  express.static(__dirname + '/node_modules'));

// Parse le body (json) de la requête
app.use(bodyParser.json());

// Définit les routes
app.route('/hello')
.get(function (req, res) {
  res.send('Hello World!');
})

app.route('/search/:symbol')
.get(function (req, res) {
  var symbol = req.params.symbol;
  var query = encodeURIComponent('select * from yahoo.finance.quotes where symbol = "' + symbol + '"');
  var url = "https://query.yahooapis.com/v1/public/yql?q=env%20'store%3A%2F%2Fdatatables.org%2Falltableswithkeys'%3B%20" + query + "&format=json";
  request({
    url: url,
    json: true
  }, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      res.send(body);
    }
  })
})

app.route('/stocks')
.get(function(req, res, next){
  StockModel.find({}, function(err, stocks){
    if(err){
      return next(err);
    } else {
      res.json(stocks);
    }
  })
})
.post(function(req, res, next){
    var stock = new StockModel(req.body);
    stock.save(function(err){
      if(err){
        return next(err);
      } else {
        return res.json(stock);
      }
  });
});

app.route('/sales')
.get(function(req, res, next){
  SaleModel.find({}, function(err, sales){
    if(err){
      return next(err);
    } else {
      res.json(sales);
    }
  })
})
.post(function(req, res, next){
    var sale = new SaleModel(req.body);
    sale.save(function(err){
      if(err){
        return next(err);
      } else {
        return res.json(sale);
      }
  });
});

app.route('/sales/sum')
.get(function(req, res, next){
  SaleModel.aggregate(
    [
       {
         $group:
           {
             _id: { _id: "$reference" },
             totalAmount: { $sum: { $multiply: [ "$value", "$quantity" ] } },
             count: { $sum: 1 }
           }
       }
     ], function(err, sales){
    if(err){
      return next(err);
    } else {
      res.json(sales);
    }
  })
});

app.listen('3000');
console.log('[Node] Le serveur est lancé.');
