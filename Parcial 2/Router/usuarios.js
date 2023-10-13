var express = require('express')
var router =express.Router()
var mysql = require('mysql2');

router.get("/usuarios", async(req,res)=>{
    try {
      const conn = await mysql.createConnection({host:'localhost',user:'test',password:'test',database:'sistemas'})
      const [rows, fields] = await conn.promise().query('SELECT * FROM alumnos')
      res.json(rows)
    } catch (err){
      //console.log(err)
      res.status(500).json({mensaje:err.sqlMessage})
    }
  })
.delete("/usuarios", async(req,res)=>{
    try {
      const conn = await mysql.createConnection({host:'localhost',user:'root',password:'contrasena',database:'sistemas'})
      const [rows, fields] = await conn.promise().query('DELETE FROM alumnos where control='+req.query.id)
      res.json({mensaje:"el usuario ha sido eliminado correctamente"})
    } catch (err){
      //console.log(err)
      res.status(500).json({mensaje:err.sqlMessage})
    }
  })
.post("/usuarios", async(req,res)=>{
    try {
      const conn = await mysql.createConnection({host:'localhost',user:'test',password:'test',database:'sistemas'})
      const [rows, fields] = await conn.promise().query("INSERT INTO `sistemas`.`alumnos` VALUES ('"+req.query.id+"', '"+req.query.nombre+"', '"+req.query.apellido+"');")
      res.json(rows)
    } catch (err){
      //console.log(err)
      res.status(500).json({mensaje:err.sqlMessage})
    }
  })
  
.put("/usuarios/:id", async(req,res)=>{
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
  module.exports.router=router