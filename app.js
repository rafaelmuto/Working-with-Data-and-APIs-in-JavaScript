const express = require('express');
const app = express();

app.listen(3001, () => {
  console.log('==> running express...');
});

app.use(express.static('public'));
