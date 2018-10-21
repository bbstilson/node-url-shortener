const sqlite = require('sqlite3');

const MK_TABLE = `
CREATE TABLE shortened_url(
  hash text primary key,
  url text not null,
  created_at datetime default current_timestamp
)`;

const MK_INDEX = `CREATE INDEX idx_shortened_url_hash ON shortened_url(hash)`;

module.exports = function setUpDb(url, done) {
  const db = new sqlite.Database(url, sqlite.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    }

    console.log('Connected to database.');

    db.run(MK_TABLE, () => {
      db.run(MK_INDEX);
    });

    done();
  });

  return db;
}
