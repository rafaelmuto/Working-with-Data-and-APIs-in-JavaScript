const express = require('express');
const Datastore = require('nedb');

const app = express();

app.use(express.json());

const database = new Datastore('database.db');
database.loadDatabase();

// static server
app.use(express.static('public'));

// => route+controller
app.post('/API', (req, res) => {
  const data = req.body;
  data.timestamp = Date.now();
  database.insert(data);
  // console.log('Nedb:', data);
  res.json({
    status: 'ok!',
    latitude: req.body.lat,
    longitude: req.body.lon,
    name: req.body.name,
    msg: req.body.msg
  });
});
app.get('/API', (req, res) => {
  database.find({}, (err, data) => {
    if (err) {
      res.end();
      return;
    }
    res.json(data);
  });
});

app.listen(3001, () => {
  console.log('==> running express...');
  console.log('-> starting server on: //localhost:3001');
});
