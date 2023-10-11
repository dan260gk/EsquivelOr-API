const express = require("express")
const joi = require("joi")

const app = express()
app.use(express.json())

app.post("/usuarios",(req,res)=>
{
    const esquema = joi.object().keys({
        login: joi.string()
    })
})

app.listen(8086,()=>
{
    console.log("servidor express escuchando 8086")
})