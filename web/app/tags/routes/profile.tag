var DateUtils = require('../../date');
<profile>
  <div>
    <h3>User</h3>
    <p>{profile.ig}</p>
    <p if={auth}>Token expires in {tokenExpiresInMinutes} minutes ({tokenExpiresInSeconds} seconds)</p>
    <p if={!auth}>Token expired! Please refresh.</p>
  </div>
  <div>
    <h3>Build Info</h3>
    <p><code>commit: {api.build.TRAVIS_COMMIT}</code></p>
      <p><code>build_number: {api.build.TRAVIS_BUILD_NUMBER}</code></p>
  </div>
  <div>
    <h3>Backup and Restore</h3>
    <button class='btn btn-primary' onclick={backup}>Backup</button>
    <button class='btn btn-primary' onclick={restore}>Restore</button>
    <input type='file' id='restoreFile' onchange={restoreHanlder} style='display: none'/>
  </div>

  <div>
    <h3>Clear All Data</h3>
    <form onsubmit={deleteAllData}>
      <button class='btn btn-danger'>Clear All</button>
    </form>
  </div>

  <script>

    var self = this;

    this.mixin('api');

    var session = this.api.session;

    this.apiKey =  localStorage.getItem('apiKey') || "EMPTY";

    (function() {
      self.profile = session.getProfileInfo();

      self.update();
    
      var updateExpires = function() {
        var auth = session.getAuthInfo();
        self.auth = auth;
        self.tokenExpires = auth.tokenExpires;
        self.tokenExpiresInSeconds = auth.tokenExpiresInSeconds;
        self.tokenExpiresInMinutes = auth.tokenExpiresInMinutes
        self.update();
      };

      updateExpires();
      setInterval(updateExpires, 1000);
    })();

    this.restoreHanlder = function(e) {
      var files = e.target.files;
       var reader = new FileReader();

       reader.onload = (function(file) {
         var json = JSON.parse(file.currentTarget.result);

         var events = [];

         Object.keys(json.events).forEach(function(key) {
           events.push(json.events[key]);
         });

        self.api.store.trigger('updateEvents', events);
       });

       reader.readAsText(files[0]);

      console.log(files);
    };

    this.restore = function(e) {
      this.restoreFile.click();
    };

    this.backup = function(e) {
      var saveData = (function () {
        var a = document.createElement("a");
        document.body.appendChild(a);
        a.style = "display: none";
        return function (data, fileName) {
          var json = JSON.stringify(data),
          blob = new Blob([json], {type: "octet/stream"}),
          url = window.URL.createObjectURL(blob);
          a.href = url;
          a.download = fileName;
          a.click();
          window.URL.revokeObjectURL(url);
        };
      }());

      var data = this.api.store;

      saveData(data, 'liftit-'+DateUtils.create()+'-'+new Date().getTime()+'.json');
    };

    this.submit = function(e) {
      self.apiKey = e.target.apiKey.value;
      localStorage.setItem('apiKey', self.apiKey);
    };

    this.deleteAllData = function(e) {
      var yes = confirm("Delete All Data?");

      if(yes) {
        this.api.store.trigger('clearEvents');
      }
    }

  </script>
</profile>
