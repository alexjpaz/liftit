import React from 'react';

import liftit from 'liftit-common';

import './LiftTable.css';

export default class LiftTable extends React.Component {


  generateTableData() {
    const opts = this.props;

    if(!opts.week) {
      throw new Error("Illegal argument exception: must have a week to generate lift table");
    }

    var table = {
      plates: liftit.config.plates,
      rows: []
    }

    liftit.config.weekMap[opts.week].forEach(function(w) {
      var row = {
        weight: liftit.roundTo(opts.weight * w, 5),
        fraction: w
      };
      row = Object.assign(row, liftit.plates(row.weight));
      table.rows.push(row);
    });

    if(!opts.hideWarmup) {
      liftit.config.weekMap['DL'].forEach(function(w) {
        var row = {
          weight: liftit.roundTo(opts.weight * w, 5),
          fraction: w,
          isWarmup: true
        };
        row = Object.assign(row, liftit.plates(row.weight));
        table.rows.unshift(row);
      })
    }


    return table;
  }

  render() {
    const table = this.generateTableData();

    return (
      <div className='LiftTable'>
        <table className={`table is-bordered table--is-centered table--${this.props.lift}`}>
          <thead>
            <tr>
              <th>%</th>
              <th>W</th>
              {table.plates.map((p) => (
                <th>{p}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((r) => (
              <tr className={`${r.isWarmup ? 'is-warmup' : ''}`}>
                <td>{r.fraction*100}</td>
                <td>{r.weight}</td>
                {r.list.map((r) => (
                  <td>{r}</td>
                ))}
              </tr>
            ))}
          </tbody>
          <tbody>
            <tr>
              <th colspan="7">
                <p class='has-text-grey'><small>{this.props.weight} {this.props.week}</small></p>
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
