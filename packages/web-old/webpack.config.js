const path = require('path');

module.exports = {
  entry: './lib/client/',
  output: {
    filename: 'build/bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          { 
            loader: 'file-loader',
            options: {
              outputPath: "build/",
              publicPath: "http://localhost:8080/"
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true,
            },
          },
        ],
      },
      { test: /\.css$/, loader: "style-loader!css-loader" },
      {
        test: /.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                ['es2015'],
                'react',
              ],
            }
          }
        ]
      },
    ]
  }
}
