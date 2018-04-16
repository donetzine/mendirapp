'use strict'

var path=require('path');
var Plan=require('../models/plan');
var User=require('../models/user');

function getPlan(req,res){
  var planId=req.params.id;

  Plan.findById(planId,(err,plan)=>{
    if(err){
      res.status(500).send({message: 'Errorea plana eskuratzean'});
    }else{
      if(!plan){
        res.status(404).send({message: 'Ez da plana existitzen'});
      }else{
        User.populate(plan,{path: 'asistentzia'},(err,plan)=>{//erabiltzaile bakoitzaren datuak ateratzeko
          //puntu honetan image objetua eguneratuta dago. Honen album eremuan albumaren parametroak egongo dira
          if(err){
            res.status(500).send({message: 'Errorea plana eta erabiltzaileak elkarlotzean'});
          }else{
            res.status(200).send({plan});
          }
        });
      }
    }
  });
}

//funtzio hau proba bat da urltik 2 parametro nola pasa daitezkeen ikusteko
function getPlansByIzena(req,res){
  var planIzena=req.params.izena;
  var planDeskribapena=req.params.deskribapena;

  Plan.find({'izena':planIzena,'deskribapena':planDeskribapena},(err,plans)=>{
    if(err){
      res.status(500).send({message: 'Errorea planak eskuratzean'});
    }else{
      if(!plans){
        res.status(404).send({message: 'Ez da plana existitzen'});
      }else{
        User.populate(plans,{path: 'asistentzia'},(err,plans)=>{//erabiltzaile bakoitzaren datuak ateratzeko
          //puntu honetan image objetua eguneratuta dago. Honen album eremuan albumaren parametroak egongo dira
          if(err){
            res.status(500).send({message: 'Errorea plana eta erabiltzaileak elkarlotzean'});
          }else{
            res.status(200).send({plans});
          }
        });
      }
    }
  });
}

function getPlansByHilabete(req,res){
  var hilabetea=req.params.hilabetea;

  Plan.find({'hilabetea':hilabetea}).sort('eguna').exec((err,plans)=>{
    if(err){
      res.status(500).send({message: 'Errorea hilabete honetako planak eskuratzean'});
    }else{
      if(!plans){
        res.status(404).send({message: 'Hilabete honetan ez dago planik'});
      }else{
        User.populate(plans,{path: 'asistentzia'},(err,plans)=>{//erabiltzaile bakoitzaren datuak ateratzeko
          //puntu honetan image objetua eguneratuta dago. Honen album eremuan albumaren parametroak egongo dira
          if(err){
            res.status(500).send({message: 'Errorea plana eta erabiltzaileak elkarlotzean'});
          }else{
            res.status(200).send({plans});
          }
        });
      }
    }
  });
}
function getPlansByData(req,res){
  var data=req.params.data;
  var aldagaiak=data.split('-');
  var urtea=aldagaiak[0];
  var hilabetea=aldagaiak[1];
  var eguna=aldagaiak[2];

  Plan.find({'urtea':urtea,'hilabetea':hilabetea,'eguna':eguna},(err,plans)=>{
    if(err){
      res.status(500).send({message: 'Errorea planak eskuratzean'});
    }else{
      if(!plans){
        res.status(404).send({message: 'Ez dira data horretako planak existitzen'});
      }else{
        User.populate(plans,{path: 'asistentzia'},(err,plans)=>{//erabiltzaile bakoitzaren datuak ateratzeko
          //puntu honetan image objetua eguneratuta dago. Honen album eremuan albumaren parametroak egongo dira
          if(err){
            res.status(500).send({message: 'Errorea plana eta erabiltzaileak elkarlotzean'});
          }else{
            res.status(200).send({plans});
          }
        });
      }
    }
  });
}

function getPlans(req,res){

  Plan.find({}).sort('izena').sort('urtea').sort('hilabetea').sort('eguna').sort('ordua').exec((err,plans)=>{
    if(err){
      res.status(500).send({message: 'Errorea planak eskuratzean'});
    }else{
      if(!plans){
        res.status(404).send({message: 'Ez dago planik'});
      }else{
        User.populate(plans,{path: 'asistentzia'},(err,plans)=>{
          if(err){
            res.status(500).send({message: 'Errorea planak eta erabiltzaileak elkarlotzean'});
          }else{
            res.status(200).send({plans});
          }
        });
      }
    };
});
}

function getUsersPlans(req,res){
  var userId=req.params.id;
  Plan.find({'asistentzia':userId}).sort('urtea').sort('hilabetea').exec((err,plans)=>{
    if(err){
      res.status(500).send({message: 'Errorea planak eskuratzean'});
    }else{
      if(!plans){
        res.status(404).send({message: 'Ez dago planik'});
      }else{
        User.populate(plans,{path: 'asistentzia'},(err,plans)=>{
          if(err){
            res.status(500).send({message: 'Errorea planak eta erabiltzaileak elkarlotzean'});
          }else{
            res.status(200).send({plans});
          }
        });
      }
    };
});
}

function createPlan(req,res){
  var planId=req.params.id;
  var params=req.body;
  var data=params.data;

  if(data){
    var aldagaiak=data.split('-');
    var urtea=aldagaiak[0];
    var hilabetea=aldagaiak[1];
    var eguna=aldagaiak[2];
  }


  var plan=new Plan();
  plan.izena=params.izena;
  plan.deskribapena=params.deskribapena;
  plan.ordua=params.ordua;
  plan.urtea=urtea;
  plan.hilabetea=hilabetea;
  plan.eguna=eguna;
  plan.izenaEmana=params.izenaEmana;
  plan.mapa=params.mapa;
  plan.asistentzia.push(params.sortzaileId);
  plan.sortzailea=params.sortzaileId;
  plan.ruta=params.ruta;
  plan.portada=params.portada;
  plan.txatId=params.txatId;
  plan.latitudea=params.latitudea;
  plan.longitudea=params.longitudea;

  plan.save(planId,(err,planStored)=>{
    if(err){
      res.status(500).send({message: 'Errorea plana gordetzean'});
    }else{
      if(!planStored){
        res.status(404).send({message: 'Ez da plana gorde'});
      }else{
        User.populate(plan,{path: 'asistentzia'},(err,plan)=>{//erabiltzaile bakoitzaren datuak ateratzeko
          //puntu honetan image objetua eguneratuta dago. Honen album eremuan albumaren parametroak egongo dira
          if(err){
            res.status(500).send({message: 'Errorea plana eta erabiltzaileak elkarlotzean'});
          }else{
            res.status(200).send({plan: planStored});
          }
        });
      }
    }

  });

}

function updatePlan(req,res){
  var planId=req.params.id;
  var update=req.body;
  var data=update.data;

  if(data){
    var aldagaiak=data.split('-');
    update.urtea=aldagaiak[0];
    update.hilabetea=aldagaiak[1];
    update.eguna=aldagaiak[2];
  }


  Plan.findByIdAndUpdate(planId,update,(err,planUpdated)=>{
    if(err){
      res.status(500).send({message: 'Errorea plana eguneratzean'});
    }else{
      if(!planUpdated){
        res.status(404).send({message: 'Ez da plana eguneratu'});
      }else{
        User.populate(plan,{path: 'asistentzia'},(err,plan)=>{//erabiltzaile bakoitzaren datuak ateratzeko
          //puntu honetan image objetua eguneratuta dago. Honen album eremuan albumaren parametroak egongo dira
          if(err){
            res.status(500).send({message: 'Errorea plana eta erabiltzaileak elkarlotzean'});
          }else{
            res.status(200).send({plan: planUpdated});
          }
        });
        }
    }
  });

}

function deletePlan(req,res){
  var planId=req.params.id;

  Plan.findByIdAndRemove(planId,(err,planDeleted)=>{
    if(err){
      res.status(500).send({message: 'Errorea plana ezabatzean'});
    }else{
      if(!planDeleted){
        res.status(404).send({message: 'Ezin izan da plana ezabatu'});
      }else{
        res.status(200).send({plan: planDeleted});
        }
    }

  });

}

function addUserToPlan(req,res){
  var planId=req.params.id;
  var params=req.body;
  var user=params.user;
  var planb;
  Plan.findById(planId,(err,plan)=>{
    if(err){
      res.status(500).send({message: 'Errorea plana eskuratzean'});
    }else{
      if(!plan){
        res.status(404).send({message: 'Ezin izan da erabiltzailea gehitu, ez dago plan hori'});
      }else{
        //komprobaketa egin beharko da jadanik erabiltzailea apuntatuta dagoen ikusteko
        var badago=false;
        for(var i=0;i<plan.asistentzia.length;i++){
            if(plan.asistentzia[i]==user){
              badago=true;
            }
        }
        if(badago==false){
            plan.asistentzia.push(user);
            Plan.findByIdAndUpdate(planId,plan,(err,plan)=>{
            if(err){
              res.status(500).send({message: 'Errorea erabiltzailea gehitzean2'});
            }if(!plan){
              res.status(404).send({message: 'Ezin izan da erabiltzailea gehitu2'});
            }else{
              User.populate(plan,{path: 'asistentzia'},(err,plan)=>{//erabiltzaile bakoitzaren datuak ateratzeko
                //puntu honetan image objetua eguneratuta dago. Honen album eremuan albumaren parametroak egongo dira
                if(err){
                  res.status(500).send({message: 'Errorea plana eta erabiltzaileak elkarlotzean'});
                }else{
                  res.status(200).send({plan: plan});
                }
              });
            }
          });
        }else{
            res.status(404).send({message: 'Erabiltzailea jadanik gehituta dago planean'});
        }


        }
    }

  });

}
function deleteUserFromPlan(req,res){
  var planId=req.params.planId;
  var params=req.body;
  var user=params.user;
  var planb;
  Plan.findById(planId,(err,plan)=>{
    if(err){
      res.status(500).send({message: 'Errorea plana eskuratzean'});
    }else{
      if(!plan){
        res.status(404).send({message: 'Ezin izan da erabiltzailea ezabatu, ez dago plan hori'});
      }else{
        //komprobaketa egin beharko da jadanik erabiltzailea apuntatuta dagoen ikusteko
        var badago=false;
        var j=null;
        for(var i=0;i<plan.asistentzia.length;i++){
            if(plan.asistentzia[i]==user){
              badago=true;
              j=i;
            }
        }
        if(badago==true){
            plan.asistentzia.splice(j,1);
            Plan.findByIdAndUpdate(planId,plan,(err,plan)=>{
            if(err){
              res.status(500).send({message: 'Errorea erabiltzailea ezabatzean'});
            }if(!plan){
              res.status(404).send({message: 'Ezin izan da erabiltzailea ezabatu'});
            }else{
              User.populate(plan,{path: 'asistentzia'},(err,plan)=>{//erabiltzaile bakoitzaren datuak ateratzeko
                //puntu honetan image objetua eguneratuta dago. Honen album eremuan albumaren parametroak egongo dira
                if(err){
                  res.status(500).send({message: 'Errorea plana eta erabiltzaileak elkarlotzean'});
                }else{
                  res.status(200).send({plan: plan});
                }
              });
            }
          });
        }else{
            res.status(404).send({message: 'Erabiltzailea jadanik ez dago planean'});
        }


        }
    }

  });

}

module.exports={
  getPlan,
  getPlans,
  createPlan,
  updatePlan,
  deletePlan,
  addUserToPlan,
  getPlansByIzena,
  getPlansByData,
  getPlansByHilabete,
  deleteUserFromPlan,
  getUsersPlans
}
