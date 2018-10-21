const expect = require('chai').expect;
const getURLHash = require('./url_hash.js');

const GITHUB_URL = 'https://github.com';
const GITHUB_HASH = '84b7e44aa54d002e';

describe('getURLHash', () => {
  it('correctly hashes urls', () => {
    expect(getURLHash(GITHUB_URL)).to.equal(GITHUB_HASH);
  });

  it('limits hashes to 16 characters', () => {
    const LONG = 'this is a long sentence that is longer than sixteen characters';
    const SHORT = 'smol';
    expect(getURLHash(LONG).length).to.equal(16);
    expect(getURLHash(SHORT).length).to.equal(16);
  });
});
