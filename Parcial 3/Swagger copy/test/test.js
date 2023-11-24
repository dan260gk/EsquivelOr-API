let mocha = require('mocha');
var describe = mocha.describe;
const chai = require('chai')
let expect = chai.expect;
const chaiHttp = require('chai-http')

chai.use(chaiHttp)

let app='http://localhost:8082'

describe("testeo a ruta usuario", () => {
    it("testeo metodo get a la ruta usuario me debe dar un status 200", (done) => {
        chai.request(app)
            .get('/usuarios')
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                done();
            });
    });
});
