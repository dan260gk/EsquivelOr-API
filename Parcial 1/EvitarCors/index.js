const express = require('express')
const app = express()

//app.use(express.json())
app.get("/alumnos/:carrera", (req,res)=>{
    res.json({respuesta: "contestando a peticion get en ruta empleada"})
    //res.send("servidor express contestando a peticion get")
})
app.post("/alumnos", (req,res)=>{
    res.send("servidor express contestando a peticion post")
})

app.listen(8081,(req,res)=>{
    console.log("servidor express  escuchando")
})
