'use strict'

var Producto = require('../models/producto');
var fs = require('fs');
var path = require('path');


const registro_producto_admin = async function(req,res){
    if (req.user) {
        if (req.user.role == 'admin' ) {
            let  data = req.body;
            console.log(data);
          console.log(req.files); 

          var img_path = req.files.portada.path;
          var name = img_path.split('\\');
          var portada_name = name[2];

          data.slug = data.titulo.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,'');
          data.portada = portada_name;
          let reg = await Producto.create(data);
          res.status(200).send({data:reg});
            
        }else{
            res.status(500).send({message:'NoAccess'});
        }
    }else{
        res.status(500).send({message:'NoAccess'});
    }
}


const listar_productos_admin = async function(req,res){

    if (req.user) {
        if (req.user.role == 'admin' ) {
         
            var filtro = req.params['filtro'];
            let reg = await Producto.find({titulo: new RegExp(filtro,'i')});
            res.status(200).send({data:reg});
        }else{
            res.status(500).send({message:'NoAccess'});
        }
    }else{
        res.status(500).send({message:'NoAccess'});
    }

}

const obtener_portada = async function(req,res){
    var img = req.params['img'];
    console.log(img);

    fs.stat('./uploads/productos/' + img , function(err){
        if (!err) {
            let path_img = './uploads/productos/' + img;
            res.status(200).sendFile(path.resolve(path_img));
        }else{
            let path_img = './uploads/default.jpg';
            res.status(200).sendFile(path.resolve(path_img));
        }
    })
}


module.exports = {
    registro_producto_admin,
    listar_productos_admin,
    obtener_portada
}
