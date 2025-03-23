// test/api.test.js
const chai = require('chai');
const chaiHttp = require('chai-http');
const {app} = require('../app'); // Update the path accordingly
const expect = chai.expect;

chai.use(chaiHttp);

describe('API Tests', () => {
  it('should return a list of users', (done) => {
    chai.request(app)
      .get('/user')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        expect(res.body).to.have.length.above(0);
        expect(res.body[0]).to.have.property('_id');
        expect(res.body[0]).to.have.property('name');
        done();
      });
  });
});
