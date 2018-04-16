'use strict'

var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var PlanSchema=Schema({
  izena: String,
  urtea:String,
  hilabetea:String,
  eguna:String,
  ordua:String,
  asistentzia: {type: [Schema.ObjectId],ref:'User'},
  sortzailea:String,
  ruta:{type: Schema.ObjectId,ref:'Ruta'},
  portada:Number,
  deskribapena: String,
  txatId:String,
  latitudea:String,
  longitudea:String

});

module.exports=mongoose.model('Plan',PlanSchema);
