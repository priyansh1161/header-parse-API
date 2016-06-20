var express = require('express');
var fs = require('fs');
var app = express();
var port = process.env.PORT || 3000;
app.listen(port);
app.use('/public',express.static(__dirname + '/public'))
app.get('/' , function(req,res){
   var page = fs.readFileSync(__dirname + '/index.html' , 'utf-8');
   res.send(page);
});
app.get('/api' , function(req,res){
  var ip = req.ip;
  var language = req.headers['accept-language'].split(',')[0];
  var os = req.headers['user-agent'].match(/\(([^)]*)\)/)[1];
  var ind = ip.lastIndexOf(':');
  ip = ip.substr(ind+1,ip.length);

  res.send({
    ipaddress : ip,
    language : language,
    software : os
  });
});
