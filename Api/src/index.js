var express = require('express')
var cors =require('cors')
var fs = require('fs')
var path = require('path')
var mysql = require('mysql2')
const swaggerUI=require('swagger-ui-express')
const { SwaggerTheme } = require('swagger-themes');//
const swaggerJsDoc=require('swagger-jsdoc')
const redoc = require('redoc-express');

const PORT = process.env.PORT || 8082
const host = process.env.host || 'localhost'
const user = process.env.user || 'test'
const password = process.env.password || 'test'
const database = process.env.database || 'sistemas'
const dbport = process.env.dbport || 3306


var app = express()
const theme = new SwaggerTheme('v3');

const options = {
  explorer: true,
  customCss: theme.getBuffer('dark')
};


const def= fs.readFileSync(path.join(__dirname,'../swagger/swagger.json'),
{encoding: 'utf8',flag:'r'})
const read =fs.readFileSync(path.join(__dirname,'../README/README.MD'),
{encoding: 'utf8',flag:'r'})
const defObj=JSON.parse(def)
defObj.info.description=read

const swaggerOptions = {
  definition:defObj,
  apis: [`${path.join(__dirname, "./index.js")}`],
}

app.use(cors())
app.use(express.json())

/**
 * @swagger
 * /alumnos:
 *   get:
 *     tags:
 *       - alumnos
 *     summary: Consultar todos los alumnos
 *     description: Obtiene un JSON que contiene a todos los alumnos de la Base de Datos.
 *     responses:
 *       200:
 *         description: Regresa un JSON con todos los alumnos.
 *         content:
 *           application/json:
 *             example:
 *               [
 *                 {
 *                   "id": 1,
 *                   "nombre": "Dan",
 *                   "apellido": "Esq"
 *                 },
 *               ]
 *       500:
 *         description: Error interno del servidor al intentar consultar los alumnos.
 *         content:
 *           application/json:
 *             example:
 *               mensaje: Mensaje de error específico generado por la base de datos.
 */

app.get("/alumnos", async (req, res) => {
  try {
    // Establecimiento de una conexión a la base de datos MySQL utilizando la información de conexión proporcionada.
    const conn = await mysql.createConnection({
      host: host,
      user: user,
      password: password,
      database: database,
      port: dbport
    });

    // Consulta a la base de datos para obtener información de todos los alumnos.
    const [rows, fields] = await conn.promise().query('SELECT * FROM alumnos');

    // Respondemos con un JSON que contiene la información de todos los alumnos.
    res.status(200).json(rows);
  } catch (err) {
    // En caso de un error, respondemos con un código de estado 500 y un mensaje de error específico.
    res.status(500).json({ mensaje: err.sqlMessage });
  }
});


/**
 * @swagger
 * /alumno/{id}:
 *   get:
 *     tags:
 *       - alumnos
 *     summary: Consultar información de un alumno por ID
 *     description: Obtiene un JSON con la información del alumno correspondiente al ID proporcionado.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID del alumno a consultar
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Regresa un JSON con la información del alumno.
 *         content:
 *           application/json:
 *             example:
 *               [
 *                 {
 *                   "id": 1,
 *                   "nombre": "Dan",
 *                   "apellido": "Esq"
 *                 }
 *               ]
 *       404:
 *         description: No se encontró ningún alumno con el ID proporcionado.
 *         content:
 *           application/json:
 *             example:
 *               mensaje: El alumno no existe.
 *       500:
 *         description: Error interno del servidor al intentar consultar la información del alumno.
 *         content:
 *           application/json:
 *             example:
 *               mensaje: Mensaje de error específico generado por la base de datos.
 */

app.get("/alumno/:id", async (req, res) => {
  try {
    // Establecimiento de una conexión a la base de datos MySQL utilizando la información de conexión proporcionada.
    const conn = await mysql.createConnection({
      host: host,
      user: user,
      password: password,
      database: database,
      port: dbport
    });

    // Consulta a la base de datos para obtener información del alumno con el ID proporcionado.
    const [rows, fields] = await conn.promise().query('SELECT * FROM alumnos where control=' + req.params.id);

    // Verificación si la consulta no devuelve ningún resultado (ningún alumno encontrado).
    if (rows.length === 0) {
      // Respondemos con un código de estado 404 y un mensaje indicando que el alumno no existe.
      res.status(404).json({ mensaje: "El alumno no existe" });
    } else {
      // Si se encontraron resultados, respondemos con un JSON que contiene la información del alumno.
      res.status(200).json(rows);
    }
  } catch (err) {
    // En caso de un error, respondemos con un código de estado 500 y un mensaje de error específico.
    res.status(500).json({ mensaje: err.sqlMessage });
  }
});






/**
 * @swagger
 * /alumno:
 *   post:
 *     tags:
 *       - alumnos
 *     summary: Agregar un nuevo alumno
 *     description: Agrega un nuevo alumno a la Base de Datos.
 *     parameters:
 *       - name: id
 *         in: query
 *         description: ID del nuevo alumno
 *         required: true
 *         schema:
 *           type: integer
 *       - name: nombre
 *         in: query
 *         description: Nombre del nuevo alumno
 *         required: true
 *         schema:
 *           type: string
 *       - name: apellido
 *         in: query
 *         description: Apellido del nuevo alumno
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: El nuevo alumno ha sido agregado correctamente.
 *         content:
 *           application/json:
 *             example:
 *               mensaje: El nuevo alumno ha sido agregado correctamente.
 *       500:
 *         description: Error interno del servidor al intentar agregar el nuevo alumno.
 *         content:
 *           application/json:
 *             example:
 *               mensaje: Mensaje de error específico generado por la base de datos.
 */

app.post("/alumno", async (req, res) => {
  try {
    // Establecimiento de una conexión a la base de datos MySQL utilizando la información de conexión proporcionada.
    const conn = await mysql.createConnection({
      host: host,
      user: user,
      password: password,
      database: database,
      port: dbport
    });

    // Inserción del nuevo alumno en la base de datos con la información proporcionada.
    const [rows, fields] = await conn.promise().query("INSERT INTO `alumnos` VALUES ('" + req.query.id + "', '" + req.query.nombre + "', '" + req.query.apellido + "');");

    // Respondemos con un JSON que contiene información sobre la inserción exitosa del nuevo alumno.
    res.status(200).json({ mensaje: "El nuevo alumno ha sido agregado correctamente." });
  } catch (err) {
    // En caso de un error, respondemos con un código de estado 500 y un mensaje de error específico.
    res.status(500).json({ mensaje: err.sqlMessage });
  }
});


/**
 * @swagger
 * /alumno/{id}:
 *   put:
 *     summary: Actualizar información de un alumno
 *     description: Actualiza la información de un alumno en la base de datos.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del alumno a actualizar.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               edad:
 *                 type: integer
 *             example:
 *               nombre: Juan Perez
 *               edad: 25
 *     responses:
 *       200:
 *         description: Éxito. La información del alumno ha sido actualizada correctamente.
 *         content:
 *           application/json:
 *             example:
 *               mensaje: La información del alumno ha sido actualizada correctamente.
 *       404:
 *         description: No se encontró ningún alumno con el ID proporcionado.
 *         content:
 *           application/json:
 *             example:
 *               mensaje: El alumno no existe.
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             example:
 *               mensaje: Mensaje de error específico.
 */




app.put("/alumno/:id", async (req, res) => {
  // Construcción de la sentencia SQL para actualizar la información del alumno.
  let sentencia = "";
  let sentenciaUpdate = "UPDATE `alumnos` SET ";
  let sentenciaWhere = 'WHERE control = ' + req.params.id ;
  let camposModificar = "";
  let campos = Object.keys(req.body);
  var segundo = false;
  console.log(req.body)
  campos.forEach(campo => {
    if (segundo == false) {
      camposModificar = camposModificar + ("`" + campo + "` = '" + req.body[campo] + "' ");
      segundo = true;
    } else {
      camposModificar = camposModificar + (", `" + campo + "` = '" + req.body[campo] + "' ");
    }
  });
  sentencia = sentenciaUpdate + camposModificar + sentenciaWhere;
  console.log(sentencia);
  try {
    // Establecimiento de una conexión a la base de datos MySQL utilizando la información de conexión proporcionada.
    const conn = await mysql.createConnection({
      host: host,
      user: user,
      password: password,
      database: database,
      port: dbport
    });

    // Ejecución de la sentencia SQL para actualizar la información del alumno.
    const [rows, fields] = await conn.promise().query(sentencia);

    // Verificación si la actualización fue exitosa.
    if (rows.affectedRows === 0) {
      // No se encontró ningún alumno con el ID proporcionado.
      res.status(404).json({ mensaje: "El alumno no existe." });
    } else {
      // Respondemos con un mensaje indicando que la información del alumno ha sido actualizada correctamente.
      res.status(200).json({ mensaje: "La información del alumno ha sido actualizada correctamente." });
    }
  } catch (err) {
    // En caso de un error, respondemos con un código de estado 500 y un mensaje de error específico.
    res.status(500).json({ mensaje: err.sqlMessage });
  }
});

/**
 * @swagger
 * /alumno:
 *   delete:
 *     tags:
 *       - alumnos
 *     summary: Eliminar un alumno por ID
 *     description: Elimina un alumno de la Base de Datos según su ID.
 *     parameters:
 *       - name: id
 *         in: query
 *         description: ID del alumno a eliminar
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: El alumno ha sido eliminado correctamente.
 *         content:
 *           application/json:
 *             example:
 *               mensaje: El usuario ha sido eliminado correctamente.
 *       404:
 *         description: No se encontró ningún alumno con el ID proporcionado.
 *         content:
 *           application/json:
 *             example:
 *               mensaje: El alumno no existe.
 *       500:
 *         description: Error interno del servidor al intentar eliminar al alumno.
 *         content:
 *           application/json:
 *             example:
 *               mensaje: Mensaje de error específico generado por la base de datos.
 */

app.delete("/alumno", async (req, res) => {
  try {
    // Establecimiento de una conexión a la base de datos MySQL utilizando la información de conexión proporcionada.
    const conn = await mysql.createConnection({
      host: host,
      user: user,
      password: password,
      database: database,
      port: dbport
    });

    // Eliminación del alumno de la base de datos según su ID.
    const [rows, fields] = await conn.promise().query('DELETE FROM alumnos where control=' + req.query.id);

    // Verificación si la eliminación fue exitosa.
    if (rows.affectedRows === 0) {
      // No se encontró ningún alumno con el ID proporcionado.
      res.status(404).json({ mensaje: "El alumno no existe." });
    } else {
      // Respondemos con un mensaje indicando que el usuario ha sido eliminado correctamente.
      res.status(200).json({ mensaje: "El alumno ha sido eliminado correctamente." });
    }
  } catch (err) {
    // En caso de un error, respondemos con un código de estado 500 y un mensaje de error específico.
    res.status(500).json({ mensaje: err.sqlMessage });
  }
});

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
    nonce: '', 
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


app.listen(PORT,(req,res)=>{
    console.log("servidor express  escuchando")
})