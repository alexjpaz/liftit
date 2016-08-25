var AWS = require('aws-sdk');
var crypto = require('crypto');
var P = require('bluebird');

var getLastKey = function(identityId) {
  return new P(function(resolve, reject) {
    var dynamodb = new AWS.DynamoDB.DocumentClient();
    dynamodb.get({
      TableName: 'liftit',
      Key: {
        userId: identityId
      }
    }, function(err, data) {
      if(err) {
        reject(err);
      } else {
        if(!data || !data.Item) {
          reject("No last key");
          return;
        }
        resolve(data.Item.lastKey);
      }
    })

  });
};

var putData = function(identityId, data) {
  var s3 = new AWS.S3();
  var dynamodb = new AWS.DynamoDB.DocumentClient();

  return new P(function(resolve, reject) {
    if(!data) {
      reject("No data for put");
    }

    var string = JSON.stringify(data);

    var hash = crypto.createHash('sha256').update(string).digest('hex');

    var key = ['data/user/',identityId,'/',hash].join('');

    s3.putObject({
      Bucket: 'liftit.alexjpaz.com',
      Key: key,
      ContentType: "application/json",
      Body: string,
    }, function(err, data) {
      if(err) {
        reject(err);
        return;
      }

      var Item = {
        userId: identityId,
        lastKey: hash
      };
      dynamodb.put({
        TableName: 'liftit',
        Item: Item
      }, function(err, data) {
        if(err) {
          reject(err);
        }
        resolve(Item);
      });
    });
  });
};

var getData = function(identityId) {
  var s3 = new AWS.S3();
  var dynamodb = new AWS.DynamoDB.DocumentClient();
   return new P(function(resolve, reject) {
      dynamodb.get({
        TableName: 'liftit',
        Key: {
          userId: identityId
        }
      }, function(err, data) {
        if(err) {
          reject(err);
          return;
        }

        if(!data || !data.Item || !data.Item.lastKey) {
          reject("No data for user " + identityId);
          return;
        }

        var Item = data.Item;

        var key = ['data/user/',identityId,'/',Item.lastKey].join('');

        s3.getObject({
          Bucket: 'liftit.alexjpaz.com',
          Key: key,
        }, function(err, data) {
          if(err) {
            reject(err);
          } else {
            resolve(JSON.parse(data.Body.toString()));
          }
        });
      });
    });
};

exports.handler = function(event, context, callback) {
  var userId = event.params.header["x-auth-key"];
  AWS.config.region = 'us-east-1';
  AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'us-east-1:726109ba-82d3-495e-9ad8-5f0d4141c443',
    Logins: {
      "accounts.google.com": userId
    }
  });
  AWS.config.credentials.get(function(err){
    if(err) {
      callback(err);
    }

    var identityId = AWS.config.credentials.identityId;

   try {
      if(event.context["http-method"] === "PUT") {
        getLastKey(identityId).then(function(lastKey) {
          if(!event.params.header["x-last-key"]) {
            callback("x-last-key required for PUT");
            return;
          } else {
            if(lastKey !== event.params.header["x-last-key"]) {
              callback(["x-last-key does not match: ", lastKey,event.params.header["x-last-key"]].join());
              return;
            }
          }
          putData(identityId, event["body-json"]).then(function(data) {
            callback(null, data);
          }).catch(function(err) {
            callback(err);
          });
        });
      }
      if(event.context["http-method"] === "POST") {
          putData(identityId, event["body-json"]).then(function(data) {
            callback(null, data);
          }).catch(function(err) {
            callback(err);
          });
      } else {

      if(event.context["http-method"] === "GET") {
        getData(identityId).then(function(data) {
          callback(null, data);
        }).catch(function(err) {
          callback(err);
        });
      }


       return;

      }
    } catch(e) {
      callback(e);
    }

 });
};

