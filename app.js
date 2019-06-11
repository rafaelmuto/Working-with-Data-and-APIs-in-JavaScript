const express = require('express');
const app = express();

app.listen(3000, () => {
  console.log('==> running express...');
});

app.use(express.static('public'));
