var express = require('express')
var fs = require('fs')
var morgan = require('morgan')
var path = require('path')
var mysql = require('mysql2');
 
var app = express()
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

app.get("/usuarios", async(req,res)=>{
  try {
    const conn = await mysql.createConnection({host:'localhost',user:'test',password:'test',database:'sistemas'})
    const [rows, fields] = await conn.promise().query('ELECT * FROM alumnos')
    res.json(rows)
  } catch (err){
    //console.log(err)
    res.status(500).json({mensaje:err.sqlMessage})
  }
  

// mysql.createConnection({
//   host     : 'localhost',
//   user     : 'test',
//   password : 'test',
//   database : 'sistemas'})
// .then(conn => conn.query('SELECT * FROM alumnos'))
// .then(([rows,fields]) => res.json(rows))


// var connection = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'test',
//   password : 'test',
//   database : 'sistemas'
// });
 
// connection.connect();
 
// connection.query('SELECT * FROM alumnos', function (error, results, fields) {
//   if (error) throw error;
//   res.send(results);
// });
 
// connection.end();
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



app.use(express.json())
app.get("/alumnos", (req,res)=>{
    res.send("servidor express contestando a peticion get")
})
app.post("/alumnos", (req,res)=>{
    res.send("servidor express contestando a peticion post")
})

app.listen(8081,(req,res)=>{
    console.log("servidor express  escuchando")
})