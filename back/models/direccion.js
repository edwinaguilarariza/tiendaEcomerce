'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DireccionSchema = Schema({
    cliente: {type: Schema.ObjectId, ref: 'cliente', required:true },
    destinatario: {type: String, required:true},
    dni: {type: String, required:true},
    zip: {type: String, required:true},
    direccion: {type: String, required:true},
    pais: {type: String, required:true},
    region: {type: String, required:true},
    provincia: {type: String, required:true},
    distrito: {type: String, required:true},
    telefono: {type: String, required:true},
    principal: {type: Boolean, required:true},
    createdAt:{ type:Date,default:Date.now, required: true },
});
   
   
    
   

module.exports = mongoose.model('direccion',DireccionSchema);
    
 