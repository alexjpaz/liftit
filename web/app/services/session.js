var riot = require('riot');

var P = require("bluebird/js/browser/bluebird.core");

var request = require('superagent');

var session = function(config) {
  this.localStorage = config.localStorage || global.localStorage;
  this.storeEndpoint = config.storeEndpoint;
  riot.observable(this);
};

session.prototype.init = function(callback) {

};

var instance = null;

session.prototype.create = function() {
  var self = this;
  return new P(function(resolve, reject) {

    self.identityGoogle = localStorage.getItem('identity.google');

    if(!self.identityGoogle) {
      window.location.assign('/login.html');
      return;
    }

    self.fetch().then(resolve, reject);
  });
};

session.prototype.fetch = function() {
  var self = this;
  return new P(function(resolve, reject) {
    request.get(self.storeEndpoint)
    .set('Accept', 'application/json')
    .set('x-auth-key', self.identityGoogle)
    .end(function(err, res){
      if(err) {
        reject(err);
      } else {
        resolve(res.body);
      }
    });
  });
};

session.prototype.store = function(value) {
  var self = this;
  return new P(function(resolve, reject) {
    request.post(self.storeEndpoint)
    .send(value)
    .set('Accept', 'application/json')
    .set('x-auth-key', self.identityGoogle)
    .end(function(err, res){
      if(err) {
        reject(err);
      } else {
        resolve(res.body);
      }
    });
  });
};

session.prototype.isSessionExpired = function() {
  var auth = JSON.parse(this.localStorage.getItem('identity.google.auth'));

  if(!auth) {
    return true;
  }

  var now = new Date().getTime();

  if(now >= auth.expires_at) {
    return true;
  }

  return false;
};

session.prototype.forceExpiration = function() {
  this.localStorage.removeItem('identity.google');
  this.localStorage.removeItem('identity.google.auth');
  this.localStorage.removeItem('identity.google.profile');
};

session.prototype.getProfileInfo = function() {
   var profile = JSON.parse(this.localStorage.getItem('identity.google.profile'));
  return profile;
}

session.prototype.getAuthInfo = function() {
  var auth = JSON.parse(this.localStorage.getItem('identity.google.auth'));


  if(!auth) {
    return {};
  }

  auth.tokenExpires = (auth.expires_at - new Date().getTime());
  auth.tokenExpiresInSeconds = Math.floor(auth.tokenExpires / 1000);
  auth.tokenExpiresInMinutes = Math.floor(auth.tokenExpiresInSeconds / 60);

  return auth;
};

session.getInstance = function() {
 if(!instance) {
   instance = new session();
 }

 return instance;
};

module.exports = session;
