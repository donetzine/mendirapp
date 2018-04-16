'use strict'
var express=require('express');
var bodyParser=require('body-parser');

var app=express();


var user_routes=require('./routes/user');
var image_routes=require('./routes/image');
var plan_routes=require('./routes/plan');
var ruta_routes=require('./routes/ruta');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req,res,next)=>{
  res.header('Access-Control-Allow-Origin','*');
  res.header('Access-Control-Allow-Headers','X-API-KEY,Origin,X-Repuested-With,Content-Type,Accept,Access-Control-Request-Method');

  res.header('Access-Control-Allow-Methods','GET,POST,OPTIONS,PUT,DELETE');
  res.header('Allow','GET,POST,OPTIONS,PUT,DELETE');

  next();//tenemos que lanzar la funcion next para que se salga de esta funcion
});



app.use('/mendirapp',user_routes);
app.use('/mendirapp',image_routes);
app.use('/mendirapp',plan_routes);
app.use('/mendirapp',ruta_routes);
module.exports=app;
