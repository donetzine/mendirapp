'use strict'

var express = require('express');
var app     = express();

var fs      = require('fs');
var cheerio = require('cheerio');
var axios   = require('axios');

var port = process.env.PORT || 3899;

var URLak ;
var fitxRead = 'urlDenak.json';
var fitxWrite = 'rutak.json';

var rutaDenak = [];
var izenburua = "",
    herria = "",
    zailtasuna = "",
    denbora = "",
    distantzia = "",
    zirkularra = "",
    altitudeMin = "",
    altitudeMax = "",
    desnibelaIgotzen = "",
    desnibelaJaisten = "",
    argazki1 = "",
    argazki2 = "",
    argazki3 = "",
    argazki4 = "",
    argazki5 = "",
    argazki6 = "";

fs.readFile(fitxRead, 'utf8', function (err, data) {
  if (err) throw err;
  URLak = JSON.parse(data);
  console.log(URLak.length);
});

app.get('/scrape', function(req, res){

  // for(var i = 0; i < URLak.length;i++){
    function uploader(i) {
//      if( i < URLak.length ) {
        if( i < 150) {
                var argazki = [];
                var url = URLak[i].ruta;

                axios
                .get(url)
                .then(({data}) => {
                  const $ = cheerio.load(data)
                  var port = process.env.PORT || 3898;

                  $('h1.d-inline').filter(function(){
                    izenburua = $(this).text().trim();
                  });

                  $('div.crumbs.display').filter(function(){
                    herria = $(this).children().last().text();
                  });

                  $('div.more-data').filter(function(){
                    zailtasuna = $(this).children().first().children().text().trim();
                    denbora = $(this).children().next().first().children().text().trim();
                  });

                  $('.data-items.clearfix').filter(function(){
                    distantzia = $(this).children().children().first().text().trim();
                    zirkularra = $(this).children().next().children().first().text().trim();
                    desnibelaIgotzen = $(this).children().next().next().children().first().text().trim();
                    altitudeMax = $(this).children().next().next().next().children().first().text().trim();
                    desnibelaJaisten = $(this).children().next().next().next().next().children().first().text().trim();
                    altitudeMin = $(this).children().children().last().text().trim();
                  });

                  $('img.img-responsive').each(function(j, element){
                    var argaz = $(element).attr("src");
                    argazki.push(argaz);
                  });

                  var json = {
                    izenburua : izenburua,
                    herria : herria,
                    zailtasuna : zailtasuna,
                    denbora : denbora,
                    distantzia : distantzia,
                    zirkularra : zirkularra,
                    desnibelaIgotzen : desnibelaIgotzen,
                    altitudeMax : altitudeMax,
                    desnibelaJaisten : desnibelaJaisten,
                    altitudeMin : altitudeMin,
                    argazki1 : argazki[0],
                    argazki2 : argazki[1],
                    argazki3 : argazki[2],
                    argazki4 : argazki[3],
                    argazki5 : argazki[4],
                    argazki6 : argazki[5]
                  };
                  rutaDenak.push(json);

                  fs.writeFile(fitxWrite, JSON.stringify(rutaDenak, null, 4), function(err){
                    console.log('Blokea ondo idatzia! -->  "'+fitxWrite+'"');
                  });
                })
                .catch(console.error)

            uploader(i+1)
        }
      }
    uploader(0)

  res.send('Ruten URL-ak lortuta!')
})

app.listen(port)
console.log("API WIKILOC funtzionatzen -> http://localhost:" + port);

exports = module.exports = app;
