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

class LogThing extends React.Component {
  render() {
    const log = this.props.log;
    const isDone = !!this.props.log.date;
    
    return (
      <a href={`#/logs/${log._id}`}>
        <span>{log.reps}x{log.weight}</span>
      </a>
    );
  }
}

class LogLink extends React.Component {
  render() {
    if(!this.props.log) {
      return (<AddNewLogLink />);
    } else {
      return (<LogThing log={this.props.log}/>);
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
        <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
          <thead>
            <tr>
              <th colspan='5'>Cycle {this.props.cycle.date}</th>
            </tr>
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
