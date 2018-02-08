var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpackConfig = {
  entry: __dirname + '/src/index.js',
  externals: {
    "firebase": "firebase"
  },
  output: {
    path: __dirname + '/public',
    filename: 'index_bundle.js'
  },
  plugins: [new HtmlWebpackPlugin({
    template: 'src/index.html'
  })]
};

module.exports = webpackConfig;
