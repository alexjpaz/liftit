<toast-bar>
    <div if={showAuth} class='message'>Authorization expired. Please refresh to login</div>
    <div if={showSaving} class='message'>Saving ...</div>
    <div if={showSaveFailure} class='message'>Could not persist your data! Please refresh the page and try again.</div>
    <style scoped>
      :scope {
        display: block;
        overflow: hidden;
        position: fixed;
        width: 100%;
        bottom: 0;
      }
    
      :scope .message {
        padding: 4px;
        background: #666;
        height: 30px;
        color: #eee;
      }
    </style>
    <script>
      var self = this;
      this.mixin('api');

      var store = this.api.store;

      setInterval(function() {
        // check auth expiration
        var auth = JSON.parse(localStorage.getItem('identity.google.auth'));
        if(new Date().getTime() >= auth.expires_at) {
          self.showAuth = true;
        } 
      }, 100);

      store.on('persist', function(error) {
        self.showSaving = true;
        self.showSaveFailure = false;
        self.update();
      });

      store.on('persistSuccess', function(error) {
        self.showSaving = false;
        self.showSaveFailure = false;
        self.update();
      });

      store.on('persistFailure', function(error) {
        self.showSaving = false;
        self.showSaveFailure = true;
        self.update();
      });
    </script>
</toast-bar>
