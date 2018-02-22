// use strict compiling
"use strict";
var express = require('express');

var app = express();

// serve static files
app.use(express.static('dist'));

app.listen(8080, function(){
    console.log('- Server listening on port 8080');
});
