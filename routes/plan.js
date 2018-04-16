'use strict'

var express=require('express');
var PlanController=require('../controllers/plan');

var api=express.Router();

api.get('/plan/:id',PlanController.getPlan);
api.get('/plans',PlanController.getPlans);
api.get('/usersplans/:id',PlanController.getUsersPlans);
api.get('/plans/:izena&:deskribapena',PlanController.getPlansByIzena);
api.get('/plansdata/:data',PlanController.getPlansByData);
api.get('/planshilabete/:hilabetea',PlanController.getPlansByHilabete);
api.post('/plan',PlanController.createPlan);
api.put('/addToPlan/:id',PlanController.addUserToPlan);
api.put('/plan/:id',PlanController.updatePlan);
api.put('/deleteFromPlan/:planId',PlanController.deleteUserFromPlan);
api.delete('/plan/:id',PlanController.deletePlan);


module.exports=api;
