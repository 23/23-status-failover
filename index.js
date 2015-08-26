var express = require('express');
var app = express();
var fs = require('fs');
app.set('port', (process.env.PORT || 5000));

var messageHtml = fs.readFileSync('index.html');
function returnMessage(request, response){
  response.set('Content-Type', 'text/html');
  response.send(messageHtml);
}
function returnBlack(request, response){
  response.set('Content-Type', 'text/html');
  response.send('<html><head><style type="text/css">body {background-color:black;}</style></head><body>&nbps;</body></html>');
}
function returnBlankJS(request, response){
  response.set('Content-Type', 'application/javascript');
  response.send('// nothing');
}
function returnBlankCSS(request, response){
  response.set('Content-Type', 'text/css');
  response.send('/* nothing */');
}
app.get('/*.js', returnBlankJS);
app.get('/*.css', returnBlankJS);
app.get('/*.html', returnBlack);
app.get('/*.ihtml', returnBlack);
app.get('/*.ihtml/*', returnBlack);
app.get('/', returnMessage);
app.get('/*', returnMessage);

app.listen(app.get('port'), function() {});


