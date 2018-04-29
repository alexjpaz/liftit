import React from 'react';

import { connect } from 'react-redux';

import { 
  hasEmptyLogs,
  hasEmptyCycles
} from '../../Workbook/reducers/WorkbookReducers';

export class GettingStartedCard extends React.Component {

  render() {
    const {
      hasEmptyCycles,
      hasEmptyLogs
    } = this.props;

    if(hasEmptyCycles || hasEmptyLogs) {
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

export const mapStateToProps = ({ entries }) => ({
  hasEmptyLogs: hasEmptyLogs(entries),
  hasEmptyCycles: hasEmptyCycles(entries),
});

export default connect(mapStateToProps)(GettingStartedCard);
