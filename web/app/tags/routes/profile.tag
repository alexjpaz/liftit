<profile>
  <form onsubmit={submit}>
    <div class='form-group'>
      <label>API Key</label>
      <input type='text' class='form-control' name='apiKey' value={apiKey} />
    </div>
    <button class='btn btn-primary'>Save</button>
  </form>

  <form onsubmit={deleteAllData}>
    <div class='form-group'>
      <label>Clear All Data 🙄</label>
    </div>
    <button class='btn btn-danger'>Clear All</button>
  </form>
1

  <script>

    var self = this;

    this.mixin('api');

    this.apiKey =  localStorage.getItem('apiKey') || "EMPTY";

    this.submit = function(e) {
      self.apiKey = e.target.apiKey.value;
      localStorage.setItem('apiKey', self.apiKey);
    };

    this.deleteAllData = function(e) {
      var yes = prompt("Delete All Data?");

      if(yes) {
        this.api.store.trigger('clearEvents');
      }
    }
  </script>
</profile>
