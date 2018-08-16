const request = require('supertest-as-promised');
const httpStatus = require('http-status');
const chai = require('chai'); // eslint-disable-line import/newline-after-import
const expect = chai.expect;
const app = require('../../index');

chai.config.includeStack = true;


describe('## GET APIs', () => {
  let user = {
    username: 'borepstein',
  };

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

  describe('# GET /api/post/new', () => {
    it('should get latest posts', (done) => {
      request(app)
        .get(`/api/post/new`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.length).to.not.equal(0);
          done();
        })
        .catch(done);
    });

  });

  describe('# GET /api/post/hot', () => {
    it('should get hot posts', (done) => {
      request(app)
        .get(`/api/post/hot`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.length).to.not.equal(0);
          done();
        })
        .catch(done);
    });

  });

  describe('# GET /api/post/username/USERNAME', () => {
    it('should get latest posts from specific user', (done) => {
      request(app)
        .get(`/api/post/username/` + user.username)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.length).to.not.equal(0);
          done();
        })
        .catch(done);
    });

  });

});


describe('## Posts APIs with 100 posts', () => {
  let user = {
    username: 'borepstein',
  };

  describe('# GET /api/post/trending', () => {
    it('should get latest posts', (done) => {
      request(app)
        .get(`/api/post/trending`, { size: 100 })
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.length).to.not.equal(100);
          done();
        })
        .catch(done);
    });

  });

  describe('# GET /api/post/new', () => {
    it('should get latest posts', (done) => {
      request(app)
        .get(`/api/post/new`, { size: 100 })
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.length).to.not.equal(0);
          done();
        })
        .catch(done);
    });

  });

  describe('# GET /api/post/hot', () => {
    it('should get hot posts', (done) => {
      request(app)
        .get(`/api/post/hot`, { size: 100 })
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.length).to.not.equal(0);
          done();
        })
        .catch(done);
    });

  });

  describe('# GET /api/post/username/USERNAME', () => {
    it('should get latest posts from specific user', (done) => {
      request(app)
        .get(`/api/post/username/` + user.username, { size: 100 })
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.length).to.not.equal(0);
          done();
        })
        .catch(done);
    });

  });

});