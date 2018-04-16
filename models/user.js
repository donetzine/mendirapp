'use strict'

var mongoose=require('mongoose');
var Schema=mongoose.Schema;


var UserSchema=Schema({
  izena: {
    type: String,
    required: true
  },
  abizena1: String,
  abizena2: String,
  email: {
    type: String,
    unique: true,
    required: true
  },
  herria: String,
  jaiotzeData: String,
  salt: String,//is a string of characters unique to each user.
  hash: String,//is created by combining the password provided by the user and the salt, and then applying one-way encryption
  argazkia: {type: Schema.ObjectId,ref:'Image'}


});

module.exports=mongoose.model('User',UserSchema);//Honek sortuko du User izeneko entitatea DBan
