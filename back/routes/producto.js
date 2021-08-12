'use strict'

var express = require('express');
var productoController = require('../controllers/productoControllers');

var api = express.Router();
var auth = require('../middlewares/authenticate');
var multiparty = require('connect-multiparty');
var path = multiparty({uploadDir:'./uploads/productos' });

api.post('/registro_producto_admin',[auth.auth,path],productoController.registro_producto_admin);



module.exports = api;

     