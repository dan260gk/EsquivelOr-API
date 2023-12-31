const express=require('express')
const authRouter = express.Router()
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')
var mysql = require('mysql2');
dotenv.config({path:"C:/wamp64/www/EsquivelOr-API/Parcial 2/servidorJWT/.env"});

const SECRET_KEY = process.env.SECRET_KEY

authRouter.get ('/',(req,res)=>{
    res.json({message:'ruta desprotegida'})
})
authRouter.post('/login',async (req,res)=>{
    const {user,password}= req.body
    const conn = await mysql.createConnection({host:'localhost',user:'test',password:'test',database:'login'})
    console.log(`el usuario ${user} esta intentando acceder`)
    const [row, fields] = await conn.promise().query('SELECT * FROM usuarios where user=\''+user+'\'')
    
    if(row.length==0){
        res.status(404).json({mensaje:"el usuario no existe"})
    }
    else{
        if(row[0].password==password)
        {
            return res.status(201).json({
                token: jwt.sign({user:'admin'},SECRET_KEY)
            })
        }
        else{
            res.status(401).json({mensaje:"la contraseña es incorrecta"})
        }
    }
})

authRouter.use('/priv',verifyToken)
authRouter.get('/priv/rutaprivada',(req,res)=>{
    res.status(200).json({message:'Ruta protegida'})
})

async function verifyToken(req,res,next){
    if(!req.headers.authorization){
        return res.status(401).send('acceso no authorizado')
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
module.exports.authRouter=authRouter