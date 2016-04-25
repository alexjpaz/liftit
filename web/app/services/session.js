var session = function() {
};

session.prototype.init = function(callback) {

};

var instance = null;

session.create = function(successfn) {
  try {
    instance = JSON.parse(localStorage.getItem('session'));

    if(new Date() < new Date(instance.expires)) {
      successfn(instance);
      console.info('local session was found');
      return;
    }

    throw new Error('local session has expired');
  } catch(e) {
    console.info('error loading local session: ', e);
    instance = null;
  }

  if(instance === null) {
    var url = 'https://b3gg00cbli.execute-api.us-east-1.amazonaws.com/prod/profile2';

    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.setRequestHeader('x-api-key', localStorage.getItem('apiKey') || "NONE");
    xhr.onload = function() {
      if(this.responseText && this.responseText.length > 0) {
        localStorage.setItem('session', this.responseText);
        successfn(JSON.parse(this.responseText));
      }
    };
    xhr.send(null);
  }
};

session.getInstance = function() {
 if(!instance) {
   instance = new session();
 }

 return instance;
};

module.exports = session;
