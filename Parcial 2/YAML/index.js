const yaml = require('yaml')
const fs =require('fs')
const path=require('path')

const archivoArr=fs.readFileSync(path.join(__dirname,'/arreglo.yml'),'utf8')
const valorArr=yaml.parse(archivoArr)
console.table(valorArr)
