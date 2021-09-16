'use strict'


let Carrito = require('../models/carrito');

const agregar_carrito_cliente  = async function(req,res){
    if (req.user) {
        let data = req.body;

        let carrito_cliente = await Carrito.find({cliente:data.cliente,producto:data.producto});
        if (carrito_cliente.length == 0) {
            let reg = await Carrito.create(data);
        res.status(200).send({data:reg});
        } else if(carrito_cliente.length >= 1){
            res.status(200).send({data:undefined});
        }

        
    } else {
        res.status(500).send({message:'NoAccess'});  
    }
}



module.exports = {
    agregar_carrito_cliente
}