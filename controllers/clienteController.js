const Clientes = require('../models/Clientes')


exports.nuevoCliente = async (req,res,next) => {
    const cliente = new Clientes(req.body)
    try {
        await cliente.save()
        res.json({mensaje: 'se agrego el nuevo cliente'})

    }catch(error){
        console.log(error)
        res.send(error)
        next()
    }
}

exports.mostrarClientes = async(req,res,next) => {

    try {
        const clientes = await Clientes.find({})
        res.json({clientes})
    } catch (error) {
        console.log(error)
        next()
    }

}

exports.mostrarCliente = async (req,res,next) => {
    const  cliente = await Clientes.findById(req.params.clienteID)
    if(!cliente){
        res.json({mensaje : 'cliente no existe'})
        return next()
    }

    res.json(cliente)
}

exports.actualizarCliente = async(req,res,next)=> {
    try {
        const cliente = await Clientes.findOneAndUpdate({ _id : req.params.clienteID}, req.body,{ new : true})

        res.json(cliente)

    } catch (error) {
        console.log(error)
        next()
    }
}

exports.eliminarCliente = async(req,res,next) => {
    try {
        await Clientes.findByIdAndDelete({_id : req.params.clienteID})
        res.json({mensaje : "el cliente a sido eliminado"})
    } catch (error) {
        console.log(error)
        next()
    }
}