const express = require('express')
const jwt=require('jsonwebtoken')
const dotenv=require('dotenv')
const router =require('./auth.js')

dotenv.config()

const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use('/auth', authRouter)

app.listen(PORT,(req,res)=>{
    console.log("servidor express escuchando"+ PORT)
})