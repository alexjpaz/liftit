let config = {};

let env = process.env.CONFIG_ENV || 'local';

Object.assign(config, require("./"+env));

module.exports = config;
