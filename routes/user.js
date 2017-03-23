'use restrict';
var express=require('express');
var UserController=require('../controller/user');

var api=express.Router();

api.get('/probando-controlador',UserController.pruebas);
api.post('/register',UserController.saveUser);  
api.post('/login/',UserController.loginUser);  
api.get('/user/:userid',UserController.buscarUsuario);  
module.exports=api;