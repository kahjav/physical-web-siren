var express = require('express');
var https = require('https');
var request = require('request');
require('dotenv').load({silent: true});


var app = express();
app.set('view engine', 'jade');

app.get('/', function (req, res) {
  https.get('https://maker.ifttt.com/trigger/on_light/with/key/' + process.env.IF_KEY, function (response) {
  	response.on('data', function (chunk) {
      console.log(chunk);
      res.render('on', {title: 'Turn On Siren'})
  	});
  	response.on('end',function(){
        console.log("\nResponse ended\n");
  	});
  	response.on('error', function(err){
        console.log("Error Occurred: "+err.message);
  	});
  })
});

app.get('/off', function (req, res) {
   https.get('https://maker.ifttt.com/trigger/off_light/with/key/' + process.env.IF_KEY, function (response) {
  	response.on('data', function (chunk) {
      console.log(chunk);
      res.render('off', {title: 'Physical Web Siren'});
    })
  	response.on('end',function(){
        console.log("\nResponse ended\n");
  	});
  	response.on('error', function(err){
        console.log("Error Occurred: "+err.message);
  	});
  })
})

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});