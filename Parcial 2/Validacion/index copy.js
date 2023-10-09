const express = require("express")
const { checkSchema, validationResult } = require("express-validator")
const app = express()
app.use(express.json())

const esquema=require("./validaciones.js");


app.post("/usuarios",esquema.validar(),(req,res)=>
{
    const result = validationResult(req)
    if(result.isEmpty()){
        console.log(req.body)
        res.json({mensaje: "Respuesta peticion POST"})
    } else{
        res.json(result)
    }
})

app.listen(8086,()=>
{
    console.log("servidor express escuchando 8086")
})