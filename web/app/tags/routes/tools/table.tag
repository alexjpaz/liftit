var Table = require('../../../models/Table');
var Form = require('../../../form');
<tools-table>
  <table class='table table-bordered'>
    <thead>
      <tr>
        <th>%</th>
        <th>W</th>
        <th each={w in table.plates}>
          { w }
        </th>
      </tr>
    </thead>
    <tbody>
      <tr each={row in table.rows}>
        <td>{ row.fraction * 100 }%</td>
        <td>{ row.weight }</td>
        <td each={col in row.list}>
          { col }
        </td>
      </tr>
    </tbody>
  </table>
  <hr />
  <form name='settings'>
    <div class='form-group'>
      <input type='number' name='weight' value={opts.weight} onchange={model} class='form-control' />
    </div>
    <div class='form-group'>
      <select name='week' onchange={model} class='form-control'>
        <option each='{ k,v in Table.weekMap }' value={k} selected={parent.opts.week === k}>{k}</option>
      </select>
    </div>
  </form>
  <script>
    var tag = this;

    tag.opts = {
      week: '1:1',
      weight: 315
    };

    tag.Table = Table;

    var updateTable = function(opts) {
      tag.opts = Object.assign(tag.opts, opts);
      tag.table = new Table(tag.opts);
      tag.update();
    };

    tag.model = function(e) {
      var opts = {};
      opts[e.target.name] = Form.parseValue(e);
      updateTable(opts);
    };


    var route = riot.route.create();
    route('/tools/table..', function() {
      var opts = riot.route.query();
      updateTable(opts);
    });
  </script>
</tools-table>
