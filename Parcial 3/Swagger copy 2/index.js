var express = require('express')
var cors =require('cors')
var fs = require('fs')
var path = require('path')
var mysql = require('mysql2')
const swaggerUI=require('swagger-ui-express')
const { SwaggerTheme } = require('swagger-themes');//
const swaggerJsDoc=require('swagger-jsdoc')
const redoc = require('redoc-express');
const request = require('supertest');//-----------------------SUPERTEST-----------------------

var app = express()
const theme = new SwaggerTheme('v3');

const options = {
  explorer: true,
  customCss: theme.getBuffer('dark')
};


const def= fs.readFileSync(path.join(__dirname,'./swagger.json'),
{encoding: 'utf8',flag:'r'})
const read =fs.readFileSync(path.join(__dirname,'./README.MD'),
{encoding: 'utf8',flag:'r'})
const defObj=JSON.parse(def)
defObj.info.description=read

const swaggerOptions = {
  definition:defObj,
  apis: [`${path.join(__dirname, "./index.js")}`],
}

// const swaggerOptions = {
//   definition: {
//     openapi: '3.0.0',
//     info: {
//       title: 'API Usuarios',
//       version: '1.0.0',
//     },
//     servers: [
//       { url: "http://localhost:8081" }
//     ],
//   },
//   apis: [`${path.join(__dirname, "./index.js")}`],
// };


app.use(cors())
app.use(express.json())

/**
 * @swagger
 * /usuarios/:
 *   get:
 *     tags:
 *       - usuarios
 *     summary: Consultar todos los usuarios
 *     description: Obtiene un Json que contiene a todos los usuarios de la Base de Datos
 *     responses:
 *       200:
 *         description: Regresa un Json con todos los usuarios
 */
app.get("/usuarios", async(req,res)=>{
  try {
    const conn = await mysql.createConnection({host:'localhost',user:'test',password:'test',database:'sistemas'})
    const [rows, fields] = await conn.promise().query('SELECT * FROM alumnos')
    res.json(rows)
  } catch (err){
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
    res.status(500).json({mensaje:err.sqlMessage})
  }
})
app.post("/usuarios", async(req,res)=>{
  try {
    const conn = await mysql.createConnection({host:'localhost',user:'test',password:'test',database:'sistemas'})
    const [rows, fields] = await conn.promise().query("INSERT INTO `sistemas`.`alumnos` VALUES ('"+req.query.id+"', '"+req.query.nombre+"', '"+req.query.apellido+"');")
    res.json(rows)
  } catch (err){
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

var algo;
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs",swaggerUI.serve,swaggerUI.setup(swaggerDocs, options));
app.use("/api-docs-json",(req,res)=>{
  res.json(swaggerDocs);
})

app.get(
  '/docs',
  redoc({
    title: 'API Docs',
    specUrl: '/api-docs-json',
    nonce: '', // <= it is optional,we can omit this key and value
    // we are now start supporting the redocOptions object
    // you can omit the options object if you don't need it
    // https://redocly.com/docs/api-reference-docs/configuration/functionality/
    redocOptions: {
      theme: {
        colors: {
          primary: {
            main: '#6EC5AB'
          }
        },
        typography: {
          fontFamily: `"museo-sans", 'Helvetica Neue', Helvetica, Arial, sans-serif`,
          fontSize: '15px',
          lineHeight: '1.5',
          code: {
            code: '#87E8C7',
            backgroundColor: '#4D4D4E'
          }
        },
        menu: {
          backgroundColor: '#ffffff'
        }
      }
    }
  })
);

// Test para obtener todos los alumnos
// request(app)
//     .get('/usuarios')
//     .expect(200)
//     .end((err, res) => {
//         if (err) throw err;
//         console.log('\nGET /usuarios: Debería devolver un array de alumnos');
//     });


app.listen(8082,(req,res)=>{
    console.log("servidor express  escuchando")
})