<profile>
  <form onsubmit={submit}>
    <div class='form-group'>
      <label>API Key</label>
      <input type='text' class='form-control' name='apiKey' value={apiKey} />
    </div>
    <button class='btn btn-primary'>Save</button>
  </form>
  <script>
  var self = this;
    this.apiKey =  localStorage.getItem('apiKey') || "EMPTY";

    this.submit = function(e) {
      self.apiKey = e.target.apiKey.value;
      localStorage.setItem('apiKey', self.apiKey);
    };
  </script>
</profile>
