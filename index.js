/* eslint-disable no-console */
const path = require('path');
const fs = require('fs');
const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const fetchData = require('./fetch');

const app = express();

app.get('/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use(express.static(path.resolve(__dirname, './json')));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, './public', 'index.html'), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

app.get('/shirts', (_req, res) => {
  fs.readFile('./json/shirts.json', 'utf8', (err, data) => {
    if (err) throw err;
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(JSON.parse(data));
  });
});

app.get('/jackets', (_req, res) => {
  fs.readFile('./json/jackets.json', 'utf8', (err, data) => {
    if (err) throw err;
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(JSON.parse(data));
  });
});

app.get('/accessories', (_req, res) => {
  fs.readFile('./json/accessories.json', 'utf8', (err, data) => {
    if (err) throw err;
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(JSON.parse(data));
  });
});

fetchData();
setInterval(fetchData, 300000);

const PORT = 5000;

app.listen({ port: process.env.PORT }, () =>
  console.log(`🚀 Server ready at http://localhost:${PORT}`)
);

module.exports = app;
