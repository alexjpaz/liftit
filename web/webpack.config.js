var webpack = require('webpack');
var fs = require('fs');


module.exports = {
  entry: './app/index',
  output: {
    path: __dirname + '/public',
    filename: 'bundle.js'
  },
  externals: {
  },
  plugins: [
    new webpack.ProvidePlugin({
      riot: 'riot'
    })
  ],
  module: {
    preLoaders: [
      { test: /\.tag$/, exclude: /node_modules/, loader: 'riotjs-loader', query: { type: 'none' } }
    ],
    loaders: [
      { test: /\.js$|\.tag$/, exclude: /node_modules/, loader: 'babel-loader' }
    ]
  },
  devServer: {
    contentBase: './public',
    disableHostCheck: true,
    setup: function(app) {
      var bodyParser = require('body-parser')

      app.use(bodyParser({limit:'2mb'}));

      const profilePath = './mock/profile.json';

      app.get('/login.html', function(req, res) {
        res.redirect("./login-fake.html");
      });

      app.post('/api/profile', function(req, res) {
        fs.writeFileSync(profilePath, JSON.stringify(req.body));
        res.end("Saved", 200);
      });
      app.get('/api/profile', function(req, res) {
        if (!fs.existsSync('mock')) {
          fs.mkdirSync('mock');
        }
        if (!fs.existsSync(profilePath)) {
          fs.writeFileSync(profilePath, "{}");
        }
        var buffer = fs.readFileSync(profilePath);
        res.json(JSON.parse(buffer.toString()));
      });
    },
  },
};
