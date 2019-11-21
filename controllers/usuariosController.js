const Usuarios = require('../models/Usuarios')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')



//vamos a interactuar con la base de datos
exports.registrarUsuario = async (req,res) =>{
    //leeemos los usuario y lo metemo en la base de daos
    const usuario = new Usuarios(req.body)
    //hasheamos el password
    usuario.password = await bcrypt.hash(req.body.password,12)
    try {
        //guardamos el hasheo en la base de datos
        await usuario.save()
        res.json({mensaje  : "usuario creado correctamente"})

    }catch(error){
        console.log(error)
        res.json({ mensaje : "hubo un error"})
    }


}

exports.autenticarUsuario = async  (req,res,next) => {
    const {email ,password} =req.body
    //buscamos al usuario con mongoose
    const usuario = await Usuarios.findOne({email})

    if(!usuario){
        await res.status(401).json({mensaje: "este usuario no existe"})
        next()
    }else{
        //verificamos si el password es correcto o no
        //comparamos el password ingresado con  el que tene,mos en la base de datos
        if(!bcrypt.compareSync(password , usuario.password)){
            //si el usuario existe pero el password es incorrecto
            await res.status(401).json({mensaje: "password incorrectos"})
            next()

        }
        else{
            //password correcto ponemos el token jwt
            const token = jwt.sign({
                email : usuario.email,
                nombre : usuario.nombre,
                id : usuario._id
            }, 'LLAVESECRETA', {
                expiresIn : '1h'
            })

            res.json({token})
        }

    }
}