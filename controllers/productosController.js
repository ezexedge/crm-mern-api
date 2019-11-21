const Productos = require('../models/Productos')
const multer = require('multer')
const shortid = require('shortid')

const configuracionMulter = {
    storage: fileStorage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, __dirname+'../../uploads/');
        },
        filename: (req, file, cb) => {
            const extension = file.mimetype.split('/')[1];
            cb(null, `${shortid.generate()}.${extension}`);
        }
    }),
    fileFilter(req, file, cb) {
        if ( file.mimetype === 'image/jpeg' ||  file.mimetype ==='image/png' ) {
            cb(null, true);
        } else {
            cb(new Error('Formato No válido'))
        }
    },
}

const upload = multer(configuracionMulter).single('imagen');

exports.nuevoProducto = async (req,res,next) => {
    const producto = new Productos(req.body)

    try {
        if(req.file.filename){
            producto.imagen = req.file.filename
        }
        await producto.save()
        res.json({mensaje: 'se agrego un producto'})
    } catch (error) {
        console.log(error)
        next()
    }
}



exports.subirArchivos = (req,res,next) => {
    upload(req,res,function(error){
        if(error){
            res.json({mensaje : error})
        }
        return next()
    })
}

exports.mostrarProductos = async(req,res,next) => {
    try {
     
        const producto = await Productos.find({})
        res.json(producto)

    } catch (error) {
        
        console.log(error)
        next()
        
    }
}

exports.mostrarProducto = async(req,res,next) => {
  
    const producto = await Productos.findById(req.params.productoID)

    if(!producto){
        res.json({mensaje : 'no existe el producto'})

        return next()

    }


    res.json(producto)
    

}

exports.actualizarProductos = async (req,res,next) => {
    try {

        
        let productoNuevo = req.body
        if(req.file) {
            productoNuevo.imagen = req.file.filename

        }else{
            let productoAnterior = await Productos.findById(req.params.productoID) 

            productoNuevo.imagen = productoAnterior.imagen
        }

        
        let producto = await Productos.findByIdAndUpdate({_id : req.params.productoID}, productoNuevo , {new : true})
        res.json(producto)
    } catch (error) {
        console.log(error)

        return next()
    }
}
    exports.eliminarProducto = async(req,res,next) => {
        //se puede solamente eliminar la imagen con file system usando unlink que es un metodo para borrar esa imagen
        try {
            await Productos.findByIdAndDelete({_id : req.params.productoID})
            res.json({mensaje : 'producto eliminar'})
        } catch (error) {
            console.log(error)
             next()
        }
    }


    exports.actualizarPedidos = async (req,res,next) => {
        try {
            const pedido = await Pedidos.findByIdAndUpdate()
        } catch (error) {
            
        }
    }

    exports.buscarProductos = async(req,res,next) => {
        try{
            //hacemos la busqueda
            const { query } = req.params
            const producto =  await Productos.find({nombre: new RegExp(query ,'i')})
            //la regExp i lo que hace es que cuando yo escribro con minuscula y mayuscula me lo toma igual
            //ejemplo jquery Jquery JqUeRy no discrimina toma todo valor por igual
            res.json(producto)
        }catch(error){
            console.log(error)
            next()
        }
    }