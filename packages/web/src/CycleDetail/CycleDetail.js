import React from 'react';

const lifts = ['press','squat','bench','deadlift'];
const fractions = ['85', '90', '95'];

class AddNewLogLink extends React.Component {
  render() {
    return (
      <a href={"#/logs/new"}>Add</a>
    );
  }
}

class LogLink extends React.Component {
  render() {
    if(!this.props.log) {
      return (<AddNewLogLink />);
    } else {
      return this.props.log.date || '✔';
    }
  }
}



export default class CycleDetail extends React.Component { 
  generateTable() {
    const table = {};
    const logs = this.props.logs;
    lifts.map((lift) => {
      if(!table[lift]) {
        table[lift] = {};
      }

      const cycle = this.props.cycle;

      const weight = cycle[lift];

      logs
        .filter((l) => l.lift === lift)
        .map((l) => {
          const fraction = (l.weight / cycle[lift]) * 100;
          table[lift][fraction] = l;
        });

    });

    return table;
  }

  render() {
    if(!this.props.cycle.date) {
      return null;
    }

    const cycle = this.props.cycle;
    
    const table = this.generateTable();
    return (
      <div>
        <div className='content'>
          <h2>Cycle on {this.props.cycle.date}</h2>
        </div>
        <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
          <thead>
            <tr>
              <th className='has-text-right'>Lift</th>
              <th>Max</th>
              <th className='has-text-centered'>3x5</th>
              <th className='has-text-centered'>3x3</th>
              <th className='has-text-centered'>531</th>
            </tr>
          </thead>
          <tbody>
            { Object.keys(table).map((k) => {
              return (
                <tr key='k'>
                  <th className='has-text-right'>{k}</th>
                  <th>{cycle[k]}</th>

                  { fractions.map((f) => {
                    return <td className='has-text-centered'>
                      <LogLink log={table[k][f]} />
                    </td>
                  })}
                </tr>
              );
            }) }
          </tbody>
        </table>
      </div>
    );
  }
}

CycleDetail.defaultProps = {
  cycle: {}
};
