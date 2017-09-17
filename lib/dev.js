const appServer = require('./lib/server');

var WebpackDevServer = require("webpack-dev-server");
var webpack = require("webpack");
var fs = require("fs");

var webpackConfig = require('./webpack.config');

appServer.listen(3000);

var compiler = webpack(webpackConfig);
var server = new WebpackDevServer(compiler, {});
server.listen(8080);
