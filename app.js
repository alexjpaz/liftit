const express = require('express')
const app = express();

app.get('/ping', (req, res) => {
  res.send("OK");
});

module.exports = app;
