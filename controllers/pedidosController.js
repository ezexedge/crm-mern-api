const Pedidos = require('../models/Pedidos')

exports.nuevoPedido =  async (req,res,next) => {
    const pedido = new Pedidos(req.body)

    try {
        await pedido.save()
        res.json({mensaje: 'se agrego un pedido'})
        
    } catch (error) {
        console.log(error)
        next()
    }
}

exports.mostrarPedidos = async (req,res,next) => {
    try {
        const pedido = await Pedidos.find({}).populate('cliente').populate({
            path: 'pedido.producto',
            model: 'Productos'
        })

        res.json(pedido)
    } catch (error) {
        console.log(error)
        next()
        
    }
}

exports.mostrarPedido = async (req,res,next) => {

    const pedido = await Pedidos.findById(req.params.pedidoID)
    if(!pedido){
        res.json({mensaje : 'el pedido no existe'})
        return next()
    }

    res.json(pedido)

}

exports.actualizarPedido = async(req , res, next) => {
    try {
        let pedido = await Pedidos.findByIdAndUpdate({ _id : req.params.pedidoID}, req.body , {
            new : true} )
                        .populate('cliente')
                        .populate({
                            path : 'pedido.producto',
                            model : 'Productos'
                        })
        res.json(pedido)
    } catch (error) {
        console.log(error)
        next()
    }
}

exports.eliminarPedido = async (req,res,next)=> {
    try {
        
        await Pedidos.findByIdAndDelete({ _id : req.params.pedidoID })
        res.json({mensaje : 'se elimino el pedido'})

    } catch (error) {
        console.log(error)
        next()
    }
}