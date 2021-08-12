'use strict'

var Producto = require('../models/producto');


const registro_producto_admin = async function(req,res){
    if (req.user) {
        if (req.user.role == 'admin' ) {
            let  data = req.body;
            console.log(data);
           console.log(req.files); 
            
        }else{
            res.status(500).send({message:'NoAccess'});
        }
    }else{
        res.status(500).send({message:'NoAccess'});
    }
}


module.exports = {
    registro_producto_admin
}
