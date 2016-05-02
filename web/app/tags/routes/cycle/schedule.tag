var Cycle = require('../../../models/Cycle');

<cycle-schedule>
  <form onsubmit={submit}>
    <button>Save</button>
  </form>
  <script>
    var self = this;
    var maxes = [
      new Cycle({ date: "1999-01-01" }),
      new Cycle({ date: "1999-01-02" }),
      new Cycle({ date: "1999-01-03" }),
      new Cycle({ date: "1999-01-04" }),
      new Cycle({ date: "1999-01-05" }),
      new Cycle({ date: "1999-01-06" }),
    ]

    this.mixin('api');

    var store = self.api.store;

    this.submit = function(form) {
      form.preventDefault();

      maxes.forEach(function(max) {
        store.trigger('addEvent', Object.assign({}, max));
      });

      window.history.back();
    };
  </script>
</cycle-schedule>
