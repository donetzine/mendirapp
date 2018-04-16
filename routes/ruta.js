'use strict'

var express=require('express');
var RutaController=require('../controllers/ruta');

var api=express.Router();

api.get('/ruta/:id',RutaController.getRuta);
api.get('/rutas',RutaController.getRutas);
//api.get('/rutascriterios/:herria&:zailtasuna&:zirkularra',RutaController.getRutasByCriterios);
api.get('/rutascriterios/:herria&:distmin&:distmax&:zailtasuna&:zirkularra',RutaController.getRutasByCriterios);
api.post('/ruta',RutaController.createRuta);
api.put('/ruta/:id',RutaController.updateRuta);
api.delete('/ruta/:id',RutaController.deleteRuta);
module.exports=api;
