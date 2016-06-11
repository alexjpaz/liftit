var AWS = require('aws-sdk');

exports.handler = function(event, context, callback) {
  AWS.config.region = 'us-east-1';
  AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'us-east-1:726109ba-82d3-495e-9ad8-5f0d4141c443',
    Logins: {
       "accounts.google.com": event.identity.google
    }
  });
  AWS.config.credentials.get(function(err){
    var dynamodb = new AWS.DynamoDB.DocumentClient();
    var params = {
      TableName: 'liftit',
      Key: {
        userId: AWS.config.credentials.identityId
      }
    };
    dynamodb.get(params, function(err, data) {
      console.log(arguments, JSON.stringify(data));
    });
  });
};

