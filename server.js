const bodyParser = require('body-parser');
const express = require('express');
const setUpDb = require('./db.js');
const getURLHash = require('./hash.js');

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || `localhost:${PORT}`;

const GET_URL_BY_HASH = `
  SELECT url FROM shortened_url
  WHERE hash = ?
`;

const INSERT_URL_HASH = `
  INSERT INTO shortened_url(hash, url)
  VALUES(?, ?)
`;

const DB = setUpDb(':memory:', () => {
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
});

app.get('/:hash', (req, res) => {
  const { hash } = req.params;

  DB.get(GET_URL_BY_HASH, [ hash ], (err, row) => {
    if (err) {
      res
        .status(500)
        .json({
          error: err,
          status: 500,
        });

      return;
    }

    if (!row) {
      res
        .status(404)
        .end('URL not found');

      return;
    }

    res.redirect(row.url);
  });
});

app.post('/', (req, res) => {
  const { url } = req.body;

  if (!url) {
    res.status(400).end();
  }

  const hash = getURLHash(url);

  DB.run(INSERT_URL_HASH, [ hash, url ], (err, row) => {
    if (err) {
      res
        .status(500)
        .json({
          error: err,
          status: 500
        });

      return;
    }

    res
      .status(200)
      .json({
        url: `http://${HOST}/${hash}`
      });
  });
});