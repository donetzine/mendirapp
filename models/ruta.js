'use strict'

var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var RutaSchema=Schema({
  izenburua: String,
  herria: String,
  zailtasuna: String,
  denbora: String,
  distantzia: String,
  zirkularra: String,
  desnibelaIgotzen: String,
  altitudeMax: String,
  desnibelaJaisten: String,
  altitudeMin: String,
  argazki1: String,
  argazki2: String,
  argazki3: String,
  argazki4: String,
  argazki5: String,
  argazki6: String
});

module.exports=mongoose.model('Ruta',RutaSchema);
