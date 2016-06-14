var AWS = require('aws-sdk');
var P = require("bluebird/js/browser/bluebird.core");

var request = require('superagent');

var session = function() {
  riot.observable(this);
};

session.prototype.init = function(callback) {

};

var instance = null;

var storeEndpoint = 'https://b3gg00cbli.execute-api.us-east-1.amazonaws.com/prod/profile'

session.prototype.create = function() {
  var self = this;
  return new P(function(resolve, reject) {

    self.identityGoogle = localStorage.getItem('identity.google');

    if(!self.identityGoogle) {
      window.location.assign('/login.html');
      return;
    }

    self.fetch().then(resolve, reject)
  });
};

session.prototype.fetch = function() {
  var self = this;
  return new P(function(resolve, reject) {
    request.get(storeEndpoint)
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
    request.post(storeEndpoint)
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

session.getInstance = function() {
 if(!instance) {
   instance = new session();
 }

 return instance;
};

module.exports = new session();
