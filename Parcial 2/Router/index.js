const express = require('express')
const usuario = require('./usuarios.js')
const app = express()

app.use(usuario.router)
app.listen(8088,function(err){
  if (err) console.log(err)
  console.log("servidor express eschucando en el puerto 8088")
})