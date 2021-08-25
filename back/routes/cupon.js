'use strict'

var express = require('express');
var CuponController = require('../controllers/cuponController');

var api = express.Router();
var auth = require('../middlewares/authenticate');

api.post('/registro_cupon_admin',auth.auth,CuponController.registro_cupon_admin);

module.exports = api;

