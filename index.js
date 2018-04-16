'use strict'

var mongoose=require('mongoose');
var port=process.env.PORT || 3333;

var app=require('./app');

mongoose.connect('mongodb://localhost:27017/gure_proiektua',(err,res)=>{
  if(err)
  {
    throw err;
  }else{
    console.log("Datu basea modu egokian lanean dabil");

    app.listen(port,()=>{
      console.log(`Gure proiektuaren API RESTful-a ${port}.portuan lan egiten`);

    });

  }

});
