var express = require('express')
const basicAuth = require('express-basic-auth')
var cors =require('cors')
var fs = require('fs')
var morgan = require('morgan')
var path = require('path')
var mysql = require('mysql2');


var app = express()
app.use(basicAuth({
  users: { 'admin': '1234abcd' }
}))
app.use(cors())
app.use(express.json())
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

app.get("/usuarios", async(req,res)=>{
  try {
    const conn = await mysql.createConnection({host:'localhost',user:'test',password:'test',database:'sistemas'})
    const [rows, fields] = await conn.promise().query('SELECT * FROM alumnos')
    res.json(rows)
  } catch (err){
    //console.log(err)
    res.status(500).json({mensaje:err.sqlMessage})
  }
})


app.get("/usuarios/:id", async(req,res)=>{
  console.log(req.params.id)
  const conn = await mysql.createConnection({host:'localhost',user:'test',password:'test',database:'sistemas'})
  const [rows, fields] = await conn.promise().query('SELECT * FROM alumnos where control='+req.params.id)
  if(rows.length==0){
    res.status(404).json({mensaje:"el usuario no existe"})
  }
  else{
    res.json(rows)
  }
})
app.delete("/usuarios", async(req,res)=>{
  try {
    const conn = await mysql.createConnection({host:'localhost',user:'root',password:'contrasena',database:'sistemas'})
    const [rows, fields] = await conn.promise().query('DELETE FROM alumnos where control='+req.query.id)
    res.json({mensaje:"el usuario ha sido eliminado correctamente"})
  } catch (err){
    //console.log(err)
    res.status(500).json({mensaje:err.sqlMessage})
  }
})
app.post("/usuarios", async(req,res)=>{
  try {
    const conn = await mysql.createConnection({host:'localhost',user:'test',password:'test',database:'sistemas'})
    const [rows, fields] = await conn.promise().query("INSERT INTO `sistemas`.`alumnos` VALUES ('"+req.query.id+"', '"+req.query.nombre+"', '"+req.query.apellido+"');")
    res.json(rows)
  } catch (err){
    //console.log(err)
    res.status(500).json({mensaje:err.sqlMessage})
  }
})

app.put("/usuarios/:id", async(req,res)=>{
  let sentencia=""
  let sentenciaUpdate ="UPDATE `alumnos` SET "
  let sentenciaWhere = "WHERE control = "+req.params.id
  let camposModificar =""
  let campos = Object.keys(req.body);
  var segundo = false
  campos.forEach(campo => {
    if (segundo==false){
      camposModificar=camposModificar+("`"+campo+"` = '"+req.body[campo]+"' ")
      segundo=true
    }
    else{
      camposModificar=camposModificar+(", `"+campo+"` = '"+req.body[campo]+"' ")
    }
  });

  sentencia=sentenciaUpdate+camposModificar+sentenciaWhere
  const conn = await mysql.createConnection({host:'localhost',user:'test',password:'test',database:'sistemas'})
  const [rows, fields] = await conn.promise().query(sentencia)
  if(rows.length==0){
    res.status(404).json({mensaje:"el usuario no existe"})
  }
  else{
    res.json(rows)
  }
})




app.get("/alumnos", (req,res)=>{
    res.send("servidor express contestando a peticion get")
})
app.post("/alumnos", (req,res)=>{
    res.send("servidor express contestando a peticion post")
})

app.listen(8081,(req,res)=>{
    console.log("servidor express  escuchando")
})