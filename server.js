var express = require('express');

var app = express();

// serve static files
app.use(express.static(__dirname + '/public'));
app.use('/node_modules',  express.static(__dirname + '/node_modules'));

app.listen('3000');
console.log('[Node] Le serveur est lancé.');
