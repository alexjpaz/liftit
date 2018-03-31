var HtmlWebpackPlugin = require('html-webpack-plugin');
var HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')

var webpackConfig = {
  entry: { 
    main: __dirname + '/src/index.js',
    auth: __dirname + '/src/auth/index.js',
  },
  externals: {
    "firebase": "firebase"
  },
  output: {
    path: __dirname + '/public',
    filename: '[name]_bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ],
  },
  plugins: [
    new CopyWebpackPlugin([
      "node_modules/web/build/"
    ]),
    new HtmlWebpackIncludeAssetsPlugin({
      assets: [
        "https://www.gstatic.com/firebasejs/4.10.0/firebase.js"
      ],
      append: true
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: 'node_modules/web/build/index.html',
      chunks: ["main"]
    }),

    new HtmlWebpackPlugin({
      filename: "auth.html",
      template: 'src/auth/index.html',
      chunks: ["auth"]
    }),
  ]
};

module.exports = webpackConfig;
