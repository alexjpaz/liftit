var HtmlWebpackPlugin = require('html-webpack-plugin');
var HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')

var webpackConfig = {
  entry: __dirname + '/src/index.js',
  externals: {
    "firebase": "firebase"
  },
  output: {
    path: __dirname + '/public',
    filename: 'index_bundle.js'
  },
  plugins: [
    new CopyWebpackPlugin([
      "node_modules/web/build/"
    ]),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: 'node_modules/web/build/index.html'
    }),
    new HtmlWebpackIncludeAssetsPlugin({
      assets: [
        "/__/firebase/4.8.2/firebase-app.js",
        "/__/firebase/4.8.2/firebase-auth.js",
        "/__/firebase/4.8.2/firebase-database.js",
        "/__/firebase/4.8.2/firebase/init.js"
      ],
      append: false
    })
  ]
};

module.exports = webpackConfig;
