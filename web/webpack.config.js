var webpack = require('webpack');

module.exports = {
  entry: {
    "app": "./app/entry.js",
  },
  output: {
    path: __dirname,
    filename: "dist/bundles/[name].js"
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
      { test: /\.css$/, loader: "style!css" },
      { test: /\.tag$/, exclude: /node_modules/, loader: 'riotjs-loader', query: { type: 'none' } }
    ]
  },
  publicPath: "/app"
};
