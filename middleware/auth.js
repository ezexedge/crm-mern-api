const jwt = require("jsonwebtoken")


module.exports = (req,res,next) => {
    //autorizacion por el header
    const authHeader = req.get('Authorization')

    if(!authHeader){
        const error = new Error("no hay jwt")
        error.statusCode = 401
        throw error
    }

    //obtenego el token y lo verifico

    const token = authHeader.split(" ")[1]
    let revisarToken

    try{
        revisarToken = jwt.verify(token,'LLAVESECRETA')

    }catch(error){
        error.statusCode = 500
        throw error
    }

    //si el token es valido ,  pero si se mantiene un error

    if(!revisarToken){
        const error =  new Error('no autenticado')
        error.statusCode = 401 //no esta autorizado

    }

//si esta todo ok pasa al siguiente

next()


}