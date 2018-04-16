'use strict'

var express = require('express');
var app     = express();

var fs      = require('fs');
var cheerio = require('cheerio');
var axios   = require('axios');

var port = process.env.PORT || 3898;

var fitx = 'urlDenak.json'
var urlDenak = [];

//
  app.get('/scrape', function(req, res){

for(var i = 1000; i < 1100;i++){
  var num1=0+10*i,
      num2=10+10*i,
      url = 'https://eu.wikiloc.com/ibilbideak/senderismo/espainia/euskadi?from='+num1+'&to='+num2;

    axios
    .get(url)
    .then(({data}) => {
      const $ = cheerio.load(data)
      var port = process.env.PORT || 3898;


      $('a.trail-title').each(function(i, element){

        var rutaURL = $(element).attr("href");
        var rutaIzena = $(element).attr("title");

        var json = {
          izenburua : rutaIzena,
          ruta  : rutaURL
        };
        urlDenak.push(json);

      })
      fs.writeFile(fitx, JSON.stringify(urlDenak, null, 4), function(err){
        console.log('Blokea ondo idatzia! -->  "'+fitx+'"');
            })
    })
    .catch(console.error)
  }
  res.send('Ruten URL-ak lortuta!')
  })

app.listen(port)
console.log("API WIKILOC funtzionatzen -> http://localhost:" + port+"/scrape");
exports = module.exports = app;
