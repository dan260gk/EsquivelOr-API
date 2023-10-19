const express=require('express')
const router =express.Router()
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')

const authRouter = router
const SECRET_KEY = process.env.SECRET_KEY

authRouter.get ('/',(req,res)=>{
    res.json({message:'ruta desprotegida'})
})
.use('/priv',verifyToken)
.post('/login',(req,res)=>{
    const {user,password}= req.body
    console.log(`el usuario ${user} esta intentando acceder`)

    if(user=='admin' && password == 'admin'){
        return res.status(201).json({
            token: jwt.sign({user:'admin',SECRET_KEY})
        })
    }
})
.get('/priv/rutaprivada',(req,res)=>{
    res.status(200).json({message:'Ruta protegida'})
})

async function verifyToken(req,res,next){
    if(!req.headers.authorization){
        res.status(401).send('acceso no authorizado')
    }
    console.log(req.headers.authorization)
    const token = req.headers.authorization.split(' ')[1]
    console.log(token)
    try{
        jwt.verify(token,SECRET_KEY,(err)=>{
            if(err){
                return res.status(400).json({error:'token invalido'})
            } 
            next()
        }
        )
    }
    catch(err){
        res.json({error:err})
    }
}
module.exports.router=router