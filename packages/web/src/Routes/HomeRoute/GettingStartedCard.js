import React from 'react';

import WorkbookReducers from '../../common/WorkbookReducers';

export default class GettingStartedCard extends React.Component {
  shouldDisplay() {
    const entries = this.props.entries;
    const workbookReducers = new WorkbookReducers();

    const hasEmptyLogs = workbookReducers.hasEmptyLogs(entries);

    const hasEmptyCycles = workbookReducers.hasEmptyCycles(entries);

    return (hasEmptyLogs || hasEmptyCycles);
  }

  render() {
    if(this.shouldDisplay()) {
      return (
        <div className='notification is-info'>
          <p className='subtitle'>
            In order to take full advantage of lift you need to get a couple of things set up. <a href='#/start'>Get started</a>
          </p>
        </div>
      );
    } else {
      return null;
    }
  }
}
