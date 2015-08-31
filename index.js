var express = require('express');
var app = express();
var fs = require('fs');
app.set('port', (process.env.PORT || 5000));

var messageHtml = fs.readFileSync('index.html');
var failoverHtml = fs.readFileSync('failover.html');
function writeHeaders(response){
  response.set('Cache-Control', 'public, max-age=60');
}
function returnMessage(request, response){
  writeHeaders(response);
  response.set('Content-Type', 'text/html');
  response.send(messageHtml);
}
function returnFailover(request, response){
  writeHeaders(response);
  response.set('Content-Type', 'text/html');
  response.send(failoverHtml);
}
function returnBlack(request, response){
  writeHeaders(response);
  response.set('Content-Type', 'text/html');
  response.send('<html><head><style type="text/css">body {background-color:black;}</style></head><body>&nbps;</body></html>');
}
function returnBlankJS(request, response){
  writeHeaders(response);
  response.set('Content-Type', 'application/javascript');
  response.send('// nothing');
}
function returnBlankCSS(request, response){
  writeHeaders(response);
  response.set('Content-Type', 'text/css');
  response.send('/* nothing */');
}
function returnStatic(request, response){
  writeHeaders(response);
  response.set('Cache-Control', 'public, max-age=3600');
  response.set('Content-Type', 'text/html');
  
}
app.get('/failover/*', returnFailover);
app.get('/*.js', returnBlankJS);
app.get('/*.css', returnBlankCSS);
app.get('/*.html', returnBlack);
app.get('/*.ihtml', returnBlack);
app.get('/*.ihtml/*', returnBlack);
app.get('/', returnMessage);
app.get('/*', returnMessage);

app.listen(app.get('port'), function() {});


