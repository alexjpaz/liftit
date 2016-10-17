module.exports = {
  "storeEndpoint": "https://b3gg00cbli.execute-api.us-east-1.amazonaws.com/prod/profile",
  "build": {
    "TRAVIS_BUILD_NUMBER": process.env.TRAVIS_BUILD_NUMBER,
    "TRAVIS_COMMIT": process.env.TRAVIS_COMMIT,
  }
};
