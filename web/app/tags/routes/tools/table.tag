var Table = require('../../../models/Table');
var Log = require('../../../models/Log');
var Form = require('../../../form');
<tools-table>
  <table class='table table-bordered table--{opts.lift}'>
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
      <tr each={row in tableWarmup.rows} class='table--warmup'>
        <td>{ row.fraction * 100 }%</td>
        <td>{ row.weight }</td>
        <td each={col in row.list}>
          { col }
        </td>
      </tr>
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
    <div class='form-group'>
      <select name='lift' onchange={model} class='form-control'>
        <option value='press'>press</option>
        <option value='deadlift'>deadlift</option>
        <option value='bench'>bench</option>
        <option value='squat'>squat</option>
      </select>
    </div>
  </form>
  <style>
    tools-table .table {
      border: 4px solid red;
      border-radius: 4px;
    }

    tools-table .table tr {
      text-align: center;
    }

    tools-table .table--warmup {
      background: #f0f0f0;
    }

    tools-table .table--press { border-color: red; }
    tools-table .table--deadlift { border-color: green; }
    tools-table .table--bench { border-color: blue; }
    tools-table .table--squat { border-color: orange; }
  </style>
  <script>
    var tag = this;

    tag.opts = {
      week: '3x5',
      weight: 315,
      lift: 'press'
    };

    tag.Table = Table;

    var updateTable = function(opts) {
      tag.opts = Object.assign(tag.opts, opts);
      tag.table = new Table(tag.opts);
      tag.tableWarmup = new Table({
        week: 'DL',
        weight: tag.opts.weight
      });
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
