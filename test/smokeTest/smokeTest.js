const request = require('superagent');

const expect = require('chai').expect;

const APP_URL = process.env.APP_URL || 'http://localhost:3000';

const awaitApplicationStart = () => {
  return new Promise((resolve) => {
    const intervalId = setInterval(() => {
      request.get(`${APP_URL}/api/health`)
        .then((rsp) => {
          expect(rsp.text).to.equal("OK");
          resolve();
          clearInterval(intervalId);
        }).catch(e => {
          console.error("Could not connect. Retrying.");
        });

    }, 2000);
  });
};

describe('Smoke Tests', () => {
  it('Ensure that the application is started', () => {
    return awaitApplicationStart()
      .then(() => {
        return request.get(`${APP_URL}/`)
          .then((rsp) => {
            expect(rsp.text).to.contain('<script defer src=\'/build/bundle.js\'></script>');
          });
      });
  });
});
