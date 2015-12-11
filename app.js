var express = require('express');
var https = require('https');
var request = require('request');
require('dotenv').load({silent: true});
var favicon = require('serve-favicon')
var express = require('express');

var app = express();
app.set('view engine', 'jade');
app.use(favicon(__dirname + '/public/images/favicon.ico'))
app.use(express.static('public'))

app.get('/', function (req, res) {
  res.render('landing', {title: 'Turn On Siren', content: 'Activate the Physical Web Siren... you know you want to.'})
});

app.get('/on', function (req, res) {
  var url = 'https://maker.ifttt.com/trigger/on_light/with/key/' + process.env.IF_KEY
  console.log(url)
  https.get(url, function (response) {
    response.on('data', function (chunk) {
      console.log(chunk);
      res.render('on', {title: 'Physical Web Siren', content: 'Woo Woo. The Physical Web Siren!'})
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
   var url = 'https://maker.ifttt.com/trigger/off_light/with/key/' + process.env.IF_KEY
   console.log(url)
   https.get(url, function (response) {

  	response.on('data', function (chunk) {
      console.log(chunk);
      res.render('off', {title: 'Physical Web Siren', content: 'Activate the Physical Web Siren... you know you want to.'});
    })
  	response.on('end',function(){
        console.log("\nResponse ended\n");
  	});
  	response.on('error', function(err){
        console.log("Error Occurred: "+err.message);
  	});
  })
})

app.listen(3000);