import React from 'react';

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
    return (
      <NextLogCard />
    );
  }
  getCycleDetail() {
    if(!this.workbookEntries) {
      return null;
    }

    return (
      <CurrentCycleCard />
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
