const path = require('path');
const fs = require('fs');
const express = require('express');
const fetchData = require('./fetch');

const app = express();

app.get('/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use(express.static(path.resolve(__dirname, './json')));

app.get('/shirts', (_req, res) => {
  fs.readFile('./json/shirts.json', 'utf8', function (err, data) {
    if (err) throw err;
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(JSON.parse(data));
  });
});

// fetchData();
// setInterval(fetchData, 1000);

const PORT = 5000;

app.listen({ port: PORT }, () =>
  console.log(`🚀 Server ready at http://localhost:${PORT}`)
);
