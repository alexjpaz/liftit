var http = function(config) {
};

http.ajax = function(method, url, data, callback, failure) {
    callback = callback || function() {};
    failure = failure || function() {};
    var xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    if(method === 'PUT') {
      xhr.setRequestHeader('Content-Type', 'application/json');
    }
    xhr.onload = function() {
      if(this.status === 200) {
        if(this.responseText && this.responseText.length > 0) {
          callback(JSON.parse(this.responseText));
        } else {
          callback(this);
        }
      } else {
        failure(this);
      }
    };

    if(data) {
      data = JSON.stringify(data);
    }
    xhr.send(data);
};

module.exports = http;
