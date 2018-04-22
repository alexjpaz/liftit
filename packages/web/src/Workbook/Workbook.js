import React from 'react';

import NoLogsNotification from '../Log/NoLogsNotification.jsx';
import NoCyclesNotification from '../Cycle/NoCyclesNotification.jsx';

import NextLogCard from './NextLogCard';

import CurrentCycleCard from './CurrentCycleCard';

export class NoEntriesNotifications extends React.Component {
  render() {
    return (
      <div className='notification is-info'>
        <p className='subtitle'>
          There doesn't seem to be any entries in this workbook. 
          <a href='#/cycle/new'>Add a cycle</a> to get started!
        </p>
      </div>
    );

  }
}

export default class Workbook extends React.Component {
  componentWillMount() {
    if(this.props.workbook) {
      this.workbookEntries = this.props.workbook.entries;
    }
  }

  getNextLog() {
    if(!this.workbookEntries) {
      return null;
    }

    const nextLog = {  
      lift: 'press',
        minimumReps: 3,
        targetReps: 8,
        weight: 145,
        week: "3x3",
        cycle: {
          _id: "foo",
            press: 180
        }
    };

    return (
      <NextLogCard
        nextLog={nextLog}
      />
    );
  }
  getCycleDetail() {
    if(!this.workbookEntries) {
      return null;
    }
    const workbookEntries = this.workbookEntries;
    const latestCycle = workbookEntries.find(e => e.type === 'cycle');
    const logs = workbookEntries.filter(e => e.type === 'log');

    if(!latestCycle) {
      return <NoCyclesNotification />;
    }

    return (
      <CurrentCycleCard 
        cycle={latestCycle}
        logs={logs}
      />
    );
  }

  canRender() {
    return this.props.workbook 
      && this.props.workbook.entries 
      && this.props.workbook.entries.filter
      && this.workbookEntries
    ;
  }

  render() {
    if(!this.workbookEntries) {
      return <NoEntriesNotifications />
    }

    if(!this.canRender) {
      return <h1>error loading workbook</h1>
    }


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
