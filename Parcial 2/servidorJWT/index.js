const express = require('express')
const dotenv=require('dotenv')
const auth = require('./auth.js')

dotenv.config({path:"C:/wamp64/www/EsquivelOr-API/Parcial 2/servidorJWT/.env"});

const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use('/auth', auth.authRouter)

app.listen(PORT,()=>{
    console.log("servidor express escuchando "+PORT)
})