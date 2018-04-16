'use strict'


var path=require('path');
var Plan=require('../models/plan');
var User=require('../models/user');
var Ruta=require('../models/ruta');

function getRuta(req,res){
  var rutaId=req.params.id;

  Ruta.findById(rutaId,(err,ruta)=>{
    if(err){
      res.status(500).send({message: 'Errorea ruta eskuratzean'});
    }else{
      if(!ruta){
        res.status(404).send({message: 'Ez da ruta existitzen'});
      }else{
        res.status(200).send({ruta});
      }
    }
  });
}

function getRutas(req,res){

  Ruta.find({}).sort('title').exec((err,rutas)=>{
    if(err){
      res.status(500).send({message: 'Errorea rutak eskuratzean'});
    }else{
      if(!rutas){
        res.status(404).send({message: 'Ez dago rutarik'});
      }else{
        res.status(200).send({rutas});
      }
    };
});
}
function getRutasByCriterios(req,res){
  //honela pasatu behar zaizkio parametroak funtzio honi:
  //http://localhost:3333/mendirapp/rutascriterios/Urkiola&05&15&Ertaina&Bai
  var herria=req.params.herria;
  var distmin=req.params.distmin+' km';
  var distmax=req.params.distmax+' km';
  var zailtasuna=req.params.zailtasuna;
  var zirkularra=req.params.zirkularra;
Ruta.find({'herria':herria,'distantzia':{$gt: distmin,$lt:distmax},'zailtasuna':zailtasuna,'zirkularra':zirkularra},(err,rutas)=>{
  if(err){
    res.status(500).send({message: 'Errorea rutak eskuratzean'});
  }else{
    if(!rutas || rutas==false){
      res.status(404).send({message: 'Ez dago rutarik baldintza horietan'});
    }else{
      res.status(200).send({rutas});
    }
  };
});
}

function createRuta(req,res){
  var rutaId=req.params.id;
  var params=req.body;

  var ruta=new Ruta();
  ruta.izenburua=params.izenburua;
  ruta.herria=params.herria;
  ruta.zailtasuna=params.zailtasuna;
  ruta.denbora=params.denbora;
  ruta.distantzia=params.distantzia;
  ruta.zirkularra=params.zirkularra;
  ruta.desnibelaIgotzen=params.desnibelaIgotzen;
  ruta.altitudeMax=params.altitudeMax;
  ruta.desnibelaJaisten=params.desnibelaJaisten;
  ruta.altitudeMin=params.altitudeMin;
  ruta.argazki1=params.argazki1;
  ruta.argazki2=params.argazki2;
  ruta.argazki3=params.argazki3;
  ruta.argazki4=params.argazki4;
  ruta.argazki5=params.argazki5;
  ruta.argazki6=params.argazki6;

  ruta.save(rutaId,(err,rutaStored)=>{
    if(err){
      res.status(500).send({message: 'Errorea ruta gordetzean'});
    }else{
      if(!rutaStored){
        res.status(404).send({message: 'Ez da ruta gorde'});
      }else{
        res.status(200).send({ruta: rutaStored});  }
    }

  });

}

function updateRuta(req,res){
  var rutaId=req.params.id;
  var update=req.body;

  Ruta.findByIdAndUpdate(planId,update,(err,rutaUpdated)=>{
    if(err){
      res.status(500).send({message: 'Errorea ruta eguneratzean'});
    }else{
      if(!rutaUpdated){
        res.status(404).send({message: 'Ez da ruta eguneratu'});
      }else{
        res.status(200).send({ruta: rutaUpdated});
        }
    }
  });

}

function deleteRuta(req,res){
  var rutaId=req.params.id;

  Ruta.findByIdAndRemove(rutaId,(err,rutaDeleted)=>{
    if(err){
      res.status(500).send({message: 'Errorea ruta ezabatzean'});
    }else{
      if(!rutaDeleted){
        res.status(404).send({message: 'Ezin izan da ruta ezabatu'});
      }else{
        res.status(200).send({ruta: rutaDeleted});
        }
    }

  });

}


module.exports={
  getRuta,
  getRutas,
  createRuta,
  updateRuta,
  deleteRuta,
  getRutasByCriterios
}
