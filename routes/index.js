const express = require('express')
const router = express.Router()
const clienteController = require('../controllers/clienteController')
const productosController = require('../controllers/productosController')
const pedidosController = require('../controllers/pedidosController')
const usuariosController = require('../controllers/usuariosController')


//middleware
const auth = require('../middleware/auth')

//a todos le ponemos auth para ver que esten auteinficado
module.exports = () => {
  
        router.post('/clientes',auth,clienteController.nuevoCliente)
        router.get('/clientes',auth,clienteController.mostrarClientes)
        router.get('/clientes/:clienteID',auth,clienteController.mostrarCliente)
        router.put('/clientes/:clienteID',auth,clienteController.actualizarCliente)
        router.delete('/clientes/:clienteID',auth,clienteController.eliminarCliente)


        router.post('/productos',auth,
        productosController.subirArchivos,
        productosController.nuevoProducto)
    
        router.get('/productos',auth,
        productosController.mostrarProductos)
     
        router.get('/productos/:productoID',auth,
        productosController.mostrarProducto)


        router.put('/productos/:productoID',auth,
        productosController.subirArchivos,
        productosController.actualizarProductos
        )

        router.delete('/productos/:productoID',auth,
        productosController.eliminarProducto
        )


        router.post('/pedidos/nuevo/:idUsuario',auth, pedidosController.nuevoPedido)
        router.get('/pedidos',auth, pedidosController.mostrarPedidos)
      router.get('/pedidos/:pedidoID',auth,pedidosController.mostrarPedido)
     router.put('/pedidos/:pedidoID',auth,pedidosController.actualizarPedido)
     router.delete('/pedidos/:pedidoID',auth,pedidosController.eliminarPedido)

     //buscar productos
     router.post('/productos/busqueda/:query',auth, productosController.buscarProductos)

     //Usuario

     router.post('/crear-cuenta',auth,
     usuariosController.registrarUsuario

     )
     router.post('/iniciar-sesion',
     usuariosController.autenticarUsuario
     )
    
     
    return router
}