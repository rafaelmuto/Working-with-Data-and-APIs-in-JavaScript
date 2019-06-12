const express = require('express');
const app = express();

app.use(express.json());

// static server
app.use(express.static('public'));
// route+controller
app.use('/API', (req, res) => {
  console.log(req.body);
  res.json({
    status: 'ok!',
    latitude: req.body.lat,
    longitude: req.body.lon
  });
});

app.listen(3001, () => {
  console.log('==> running express...');
});
