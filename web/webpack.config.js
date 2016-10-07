var webpack = require('webpack');

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
//      { test: /\.css$/, loader: "style-loader!css-loader" },
  //    { test: /\.png$/, loader: "url-loader?limit=100000" },
    //  { test: /\.jpg$/, loader: "file-loader" },
      { test: /\.js$|\.tag$/, exclude: /node_modules/, loader: 'babel-loader' }
    ]
  },
  devServer: {
    contentBase: './public',
    setup: function(app) {
      app.get('/api/profile', function(req, res) {
        res.json({
          "test": "foo"
        });
      });
    },
  },
};
