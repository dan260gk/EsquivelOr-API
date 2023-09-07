var express = require('express')
var fs = require('fs')
var morgan = require('morgan')
var path = require('path')
 
var app = express()
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

const sql = require('mssql')

app.get("/usuarios", (req,res)=>{
async () => {
    try {
        await sql.connect('Server=localhost,1433;Database=pl01;User Id=T-43/jebus;Password=;')
        const result = await sql.query`select * from Matriz`
        console.dir(result)
    } catch (err) {
        // ... error checks
    }
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