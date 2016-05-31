var AWS = require('aws-sdk');
var P = require("bluebird/js/browser/bluebird.core");

var session = function() {
  riot.observable(this);
};

session.prototype.init = function(callback) {

};

var instance = null;

session.prototype.create = function() {
  var self = this;
  return new P(function(resolve, reject) {
    var identityGoogle = localStorage.getItem('identity.google');

    if(!identityGoogle) {
      window.location.assign('/login.html');
      return;
    }

    AWS.config.region = 'us-east-1'; // Region
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: 'us-east-1:726109ba-82d3-495e-9ad8-5f0d4141c443',
      Logins: {
        "accounts.google.com": identityGoogle
      }
    });
    AWS.config.credentials.get(function(err){
      if(err) {
        window.location.assign('/login.html');
        reject();
        return;
      }
      self.dynamodb = new AWS.DynamoDB.DocumentClient();
      resolve();
    });
  });
};

session.prototype.fetch = function() {
  var self = this;
  return new P(function(resolve, reject) {
    var params = {
      TableName: 'liftit',
      Key: {
        userId: AWS.config.credentials.identityId
      }
    };
    self.dynamodb.get(params, function(err, data) {
      if(err) {
        reject(err, data);
      }
      resolve(data);
    });
  });
};

session.prototype.store = function(value) {
  var self = this;
  return new P(function(resolve, reject) {
    var params = {
      TableName: 'liftit',
      Item: {
        userId: AWS.config.credentials.identityId,
        data: value
      }
    };
    self.dynamodb.put(params, function(err, data) {
      if(err) {
        reject(err, data);
      }
      resolve(data);
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
