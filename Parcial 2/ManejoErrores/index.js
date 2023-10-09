const express = require("express")
const { checkSchema, validationResult } = require("express-validator")
const app = express()
app.use(express.json())

const esquema=require("./validaciones.js");


app.post("/usuarios",esquema.validar(),(req,res,next)=>
{
    const result = validationResult(req)
    if(result.isEmpty()){
        console.log(req.body)
        res.json({mensaje: "Respuesta peticion POST"})
    } else{
        let e = new Error("captura de datos invalida, verifique si ha ingresado correctamente los datos")
        next(e)
    }
})
app.use((err,req,res,next)=>{
    
    res.status(500)
    res.send({error:err.message})
})
app.listen(8086,()=>
{
    console.log("servidor express escuchando 8086")
})

