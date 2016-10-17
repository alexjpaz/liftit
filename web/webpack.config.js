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
    setup: function(app) {
      var bodyParser = require('body-parser')

      app.use(bodyParser());

      app.post('/api/profile', function(req, res) {
        console.log(req.body);
        fs.writeFileSync('./mock/profile.json', JSON.stringify(req.body));
        res.end("Saved", 200);
      });
      app.get('/api/profile', function(req, res) {
        var buffer = fs.readFileSync('./mock/profile.json');
        res.json(JSON.parse(buffer.toString()));
      });
    },
  },
};
