import React from 'react';

import NextLogCard from './NextLogCard';

import CurrentCycleCard from './CurrentCycleCard';

export default class Workbook extends React.Component {
  componentWillMount() {
    this.workbookEntries = this.props.workbook.entries;
  }

  getNextLog() {
    const nextLog = this.workbookEntries.filter(e => e.type === 'log');
    return (
      <NextLogCard
        log={nextLog}
      />
    );
  }
  getCycleDetail() {
    const workbookEntries = this.props.workbook.entries;
    const latestCycle = workbookEntries.find(e => e.type === 'cycle');
    const logs = workbookEntries.filter(e => e.type === 'log');

    return (
      <CurrentCycleCard 
        cycle={latestCycle}
        logs={logs}
      />
    );
  }

  render() {
    return (
      <div>
        {this.getNextLog()}
        <br />
        {this.getCycleDetail()}
        <br />

        <div className="field is-grouped">
          <p className="control">
            <a className='button is-link is-outlined' href='#/logs'>Manage Logs</a> 
          </p>
          <p className="control">
            <a className='button is-link is-outlined' href='#/cycles'>Manage Cycles</a> 
          </p>
        </div>
      </div>
    )
  }
}
