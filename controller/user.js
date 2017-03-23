'use restrict'
var bcrypt = require('bcrypt-nodejs');
var User = require('../models/user');

function pruebas(req, res) {
    res.status(200).send({
        message: 'Probando una accion del controlador'
    });
}

function saveUser(req, res) {
    var user = new User();
    var params = req.body;
    user.name = params.name;
    user.surname = params.surname;
    user.email = params.email;
    user.role = 'ROLE_ADMIN';
    user.image = 'null';
    console.log(params);
    if (params.password) {
        //Encriptar contraseña
        bcrypt.hash(params.password, null, null, (err, hash) => {
            user.password = hash;
            if (user.name !== null && user.surname !== null && user.email !== null) {
                //guardar el usuario
                user.save((err, userStored) => {
                    if (err) {
                        res.status(500).send({ message: 'Error al guardar usuario' });
                    } else {
                        if (!userStored) {
                            res.status(404).send({ message: 'No se ha registrado el usuario' });
                        } else {
                            res.status(200).send({ user: userStored });
                        }
                    }
                });
            } else {
                res.status(200).send({ message: 'Rellena todos los campos' });
            }
        });
    } else {
        res.status(200).send({ message: 'Introduce la contraseña' });
    }
}

function loginUser(req, res) {
  //  var params = req.body;
    let email = req.params.email;
    //var password = params.password;

    User.findOne({email: email}, (err, user) => {
        if (err) {
            res.status(500).send({ message: 'Error en la peticion' });
        } else {
            if (!user) {
                res.status(404).send({ message: 'El usuario no existe' });
            } else {
                bcrypt.compare(password,user.password,function(err,check){
                      if(check){
                            //devolver los datos usuario logueado
                            if(params.gethash){
                                //devolver un token de jwt
                            }else{
                                res.status(200).send({user});
                            }
                      }else{
                        res.status(404).send({ message: 'El usuario no ha podido loguease' });
                      }
                });
            }
        }
    });
}

function buscarUsuario(req,res){
    let userId=req.params.userid;
    User.findById(userId,(err,product)=>{
        if(err){
            res.status(500).send({message:'error al realizar'});
        }
        if(!product){
           res.status(400).send({message:'no existe nada'});
        }
        res.status(200).send({product});
    });

}
module.exports = {
    pruebas,
    saveUser,
    loginUser,
    buscarUsuario
};