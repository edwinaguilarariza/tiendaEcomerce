'use strict'

var Producto = require('../models/producto');


const registro_producto_admin = async function(req,res){
    if (req.user) {
        if (req.user.role == 'admin' ) {
            let  data = req.body;
           // console.log(data);
          // console.log(req.files); 

          var img_path = req.files.portada.path;
          var name = img_path.split('\\');
          var portada_name = name[2];

          data.slug = data.titulo.toLowerCase().replace(/ /g,'-').replace(/[*\w-]+/g,'');  
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


module.exports = {
    registro_producto_admin
}
