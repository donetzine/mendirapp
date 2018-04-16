'use strict'
var crypto = require('crypto');
var User=require('../models/user');
var Image=require('../models/image');

function getUser(req,res){
  var userId=req.params.id;

  User.findById(userId,(err,user)=>{
    if(err)
    {
       res.status(500).send({message: 'Errorea erabiltzailea eskuratzean'});
    }else{
      if(!user){
        res.status(404).send({message: 'Erabiltzaile hori ez da existitzen'});
      }else{
          //argazkiaren informazioa agertzea beharrezkoa bada, populate egin hemen
          //res.status(200).send({user});
          Image.populate(user,{path: 'argazkia'},(err,user)=>{//para sacar los datos de la imagen que tiene vinculados
          //puntu honetan user objetua eguneratuta dago. Honen argazkia eremuan irudiaren parametroak egongo dira
          if(err){
            res.status(500).send({message: 'Error en la petición'});
          }else{
            res.status(200).send({user});
          }
        });
        }

    }
  });
}

function getUsers(req,res){
  var userId=req.params.id;

  User.find({},(err,users)=>{
    if(err)
    {
       res.status(500).send({message: 'Errorea erabiltzaileak eskuratzean'});
    }else{
      if(!users){
        res.status(404).send({message: 'Ez dago erabiltzailerik'});
      }else{
          //argazkiaren informazioa agertzea beharrezkoa bada, populate egin hemen
          //res.status(200).send({users});
          Image.populate(users,{path: 'argazkia'},(err,users)=>{//para sacar los datos de la imagen que tiene vinculados
          //puntu honetan user objetua eguneratuta dago. Honen argazkia eremuan irudiaren parametroak egongo dira
          if(err){
            res.status(500).send({message: 'Error en la petición'});
          }else{
            res.status(200).send({users});
          }
        });
        }

    }
  });
}

function saveUser(req,res){
  var user=new User();
  //izena,email,hash eta salt register bitartez lortuko dira
  var params=req.body;
  user.izena=params.izena;//probarako soilik, parametro hau registerretik lortuko da
  user.email=params.email;//probarako hau ere
  user.abizena1=params.abizena1;
  user.abizena2=params.abizena2;
  user.herria=params.herria;
  user.jaiotzeData=params.jaiotzeData;
  user.argazkia=params.argazkia;

  user.save((err,userStored)=>{
    if(err)
    {
      console.log(err);
      res.status(500).send({message: 'Errorea erabiltzailea gordetzerakoan'});
    }else{
      if(!userStored){
        res.status(404).send({message: 'Ezin izan da erabiltzailea gorde'});
      }else{
          res.status(200).send({user: userStored});
        }
    }
  });
}

function existsUser(req,res){
  var email=req.params.email;

  User.find({'email':email},(err,user)=>{
    if(err){
       res.status(500).send({message: 'Errorea erabiltzailea eskuratzean'});
    }else{
      if(!user|| user==false){//array hutsa = false delako. Hau da, []=false da
        res.status(404).send({message: 'Ez dago email hori erregistratuta'});
      }else{
          //argazkiaren informazioa agertzea beharrezkoa bada, populate egin hemen
          res.status(200).send({user: user});
        }

    }
  });
}

function updateUser(req,res){
  var userId=req.params.id;
  var update=req.body;

  User.findByIdAndUpdate(userId,update,(err,userUpdated)=>{
    if(err)
    {
      res.status(500).send({message: 'Errorea erabiltzailea gaurkotzean'});
    }else{
      if(!userUpdated){
        res.status(404).send({message: 'Ezin izan da erabiltzailea gaurkotu'});
      }else{
          res.status(200).send({user: userUpdated});
        }
    }
  });
}

function deleteUser(req,res){
  var userId=req.params.id;

  User.findByIdAndRemove(userId,(err,userRemoved)=>{
    if(err)
    {
      res.status(500).send({message: 'Errorea erabiltzailea ezabatzean'});
    }else{
      if(!userRemoved){
        res.status(404).send({message: 'Ezin da erabiltzailea ezabatu'});
      }else{
          res.status(200).send({user: userRemoved});
        }
    }
  });
}
module.exports={
  getUser,
  getUsers,
  saveUser,
  updateUser,
  deleteUser,
  existsUser
}
