import React from 'react';

import CycleDetail from '../CycleDetail';

import SmartCard from './SmartCard';


export default class Workbook extends React.Component {
  componentWillMount() {
    this.workbookEntries = this.props.workbook.entries;
  }

  getNextLog() {
    const nextLog = this.workbookEntries.filter(e => e.type === 'log');
    return (
      <div className='box'>
      </div>
    );
  }
  getCycleDetail() {
    const workbookEntries = this.props.workbook.entries;
    const latestCycle = workbookEntries.find(e => e.type === 'cycle');
    const logs = workbookEntries.filter(e => e.type === 'log');

    return (
      <CycleDetail
        cycle={latestCycle}
        logs={logs}
      />
    );
  }

  render() {
    return (
      <div>
        <SmartCard />
        <br />

        {this.getNextLog()}
        {this.getCycleDetail()}

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
