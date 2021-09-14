'use strict'


let Carrito = require('../models/carrito');

const agregar_carrito_cliente  = async function(req,res){
    if (req.user) {
        let data = req.body;

        let reg = await Carrito.create(data);
        res.status(200).send({data:reg});
    } else {
        res.status(500).send({message:'NoAccess'});  
    }
}



module.exports = {
    agregar_carrito_cliente
}