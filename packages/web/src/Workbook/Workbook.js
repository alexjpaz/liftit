import React from 'react';

import CycleDetail from '../CycleDetail';

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
        {this.getNextLog()}
        {this.getCycleDetail()}
      </div>
    )
  }
}
