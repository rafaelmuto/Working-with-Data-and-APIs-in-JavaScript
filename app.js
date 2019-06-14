const express = require('express');
const Datastore = require('nedb');

const app = express();

app.use(express.json());

const database = new Datastore('database.db');
database.loadDatabase();

// static server
app.use(express.static('public'));

// route+controller
app.use('/API', (req, res) => {
  const data = req.body;
  data.timestamp = Date.now();

  database.insert(data);

  res.json({
    status: 'ok!',
    latitude: req.body.lat,
    longitude: req.body.lon
  });
});

app.listen(3001, () => {
  console.log('==> running express...');
});
