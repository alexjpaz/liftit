var webpack = require('webpack');

module.exports = {
  entry: './app/index',
  output: {
    path: __dirname + '/public',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.ProvidePlugin({
      riot: 'riot'
    })
  ],
  module: {
    preLoaders: [
    ],
    loaders: [
      { test: /\.css$/, loader: "style-loader!css-loader" },
  //    { test: /\.png$/, loader: "url-loader?limit=100000" },
    //  { test: /\.jpg$/, loader: "file-loader" },
      { test: /\.js$|\.tag$/, exclude: /node_modules/, loader: 'babel-loader' }
    ]
  },
  devServer: {
    contentBase: './public'
  }
};
