const express = require('express')
const https = require('https')
const app = express()
const fs =require('fs')
const path=require('path')

const opciones={
key:fs.readFileSync(path.join(__dirname,"ssl/key.pem")),
cert:fs.readFileSync(path.join(__dirname,"ssl/cert.pem"))
}

app.get("/alumnos", (req,res)=>{
    res.send("servidor express seguro contestando a peticion get")
})

// app.listen(8081,(req,res)=>{
//     console.log("servidor express  escuchando")
// })


https.createServer(opciones,app).listen(8081,function()
{
    console.log("servidor express seguro en puerto 8081")
})