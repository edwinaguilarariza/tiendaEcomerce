'use stritc'

var express = require('express');
var adminController = require('../controllers/AdminControllers');

var api = express.Router();

api.post('/registro_admin',adminController.registro_admin);
api.post('/login_admin',adminController.login_admin  );




module.exports = api;

