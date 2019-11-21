const express = require('express')
const routes = require('./routes')
const mongoose =require('mongoose')
const bodyParser = require('body-parser')

//cors le permite al usuario el intercambio de recursos entre servidores
const cors = require('cors')


 mongoose.Promise = global.Promise
 mongoose.connect('mongodb://localhost/restApi',{
     useNewUrlParser : true,useUnifiedTopology: true , useCreateIndex: true
 })
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

//habilitamos cors
app.use(cors())

//carpeta publica


app.use(express.static('uploads'))



app.use('/',routes())

app.listen(3000)