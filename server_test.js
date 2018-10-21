const expect = require('chai').expect;
const axios = require('axios');

const HOST = process.env.HOST || 'http://localhost:3000/';
const GITHUB_HASH = '84b7e44aa54d002e';

describe('POST /', () => {
  it('returns a hashed url', () => {
    return axios.post(HOST, { url: 'https://github.com' })
      .then(({ data: { url } }) => {
        expect(url).to.equal(`${HOST}${GITHUB_HASH}`)
      });
  });

  it('does not attempt to create multiple of the same hash', () => {
    const request = { url: 'https://github.com' };
    return axios.post(HOST, request)
      .then(() => axios.post(HOST, request))
      .then(() => axios.post(HOST, request))
      .then(({ data: { url } }) => {
        expect(url).to.equal(`${HOST}${GITHUB_HASH}`)
      });
  });

  it('returns a 400 if no url present in request body', () => {
    return axios.post(HOST)
      .then((response) => {
        expect(false, 'Should have returned 400').to.be.ok;
      })
      .catch((error) => {
        expect(error.response.status).to.equal(400);
      });
  });
});

describe('GET /:hash', () => {
  beforeEach(() => {
    // ensure that the github hash exists in the db.
    return axios.post(HOST, { url: 'https://github.com' });
  });

  it('redirects to the full url', () => {
    return axios.get(`${HOST}${GITHUB_HASH}`, { maxRedirects: 0 })
      .catch(({ response }) => {
        expect(response.status).to.equal(301);
      });
  });

  it('returns a 404 if the url is not found', () => {
    return axios.get(`${HOST}abc123`, { maxRedirects: 0 })
      .catch(({ response }) => {
        expect(response.status).to.equal(404);
      });
  });
});
