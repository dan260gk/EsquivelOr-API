const express = require('express')
const app = express()
app.use(express.json())
app.get("/alumnos/:carrera", (req,res)=>{
    console.log(req.params);
    console.log(req.query);
    console.log(req.body);
    res.send("servidor express contestando a peticion get")
})
app.post("/alumnos", (req,res)=>{
    res.send("servidor express contestando a peticion post")
})

app.listen(8080,(req,res)=>{
    console.log("servidor express  escuchando")
})
