const express = require("express")
const { check, validationResult } = require("express-validator")
const app = express()
app.use(express.json())

app.post("/usuarios",check('id').isNumeric(),check('correo').isEmail(),(req,res)=>
{
    const result = validationResult(req)
    if(result.isEmpty()){s
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