const Session = require('../../app/services/session');
const expect = require('chai').expect;
const assert = require('chai').assert;
const sinon = require('sinon');

describe('session', () => {
  let localStorageMock = {
    getItem: sinon.stub(),
    removeItem: sinon.stub()
  };
  let session;
  beforeEach(() => {
    localStorageMock.getItem.reset();
    localStorageMock.removeItem.reset();
    session = new Session({
      localStorage: localStorageMock
    });
  });
  it('it should detect an expired session', () => {
    localStorageMock.getItem.withArgs('identity.google.auth').returns(JSON.stringify({
      expires_at: 0
    }));

    const isExpired = session.isSessionExpired();

    expect(isExpired).to.eql(true);
  });

  it('it should detect a non-expired session', () => {
    localStorageMock.getItem.withArgs('identity.google.auth').returns(JSON.stringify({
      expires_at: 2000000000000000
    }));

    const isExpired = session.isSessionExpired();

    expect(isExpired).to.eql(false);
  });

  it('should force expiration', () => {
    session.forceExpiration();

    expect(localStorageMock.removeItem.calledWith('identity.google.auth')).to.eql(true);
    expect(localStorageMock.removeItem.calledWith('identity.google')).to.eql(true);
    expect(localStorageMock.removeItem.calledWith('identity.google.profile')).to.eql(true);
  });

  it('should return authInfo', () => {
    localStorageMock.getItem.withArgs('identity.google.auth').returns(JSON.stringify({
      expires_at: 200000000000
    }));

    const auth = session.getAuthInfo();

    expect(auth.tokenExpires).to.be.defined;
    expect(auth.tokenExpiresInSeconds).to.be.defined;
    expect(auth.tokenExpiresInMinutes).to.be.defined;
  });
});
