// Dépendances
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

// Démarre express
var app = express();

// Connecte et configure mongo
var db = mongoose.connect('mongodb://localhost/actionsmarket');
var Schema = mongoose.Schema;
var StockSchema = new Schema({
  name: String,
  symbol: String,
  price: Number
});
var Stock = mongoose.model('Stock', StockSchema);

// Fichiers statiques
app.use(express.static(__dirname + '/public'));
app.use('/node_modules',  express.static(__dirname + '/node_modules'));

app.listen('3000');
console.log('[Node] Le serveur est lancé.');
