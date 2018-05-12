import React from 'react';

const lifts = ['press','squat','bench','deadlift'];
const fractions = ['85', '90', '95'];
const weeks = ['3x5','3x3','531'];

class AddNewLogLink extends React.Component {
  render() {
    return (
      <a href={`#/logs/new?from=${JSON.stringify(this.props)}`} className='has-text-grey-light'>
        <i className="fas fa-plus"></i>
      </a>
    );
  }
}

class LogThing extends React.Component {
  render() {
    const log = this.props.log;
    
    return (
      <a href={`#/logs/${log._id}`}>
        <i className='fas fa-check'></i>
      </a>
    );
  }
}

class LogLink extends React.Component {
  render() {
    if(!this.props.log) {
      return (<AddNewLogLink {...this.props} />);
    } else {
      return (<LogThing log={this.props.log}/>);
    }
  }
}


export default class CycleDetail extends React.Component { 
  generateTable() {
    const table = {};

    const {
      logs,
      lifts
    } = this.props;

    lifts.forEach((lift) => {
      if(!table[lift]) {
        table[lift] = {};
      }

      const cycle = this.props.cycle;

      logs
        .filter((l) => l.lift === lift)
        .forEach((l) => {
          const fraction = (l.weight / cycle[lift]) * 100;
          table[lift][fraction] = l;
        });

    });

    return table;
  }

  render() {
    let {
      fractions,
      weeks
    } = this.props;

    if(!this.props.cycle.date) {
      return (
        <div className='has-text-centered'>
          <i className='fas fa-exclamation-triangle'></i>
          <p><span>No data</span></p>
          <pre>{JSON.stringify(this.props)}</pre>
        </div>
      );
    }

    const cycle = this.props.cycle;
    
    const table = this.generateTable();
    return (
      <div>
        <table className="table is-striped is-narrow is-hoverable is-fullwidth">
          <thead>
            <tr>
              <th colspan='5'>
                <a href={`#/cycles/${this.props.cycle._id}`}>{this.props.cycle.date}</a>
              </th>
            </tr>
            <tr>
              <th></th>
              {Object.keys(table).map((k,i) => (
                <th className='has-text-centered'>
                  {k}
                  <br />
                  <small className='has-text-grey-light'>{cycle[k]}</small>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {weeks.map((week,i) => (
              <tr key={i}>
                <th className='has-text-right'>
                  {week}
                </th>
                {Object.keys(table).map((k,j) => (
                  <td key={j} className='has-text-centered'>
                    <LogLink 
                      log={table[k][fractions[i]]} 
                      lift={k}
                      cycle={cycle[k]}
                      fraction={fractions[i]}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

CycleDetail.defaultProps = {
  cycle: {},
  logs: [],
  lifts,
  fractions,
  weeks
};
