## Node URL shortener

This was a quick, coffee-shop project to implement a url-shortener service.

The server uses `express` and the persistence layer is `sqlite3`.

### Starting the service

From root:

```
node server.js
```

You should see:

```
Connected to database.
Listening on port 3000
```

For development, I like to use `nodemon` for auto-restarts.

### Getting a shortened URL

To get a shortened url, make a POST request to the `/` endpoint.

```
curl -X POST http://localhost:3000 \
-H 'Content-Type: application/json' \
-d '{ "url": "https://github.com/bbstilson/node-url-shortener" }'
```

You will get a response:

```
{"url":"http://localhost:3000/afdb5f7824bd808b"}
```

### Using a shortened URL

Paste the `url` response into your browser.

### Persistence

Since this was just for fun, the service uses an in-memory sqlite database by default. This means that every restart will wipe out the saved url hashes. So, if you're developing with `nodemon`, you lose the saved entries every time you hit save.