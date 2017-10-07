var http = require('http')
const express = require('express')
const exphbs  = require('express-handlebars');

const app = express()
const server = http.createServer(app);

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
  res.setHeader('Cache-Control', 'public, max-age=3600');
  res.render('home', {
    foo: new Date()
  });
});

app.get('/api/health', (req, res) => {
  res.sendStatus(200);
});

app.get('/api/status', function (req, res) {
  const info = {
    build: {
      commit: process.env.BUILD_COMMIT
    }
  };
  res.send(JSON.stringify(info));
})

module.exports = server;

