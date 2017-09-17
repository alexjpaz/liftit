require('./server').listen(3000);

const webpack = require('webpack');
const WebpackDevServer= require('webpack-dev-server');
var compiler = webpack(require('./webpack.config.js'));

var server = new WebpackDevServer(compiler, {
   hot: true
});
server.listen(8080);
