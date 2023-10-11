const validation= require("./middleware/joiValidation")
const {registroSchema} = require("./schemas/registro")
const express=require('express') ;
const app=express();

app.use(express.json()) ;

app.use(express.urlencoded({extended:false}));

app.post("/datosContacto",validation(registroSchema),(req, res)=>{
    const {nombre, telefono, correo} = req.body;
    res.send(`nombre:${nombre},telefono${telefono},correo,${correo}`) ;
})

app.listen(8088,()=>{
    console.log("servidor express escuchando en el puerto 8090");
})