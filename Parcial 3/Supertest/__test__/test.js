// let mocha = require('mocha');
// var describe = mocha.describe;
// const chai = require('chai')
// let expect = chai.expect;
// const chaiHttp = require('chai-http')

// chai.use(chaiHttp)
const request = require('supertest')
let url='http://localhost:8082'

describe("testeo a ruta usuario", () => {
    it("testeo metodo get a la ruta usuario me debe dar un status 200", (done) => {
        request(url)
            .get('/usuarios')
            .end((err, res) => {
                expect(res.statusCode).toBe(200);
                done();
            });
    });
});
