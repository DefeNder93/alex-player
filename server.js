var express = require('express');
var app = express();
var compress = require('compression');
var port = 9000;

app.use(compress());

app.use(express.static('.'));

app.listen(port);

console.log('Listening on port ' + port);