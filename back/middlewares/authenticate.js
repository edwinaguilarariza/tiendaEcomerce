"use strict"


 var jwt = require('jwt-simple');
 var moment = require('moment');
 var secret = 'edwinaguilarariza';



exports.auth =function(req,res,next){
  
    if (!req.headers.authorization) {
        return res.status(403).send({message: 'NoHeadersError'});
    }

    var token = req.headers.authorization.replace(/['"]+/g,'');
    var segment = token.split('.');

   

    if (segment.length != 3) {
        return res.status(403).send({message: 'invalidToken'});
    }else{
        try {
            var payload = jwt.decode(token,secret);
            if (payload <= moment().unix() ) {
                return res.status(403).send({message: 'tokenExpirado'});
            }
        } catch (error) {
            return res.status(403).send({message: 'invalidToken'});
        }
    }

    req.user = payload;

        next();
}