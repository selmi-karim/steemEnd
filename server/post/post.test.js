const request = require('supertest-as-promised');
const httpStatus = require('http-status');
const chai = require('chai'); // eslint-disable-line import/newline-after-import
const expect = chai.expect;
const app = require('../../index');

chai.config.includeStack = true;



  describe('# GET /api/post/trending', () => {
    it('should get latest posts', (done) => {
      request(app)
        .get(`/api/post/trending`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.length).to.not.equal(0);
          done();
        })
        .catch(done);
    });

});
