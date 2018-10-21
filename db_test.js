const expect = require('chai').expect;
const setUpDb = require('./db.js');

describe('setUpDb', () => {
  it('calls a callback after the database connects', (done) => {
    setUpDb(':memory:', () => {
      expect(true).to.be.ok;
      done();
    });
  });
});