'use strict'

var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var ImageSchema=Schema({
  title: String,
  picture: String,
});

module.exports=mongoose.model('Image',ImageSchema);
