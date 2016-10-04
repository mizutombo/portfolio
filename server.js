// set up of basic Express static server

var express = require('express');
var app = express();

app.use(express.static('./'));

app.get('*', function(request, response) {
  console.log('NEW REQUEST FROM: ', request.url);
  response.sendFile('index.html', {root: '.'});
});

app.listen(3000, function() {
  console.log('SERVER IS UP ON PORT 3000');
});
