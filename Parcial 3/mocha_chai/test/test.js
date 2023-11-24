let mocha = require('mocha');
let chai = require('chai');
let expect = chai.expect;
var describe = mocha.describe;
let modulo = require('../src/modulo.js');


describe('pruebas a la funcion areaTriangulo',()=>{
    it('si se manda 2 y 3 debe dar 3',()=>{
        let resultado = modulo.areaTriangulo(2,3)
        //expect(resultado).to.be.a('number')
        expect(resultado).to.equal(3)
    })
})
