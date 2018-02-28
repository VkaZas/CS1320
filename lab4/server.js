var express = require('express')
var bodyParser = require('body-parser')
var app = express();
var fs = require('fs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/login', function(request, response) {
  response.writeHead(200, {'Content-Type': 'text/html'});
  fs.readFile('login.html', function(err, data) {
    response.write(data);
    return response.end();
  })
});

app.get('/', function(request, response) {
  response.redirect('/login');
})

app.post('/home', function(request, response) {
  response.write(request.body.username)
  response.writeHead(200, {'Content-Type': 'text/html'});
  fs.readFile('home.html', function(err, data) {
    response.write(data);
    response.end();
  })
});

app.post('/logout', function(request, response) {
  response.writeHead(200, {'Content-Type': 'text/html'});
  response.write('<script>setTimeout(function() {window.location = "/login";}, 2000)</script>');
  response.end();
});

app.post('/market', function(request, response) {
  response.writeHead(200, {'Content-Type': 'text/html'});
  response.write('<h1>Maret Updates TBA</h1>')
  response.end();

});

app.get('*', function(request, response) {
  response.writeHead(404, {'Content-Type': 'text/html'});
  return response.end("404 Not Found");
});

app.listen(8081, function() {
  console.log('Server listening on port 8081');
})
