let config = {
  "build": {
    "TRAVIS_BUILD_NUMBER": "NONE",
    "TRAVIS_COMMIT": "LOCAL",
  }

};

let env = process.env.CONFIG_ENV || 'production';

Object.assign(config, require("./"+env));

module.exports = config;
