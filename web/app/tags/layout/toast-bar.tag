<toast-bar>
<p></p>
<style scoped>
  :scope {
    display: block;
    overflow: hidden;
    position: fixed;
    width: 100%;
    height: 40px;
  }
</style>
<script>
  var self = this;
  this.mixin('api');

  var store = this.api.store;

  store.on('persistFailure', function(error) {
    console.log(1,error);
    alert('Could not persist your data! Please refresh the page and try again.');
  });
</script>
</toast-bar>
